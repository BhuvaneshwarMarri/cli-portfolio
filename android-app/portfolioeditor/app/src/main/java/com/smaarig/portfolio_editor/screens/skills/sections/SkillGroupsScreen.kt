package com.smaarig.portfolio_editor.screens.skills.sections

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.skills.SkillGroup
import com.smaarig.portfolio_editor.models.skills.SkillItem
import com.smaarig.portfolio_editor.viewmodels.skills.SkillGroupUiState
import com.smaarig.portfolio_editor.viewmodels.skills.SkillGroupViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SkillGroupsScreen(
    viewModel: SkillGroupViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Skill Groups") },
                actions = {
                    IconButton(onClick = { showAddDialog = true }) {
                        Icon(Icons.Default.Add, contentDescription = "Add")
                    }
                }
            )
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            when (val state = uiState) {
                is SkillGroupUiState.Loading -> {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                }
                is SkillGroupUiState.Success -> {
                    SkillGroupList(
                        groups = state.data,
                        onDelete = { viewModel.deleteSkillGroup(it.title) }
                    )
                }
                is SkillGroupUiState.Error -> {
                    Column(
                        modifier = Modifier.align(Alignment.Center),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(text = state.message, color = MaterialTheme.colorScheme.error)
                        Button(onClick = { viewModel.fetchSkillGroups() }) {
                            Text("Retry")
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddSkillGroupDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addSkillGroup(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun SkillGroupList(
    groups: List<SkillGroup>,
    onDelete: (SkillGroup) -> Unit
) {
    if (groups.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("No skill groups found")
        }
    } else {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(groups, key = { it.title }) { group ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .combinedClickable(
                            onClick = { },
                            onLongClick = { onDelete(group) }
                        ),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = group.title,
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        group.skills.forEach { skill ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(text = skill.name, style = MaterialTheme.typography.bodyMedium)
                                Text(
                                    text = "${skill.level} (${skill.tag})",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.secondary
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddSkillGroupDialog(
    onDismiss: () -> Unit,
    onConfirm: (SkillGroup) -> Unit
) {
    var title by remember { mutableStateOf("") }
    var icon by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("") }
    
    // Skill items management
    val skills = remember { mutableStateListOf<SkillItem>() }
    var newSkillName by remember { mutableStateOf("") }
    var newSkillLevel by remember { mutableStateOf("") }
    var newSkillTag by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Skill Group") },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") })
                OutlinedTextField(value = icon, onValueChange = { icon = it }, label = { Text("Icon") })
                OutlinedTextField(value = color, onValueChange = { color = it }, label = { Text("Color") })
                
                Divider(modifier = Modifier.padding(vertical = 8.dp))
                Text("Add Skills:", style = MaterialTheme.typography.titleSmall)
                
                OutlinedTextField(value = newSkillName, onValueChange = { newSkillName = it }, label = { Text("Skill Name") })
                OutlinedTextField(value = newSkillLevel, onValueChange = { newSkillLevel = it }, label = { Text("Level") })
                OutlinedTextField(value = newSkillTag, onValueChange = { newSkillTag = it }, label = { Text("Tag") })
                
                Button(
                    onClick = {
                        if (newSkillName.isNotBlank()) {
                            skills.add(SkillItem(newSkillName, newSkillLevel, newSkillTag))
                            newSkillName = ""; newSkillLevel = ""; newSkillTag = ""
                        }
                    },
                    modifier = Modifier.align(Alignment.End)
                ) {
                    Text("Add Skill")
                }
                
                // List of added skills
                skills.forEachIndexed { index, skill ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("${skill.name} (${skill.level})")
                        IconButton(onClick = { skills.removeAt(index) }) {
                            Icon(Icons.Default.Delete, contentDescription = "Remove")
                        }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    onConfirm(SkillGroup(title, icon, color, skills.toList()))
                },
                enabled = title.isNotBlank()
            ) {
                Text("Confirm")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
