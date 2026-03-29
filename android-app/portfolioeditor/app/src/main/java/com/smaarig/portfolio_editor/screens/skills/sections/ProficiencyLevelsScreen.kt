package com.smaarig.portfolio_editor.screens.skills.sections

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.skills.ProficiencyLevel
import com.smaarig.portfolio_editor.viewmodels.skills.ProficiencyLevelUiState
import com.smaarig.portfolio_editor.viewmodels.skills.ProficiencyLevelViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProficiencyLevelsScreen(
    viewModel: ProficiencyLevelViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Proficiency Levels") },
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
                is ProficiencyLevelUiState.Loading -> {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                }
                is ProficiencyLevelUiState.Success -> {
                    ProficiencyLevelList(
                        levels = state.data,
                        onDelete = { viewModel.deleteProficiencyLevel(it.label) }
                    )
                }
                is ProficiencyLevelUiState.Error -> {
                    Column(
                        modifier = Modifier.align(Alignment.Center),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(text = state.message, color = MaterialTheme.colorScheme.error)
                        Button(onClick = { viewModel.fetchProficiencyLevels() }) {
                            Text("Retry")
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddProficiencyLevelDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = { 
                viewModel.addProficiencyLevel(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ProficiencyLevelList(
    levels: List<ProficiencyLevel>,
    onDelete: (ProficiencyLevel) -> Unit
) {
    if (levels.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("No proficiency levels found")
        }
    } else {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(levels, key = { it.label }) { level ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .combinedClickable(
                            onClick = { /* Could show details */ },
                            onLongClick = { onDelete(level) }
                        ),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = level.label,
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                            Surface(
                                shape = MaterialTheme.shapes.small,
                                color = MaterialTheme.colorScheme.primaryContainer
                            ) {
                                Text(
                                    text = level.range,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    style = MaterialTheme.typography.labelSmall
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Skills: ${level.skills.joinToString(", ")}",
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun AddProficiencyLevelDialog(
    onDismiss: () -> Unit,
    onConfirm: (ProficiencyLevel) -> Unit
) {
    var label by remember { mutableStateOf("") }
    var range by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("") }
    var skillsText by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Proficiency Level") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = label,
                    onValueChange = { label = it },
                    label = { Text("Label (e.g., Expert)") },
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = range,
                    onValueChange = { range = it },
                    label = { Text("Range (e.g., 80-100)") },
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = color,
                    onValueChange = { color = it },
                    label = { Text("Color (e.g., var(--accent2))") },
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = skillsText,
                    onValueChange = { skillsText = it },
                    label = { Text("Skills (comma separated)") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val skills = skillsText.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                    onConfirm(ProficiencyLevel(label, range, color, skills))
                },
                enabled = label.isNotBlank() && range.isNotBlank()
            ) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
