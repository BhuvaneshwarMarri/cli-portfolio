package com.smaarig.portfolio_editor.screens.experience.sections

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
import com.smaarig.portfolio_editor.models.experience.SkillMatrix
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.experience.SkillsMatrixUiState
import com.smaarig.portfolio_editor.viewmodels.experience.SkillsMatrixViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SkillsMatrixScreen(
    viewModel: SkillsMatrixViewModel = viewModel()
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
        Box(modifier = Modifier.padding(innerPadding).fillMaxSize()) {
            when (val state = uiState) {
                is SkillsMatrixUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is SkillsMatrixUiState.Success -> SkillMatrixList(state.data, onDelete = { viewModel.deleteSkillMatrix(it.label) })
                is SkillsMatrixUiState.Error -> ErrorState(state.message) { viewModel.fetchSkillMatrix() }
            }
        }
    }

    if (showAddDialog) {
        AddSkillMatrixDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addSkillMatrix(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun SkillMatrixList(skills: List<SkillMatrix>, onDelete: (SkillMatrix) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(skills, key = { it.label }) { skill ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(skill) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = skill.label,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = skill.level,
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.secondary
                        )
                    }
                    Badge(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant,
                        contentColor = MaterialTheme.colorScheme.primary
                    ) {
                        Text(skill.color, modifier = Modifier.padding(horizontal = 4.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun AddSkillMatrixDialog(onDismiss: () -> Unit, onConfirm: (SkillMatrix) -> Unit) {
    var label by remember { mutableStateOf("") }
    var level by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("var(--accent)") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Skill Matrix Entry") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = label, onValueChange = { label = it }, label = { Text("Label") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = level, onValueChange = { level = it }, label = { Text("Level") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = color, onValueChange = { color = it }, label = { Text("Color") }, modifier = Modifier.fillMaxWidth())
            }
        },
        confirmButton = {
            Button(onClick = { onConfirm(SkillMatrix(label, level, color)) }, enabled = label.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
