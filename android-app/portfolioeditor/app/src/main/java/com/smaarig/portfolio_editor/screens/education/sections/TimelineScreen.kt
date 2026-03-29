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
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(timelines, key = { it.title }) { timeline ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(timeline) }
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
                            text = timeline.year,
                            style = MaterialTheme.typography.labelLarge,
                            color = MaterialTheme.colorScheme.primary,
                            fontWeight = FontWeight.Bold
                        )
                        Badge(
                            containerColor = MaterialTheme.colorScheme.tertiaryContainer,
                            contentColor = MaterialTheme.colorScheme.onTertiaryContainer
                        ) {
                            Text(timeline.status, modifier = Modifier.padding(horizontal = 4.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = timeline.title,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = timeline.place,
                        style = MaterialTheme.typography.titleSmall,
                        color = MaterialTheme.colorScheme.secondary
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = timeline.detail,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    if (timeline.tags.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(12.dp))
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            timeline.tags.forEach { tag ->
                                SuggestionChip(
                                    onClick = {},
                                    label = { Text(tag) },
                                    shape = MaterialTheme.shapes.small
                                )
                            }
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
                OutlinedTextField(value = year, onValueChange = { year = it }, label = { Text("Year") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = place, onValueChange = { place = it }, label = { Text("Place") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = detail, onValueChange = { detail = it }, label = { Text("Detail") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = tagsString, onValueChange = { tagsString = it }, label = { Text("Tags (comma separated)") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = status, onValueChange = { status = it }, label = { Text("Status") }, modifier = Modifier.fillMaxWidth())
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
