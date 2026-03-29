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
import com.smaarig.portfolio_editor.models.home.Interest
import com.smaarig.portfolio_editor.viewmodels.home.InterestsUiState
import com.smaarig.portfolio_editor.viewmodels.home.InterestsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun InterestsScreen(
    viewModel: InterestsViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Interests") },
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
                is InterestsUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is InterestsUiState.Success -> InterestList(state.data, onDelete = { viewModel.deleteInterest(it.text) })
                is InterestsUiState.Error -> ErrorState(state.message) { viewModel.fetchInterests() }
            }
        }
    }

    if (showAddDialog) {
        AddInterestDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addInterest(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun InterestList(interests: List<Interest>, onDelete: (Interest) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(interests, key = { it.text }) { interest ->
            Card(
                modifier = Modifier.fillMaxWidth().combinedClickable(
                    onClick = { },
                    onLongClick = { onDelete(interest) }
                )
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "Icon: ${interest.icon}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(end = 8.dp))
                    Text(text = interest.text, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun AddInterestDialog(onDismiss: () -> Unit, onConfirm: (Interest) -> Unit) {
    var icon by remember { mutableStateOf("") }
    var text by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Interest") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = icon, onValueChange = { icon = it }, label = { Text("Icon") })
                OutlinedTextField(value = text, onValueChange = { text = it }, label = { Text("Text") })
            }
        },
        confirmButton = {
            Button(onClick = { onConfirm(Interest(icon, text)) }, enabled = text.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}

