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
import com.smaarig.portfolio_editor.models.home.Link
import com.smaarig.portfolio_editor.viewmodels.home.LinksUiState
import com.smaarig.portfolio_editor.viewmodels.home.LinksViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LinksScreen(
    viewModel: LinksViewModel = viewModel()
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
                is LinksUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is LinksUiState.Success -> LinkList(state.data, onDelete = { viewModel.deleteLink(it.label) })
                is LinksUiState.Error -> ErrorState(state.message) { viewModel.fetchLinks() }
            }
        }
    }

    if (showAddDialog) {
        AddLinkDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addLink(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun LinkList(links: List<Link>, onDelete: (Link) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(links, key = { it.label }) { link ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(link) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                shape = MaterialTheme.shapes.small,
                                color = MaterialTheme.colorScheme.secondaryContainer,
                                modifier = Modifier.size(32.dp)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text(
                                        text = link.icon.ifEmpty { "🔗" },
                                        style = MaterialTheme.typography.bodyLarge
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = link.label,
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        if (link.active) {
                            Badge(
                                containerColor = MaterialTheme.colorScheme.primaryContainer,
                                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
                            ) {
                                Text("Active", modifier = Modifier.padding(horizontal = 4.dp))
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = link.value,
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = link.href,
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary,
                        textDecoration = androidx.compose.ui.text.style.TextDecoration.Underline
                    )
                }
            }
        }
    }
}

@Composable
fun AddLinkDialog(onDismiss: () -> Unit, onConfirm: (Link) -> Unit) {
    var icon by remember { mutableStateOf("") }
    var label by remember { mutableStateOf("") }
    var href by remember { mutableStateOf("") }
    var value by remember { mutableStateOf("") }
    var active by remember { mutableStateOf(true) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Link") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = icon, onValueChange = { icon = it }, label = { Text("Icon") })
                OutlinedTextField(value = label, onValueChange = { label = it }, label = { Text("Label") })
                OutlinedTextField(value = href, onValueChange = { href = it }, label = { Text("URL (href)") })
                OutlinedTextField(value = value, onValueChange = { value = it }, label = { Text("Value") })
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(checked = active, onCheckedChange = { active = it })
                    Text("Active")
                }
            }
        },
        confirmButton = {
            Button(onClick = { onConfirm(Link(icon, label, href, value, active)) }, enabled = label.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
