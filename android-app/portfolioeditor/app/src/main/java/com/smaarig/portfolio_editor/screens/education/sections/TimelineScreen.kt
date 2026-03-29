package com.smaarig.portfolio_editor.screens.education.sections

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
import com.smaarig.portfolio_editor.models.education.Timeline
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.education.TimelinesUiState
import com.smaarig.portfolio_editor.viewmodels.education.TimelinesViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TimelineScreen(
    viewModel: TimelinesViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Education Timeline") },
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
                is TimelinesUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is TimelinesUiState.Success -> TimelineList(state.data, onDelete = { viewModel.deleteTimeline(it.title) })
                is TimelinesUiState.Error -> ErrorState(state.message) { viewModel.fetchTimelines() }
            }
        }
    }

    if (showAddDialog) {
        AddTimelineDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addTimeline(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class, ExperimentalLayoutApi::class)
@Composable
fun TimelineList(timelines: List<Timeline>, onDelete: (Timeline) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(timelines, key = { it.title }) { timeline ->
            Card(
                modifier = Modifier.fillMaxWidth().combinedClickable(
                    onClick = { },
                    onLongClick = { onDelete(timeline) }
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = timeline.year, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                        Badge { Text(timeline.status) }
                    }
                    Text(text = timeline.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = timeline.place, style = MaterialTheme.typography.bodyMedium)
                    Text(text = timeline.detail, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                    
                    FlowRow(
                        modifier = Modifier.padding(top = 8.dp),
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        timeline.tags.forEach { tag ->
                            SuggestionChip(onClick = {}, label = { Text(tag) })
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun AddTimelineDialog(onDismiss: () -> Unit, onConfirm: (Timeline) -> Unit) {
    var year by remember { mutableStateOf("") }
    var title by remember { mutableStateOf("") }
    var place by remember { mutableStateOf("") }
    var detail by remember { mutableStateOf("") }
    var tagsString by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Timeline") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = year, onValueChange = { year = it }, label = { Text("Year") })
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") })
                OutlinedTextField(value = place, onValueChange = { place = it }, label = { Text("Place") })
                OutlinedTextField(value = detail, onValueChange = { detail = it }, label = { Text("Detail") })
                OutlinedTextField(value = tagsString, onValueChange = { tagsString = it }, label = { Text("Tags (comma separated)") })
                OutlinedTextField(value = status, onValueChange = { status = it }, label = { Text("Status") })
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val tags = tagsString.split(",").map { it.trim() }.filter { it.isNotBlank() }
                    onConfirm(Timeline(year, title, place, detail, tags, status))
                },
                enabled = title.isNotBlank()
            ) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
