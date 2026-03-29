package com.smaarig.portfolio_editor.screens.experience.sections

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.experience.Job
import com.smaarig.portfolio_editor.models.experience.Metric
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.experience.JobsUiState
import com.smaarig.portfolio_editor.viewmodels.experience.JobsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun JobsScreen(
    viewModel: JobsViewModel = viewModel()
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
                is JobsUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is JobsUiState.Success -> JobList(state.data, onDelete = { viewModel.deleteJob(it.company, it.title) })
                is JobsUiState.Error -> ErrorState(state.message) { viewModel.fetchJobs() }
            }
        }
    }

    if (showAddDialog) {
        AddJobDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addJob(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class, ExperimentalLayoutApi::class)
@Composable
fun JobList(jobs: List<Job>, onDelete: (Job) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        items(jobs, key = { "${it.company}_${it.title}" }) { job ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(job) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp),
                shape = MaterialTheme.shapes.large
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        text = job.title,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = job.company,
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Medium
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = job.period,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Badge(
                            containerColor = MaterialTheme.colorScheme.secondaryContainer,
                            contentColor = MaterialTheme.colorScheme.onSecondaryContainer
                        ) {
                            Text(job.status, modifier = Modifier.padding(horizontal = 4.dp))
                        }
                    }
                    
                    Text(
                        text = "${job.type} • ${job.location}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    if (job.stack.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(12.dp))
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            job.stack.forEach { tech ->
                                SuggestionChip(
                                    onClick = {},
                                    label = { Text(tech) },
                                    colors = AssistChipDefaults.assistChipColors(
                                        containerColor = MaterialTheme.colorScheme.surface
                                    )
                                )
                            }
                        }
                    }
                    
                    if (job.bullets.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(12.dp))
                        job.bullets.forEach { bullet ->
                            Row(modifier = Modifier.padding(vertical = 4.dp)) {
                                Text(
                                    text = "•",
                                    modifier = Modifier.padding(end = 8.dp),
                                    color = MaterialTheme.colorScheme.primary
                                )
                                Text(
                                    text = bullet,
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                    
                    if (job.metrics.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(16.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            job.metrics.forEach { metric ->
                                AssistChip(
                                    onClick = {},
                                    label = {
                                        Text("${metric.label}: ${metric.value}")
                                    },
                                    leadingIcon = {
                                        Icon(
                                            Icons.Default.Add,
                                            contentDescription = null,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
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
fun AddJobDialog(onDismiss: () -> Unit, onConfirm: (Job) -> Unit) {
    var title by remember { mutableStateOf("") }
    var company by remember { mutableStateOf("") }
    var period by remember { mutableStateOf("") }
    var duration by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var stackString by remember { mutableStateOf("") }
    var bulletsString by remember { mutableStateOf("") }
    var metricsString by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Job") },
        text = {
            Column(
                modifier = Modifier.verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = company, onValueChange = { company = it }, label = { Text("Company") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = period, onValueChange = { period = it }, label = { Text("Period") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = duration, onValueChange = { duration = it }, label = { Text("Duration") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = status, onValueChange = { status = it }, label = { Text("Status") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = type, onValueChange = { type = it }, label = { Text("Type") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = location, onValueChange = { location = it }, label = { Text("Location") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = stackString, onValueChange = { stackString = it }, label = { Text("Stack (comma separated)") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = bulletsString, onValueChange = { bulletsString = it }, label = { Text("Bullets (newline separated)") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(
                    value = metricsString,
                    onValueChange = { metricsString = it },
                    label = { Text("Metrics (label:value, color optional, newline separated)") },
                    placeholder = { Text("System Uptime:99.9%, accent") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val stack = stackString.split(",").map { it.trim() }.filter { it.isNotBlank() }
                    val bullets = bulletsString.split("\n").map { it.trim() }.filter { it.isNotBlank() }
                    val metrics = metricsString.split("\n").map { it.trim() }.filter { it.isNotBlank() }.map {
                        val parts = it.split(":")
                        val label = parts.getOrNull(0)?.trim() ?: ""
                        val valueAndColor = parts.getOrNull(1)?.split(",")
                        val value = valueAndColor?.getOrNull(0)?.trim() ?: ""
                        val color = valueAndColor?.getOrNull(1)?.trim() ?: "var(--accent)"
                        Metric(label, value, color)
                    }
                    onConfirm(Job(title, company, period, duration, status, type, location, stack, bullets, metrics))
                },
                enabled = title.isNotBlank() && company.isNotBlank()
            ) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
