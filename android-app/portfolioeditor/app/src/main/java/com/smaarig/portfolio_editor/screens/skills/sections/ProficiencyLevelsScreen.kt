package com.smaarig.portfolio_editor.screens.skills.sections

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.skills.ProficiencyLevel
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
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
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add")
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            when (val state = uiState) {
                is ProficiencyLevelUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is ProficiencyLevelUiState.Success -> ProficiencyLevelList(state.data, onDelete = { viewModel.deleteProficiencyLevel(it.label) })
                is ProficiencyLevelUiState.Error -> ErrorState(state.message) { viewModel.fetchProficiencyLevels() }
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

@OptIn(ExperimentalFoundationApi::class, ExperimentalLayoutApi::class)
@Composable
fun ProficiencyLevelList(levels: List<ProficiencyLevel>, onDelete: (ProficiencyLevel) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(levels, key = { it.label }) { level ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(level) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp),
                shape = MaterialTheme.shapes.large
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = level.label,
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Badge(
                            containerColor = MaterialTheme.colorScheme.secondaryContainer,
                            contentColor = MaterialTheme.colorScheme.onSecondaryContainer
                        ) {
                            Text(level.range, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Associated Skills",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        level.skills.forEach { skill ->
                            SuggestionChip(
                                onClick = {},
                                label = { Text(skill) }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun AddProficiencyLevelDialog(onDismiss: () -> Unit, onConfirm: (ProficiencyLevel) -> Unit) {
    var label by remember { mutableStateOf("") }
    var range by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("") }
    var skillsText by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Proficiency Level") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = label, onValueChange = { label = it }, label = { Text("Label (e.g., Expert)") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = range, onValueChange = { range = it }, label = { Text("Range (e.g., 80-100)") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = color, onValueChange = { color = it }, label = { Text("Color (e.g., var(--accent2))") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = skillsText, onValueChange = { skillsText = it }, label = { Text("Skills (comma separated)") }, modifier = Modifier.fillMaxWidth())
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val skills = skillsText.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                    onConfirm(ProficiencyLevel(label, range, color, skills))
                },
                enabled = label.isNotBlank() && range.isNotBlank()
            ) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
