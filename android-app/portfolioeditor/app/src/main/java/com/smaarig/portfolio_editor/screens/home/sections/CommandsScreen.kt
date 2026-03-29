package com.smaarig.portfolio_editor.screens.home.sections

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
        topBar = {
            TopAppBar(
                title = { Text("Commands") },
                actions = {
                    IconButton(onClick = { showAddDialog = true }) {
                        Icon(Icons.Default.Add, contentDescription = "Add")
                    }
                }
            )
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
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(commands, key = { it.cmd }) { command ->
            Card(
                modifier = Modifier.fillMaxWidth().combinedClickable(
                    onClick = { },
                    onLongClick = { onDelete(command) }
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = command.cmd, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = command.desc, style = MaterialTheme.typography.bodyMedium)
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
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = message, color = MaterialTheme.colorScheme.error)
        Button(onClick = onRetry) { Text("Retry") }
    }
}
