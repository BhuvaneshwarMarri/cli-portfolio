package com.smaarig.portfolio_editor.screens.projects.sections

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
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.projects.ProjectsUiState
import com.smaarig.portfolio_editor.viewmodels.projects.ProjectsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProjectsToIncludeScreen(
    viewModel: ProjectsViewModel = viewModel()
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
                is ProjectsUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is ProjectsUiState.Success -> ProjectList(state.data, onDelete = { viewModel.deleteProject(it) })
                is ProjectsUiState.Error -> ErrorState(state.message) { viewModel.fetchProjects() }
            }
        }
    }

    if (showAddDialog) {
        AddProjectDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addProject(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ProjectList(projects: List<String>, onDelete: (String) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(projects, key = { it }) { project ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(project) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
            ) {
                Text(
                    text = project,
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun AddProjectDialog(onDismiss: () -> Unit, onConfirm: (String) -> Unit) {
    var projectName by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Project") },
        text = {
            OutlinedTextField(
                value = projectName,
                onValueChange = { projectName = it },
                label = { Text("Project Name") },
                modifier = Modifier.fillMaxWidth()
            )
        },
        confirmButton = {
            Button(onClick = { onConfirm(projectName) }, enabled = projectName.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
