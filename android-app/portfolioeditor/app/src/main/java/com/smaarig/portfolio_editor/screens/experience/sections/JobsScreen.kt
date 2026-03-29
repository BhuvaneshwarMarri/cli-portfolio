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
        topBar = {
            TopAppBar(
                title = { Text("Jobs") },
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
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(jobs, key = { "${it.company}_${it.title}" }) { job ->
            Card(
                modifier = Modifier.fillMaxWidth().combinedClickable(
                    onClick = { },
                    onLongClick = { onDelete(job) }
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = job.title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                    Text(text = job.company, style = MaterialTheme.typography.titleMedium, color = MaterialTheme.colorScheme.primary)
                    
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = job.period, style = MaterialTheme.typography.bodySmall)
                        Badge { Text(job.status) }
                    }
                    
                    Text(text = "${job.type} • ${job.location}", style = MaterialTheme.typography.bodySmall)
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        job.stack.forEach { tech ->
                            SuggestionChip(onClick = {}, label = { Text(tech) })
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    job.bullets.forEach { bullet ->
                        Text(text = "• $bullet", style = MaterialTheme.typography.bodyMedium)
                    }
                    
                    if (job.metrics.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            job.metrics.forEach { metric ->
                                AssistChip(
                                    onClick = {},
                                    label = { Text("${metric.label}: ${metric.value}") }
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
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") })
                OutlinedTextField(value = company, onValueChange = { company = it }, label = { Text("Company") })
                OutlinedTextField(value = period, onValueChange = { period = it }, label = { Text("Period") })
                OutlinedTextField(value = duration, onValueChange = { duration = it }, label = { Text("Duration") })
                OutlinedTextField(value = status, onValueChange = { status = it }, label = { Text("Status") })
                OutlinedTextField(value = type, onValueChange = { type = it }, label = { Text("Type") })
                OutlinedTextField(value = location, onValueChange = { location = it }, label = { Text("Location") })
                OutlinedTextField(value = stackString, onValueChange = { stackString = it }, label = { Text("Stack (comma separated)") })
                OutlinedTextField(value = bulletsString, onValueChange = { bulletsString = it }, label = { Text("Bullets (newline separated)") })
                OutlinedTextField(
                    value = metricsString,
                    onValueChange = { metricsString = it },
                    label = { Text("Metrics (label:value, color optional, newline separated)") },
                    placeholder = { Text("System Uptime:99.9%, accent") }
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
