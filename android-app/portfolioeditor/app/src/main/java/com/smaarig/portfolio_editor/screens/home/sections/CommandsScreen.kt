package com.smaarig.portfolio_editor.screens.home.sections

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.home.Command
import com.smaarig.portfolio_editor.viewmodels.home.CommandsUiState
import com.smaarig.portfolio_editor.viewmodels.home.CommandsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CommandsScreen(
    viewModel: CommandsViewModel = viewModel()
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
                is CommandsUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is CommandsUiState.Success -> CommandList(state.data, onDelete = { viewModel.deleteCommand(it.cmd) })
                is CommandsUiState.Error -> ErrorState(state.message) { viewModel.fetchCommands() }
            }
        }
    }

    if (showAddDialog) {
        AddCommandDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addCommand(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun CommandList(commands: List<Command>, onDelete: (Command) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(commands, key = { it.cmd }) { command ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(command) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "> ${command.cmd}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary,
                            fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = command.desc,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
fun AddCommandDialog(onDismiss: () -> Unit, onConfirm: (Command) -> Unit) {
    var cmd by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Command") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = cmd, onValueChange = { cmd = it }, label = { Text("Command") })
                OutlinedTextField(value = desc, onValueChange = { desc = it }, label = { Text("Description") })
            }
        },
        confirmButton = {
            Button(onClick = { onConfirm(Command(cmd, desc)) }, enabled = cmd.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}

@Composable
fun ErrorState(message: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(
            modifier = Modifier.size(80.dp),
            color = MaterialTheme.colorScheme.errorContainer,
            shape = CircleShape
        ) {
            Box(contentAlignment = Alignment.Center) {
                Text("⚠️", style = MaterialTheme.typography.headlineLarge)
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "Something went wrong",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = message,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = onRetry,
            shape = MaterialTheme.shapes.medium,
            modifier = Modifier.fillMaxWidth(0.6f)
        ) {
            Text("Retry")
        }
    }
}
