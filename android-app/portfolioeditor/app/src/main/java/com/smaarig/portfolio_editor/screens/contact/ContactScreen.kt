package com.smaarig.portfolio_editor.screens.contact

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.models.contact.*
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.contact.ContactViewModel

@Composable
fun ContactScreen(viewModel: ContactViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    var showGithubDialog by remember { mutableStateOf(false) }
    var showLinkedinDialog by remember { mutableStateOf(false) }
    var showTwitterDialog by remember { mutableStateOf(false) }
    var showAvailabilityDialog by remember { mutableStateOf(false) }
    var showInfoDialog by remember { mutableStateOf(false) }
    var showOpenToDialog by remember { mutableStateOf(false) }

    Box(modifier = Modifier.fillMaxSize()) {
        if (uiState.isLoading) {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
        } else if (uiState.error != null) {
            ErrorState(message = uiState.error!!) { viewModel.fetchAllData() }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                // Social Links Section
                ContactSection(title = "SOCIAL_CONNECT") {
                    SocialLinkItem(
                        label = "GITHUB",
                        handle = uiState.github?.handle ?: "NOT_SET",
                        onClick = { showGithubDialog = true }
                    )
                    SocialLinkItem(
                        label = "LINKEDIN",
                        handle = uiState.linkedin?.handle ?: "NOT_SET",
                        onClick = { showLinkedinDialog = true }
                    )
                    SocialLinkItem(
                        label = "TWITTER",
                        handle = uiState.twitter?.handle ?: "NOT_SET",
                        onClick = { showTwitterDialog = true }
                    )
                }

                // Contact Info Section
                ContactSection(title = "CORE_INFO") {
                    InfoItem(
                        icon = Icons.Default.Email,
                        label = "EMAIL_ENDPOINT",
                        value = uiState.contactInfo?.email ?: "NOT_CONFIGURED",
                        onClick = { showInfoDialog = true }
                    )
                }

                // Availability Section
                ContactSection(title = "AVAILABILITY_STATUS") {
                    AvailabilityItem(
                        availability = uiState.availability,
                        onClick = { showAvailabilityDialog = true }
                    )
                }

                // Open To Section
                ContactSection(title = "OPEN_TO_ROLES") {
                    uiState.openTo.forEach { role ->
                        OpenToItem(role = role, onDelete = { viewModel.deleteOpenTo(it.text) })
                    }
                    Button(
                        onClick = { showOpenToDialog = true },
                        modifier = Modifier.fillMaxWidth(),
                        shape = MaterialTheme.shapes.small
                    ) {
                        Text("APPEND_ROLE", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace)
                    }
                }

                Spacer(modifier = Modifier.height(100.dp))
            }
        }
    }

    // Dialogs
    if (showGithubDialog) {
        SocialLinkDialog(
            title = "GITHUB_CONFIG",
            initialLink = uiState.github,
            onDismiss = { showGithubDialog = false },
            onConfirm = { viewModel.updateGithub(it); showGithubDialog = false }
        )
    }
    if (showLinkedinDialog) {
        SocialLinkDialog(
            title = "LINKEDIN_CONFIG",
            initialLink = uiState.linkedin,
            onDismiss = { showLinkedinDialog = false },
            onConfirm = { viewModel.updateLinkedin(it); showLinkedinDialog = false }
        )
    }
    if (showTwitterDialog) {
        SocialLinkDialog(
            title = "TWITTER_CONFIG",
            initialLink = uiState.twitter,
            onDismiss = { showTwitterDialog = false },
            onConfirm = { viewModel.updateTwitter(it); showTwitterDialog = false }
        )
    }
    if (showInfoDialog) {
        ContactInfoDialog(
            initialInfo = uiState.contactInfo,
            onDismiss = { showInfoDialog = false },
            onConfirm = { viewModel.updateContactInfo(it); showInfoDialog = false }
        )
    }
    if (showAvailabilityDialog) {
        AvailabilityDialog(
            initialAvailability = uiState.availability,
            onDismiss = { showAvailabilityDialog = false },
            onConfirm = { viewModel.updateAvailability(it); showAvailabilityDialog = false }
        )
    }
    if (showOpenToDialog) {
        OpenToDialog(
            onDismiss = { showOpenToDialog = false },
            onConfirm = { viewModel.addOpenTo(it); showOpenToDialog = false }
        )
    }
}

@Composable
fun ContactSection(title: String, content: @Composable ColumnScope.() -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = title,
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold,
            fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
            letterSpacing = 1.sp,
            modifier = Modifier.padding(start = 4.dp)
        )
        ElevatedCard(
            modifier = Modifier.fillMaxWidth(),
            shape = MaterialTheme.shapes.large,
            elevation = CardDefaults.elevatedCardElevation(defaultElevation = 0.dp),
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
            )
        ) {
            Column(
                modifier = Modifier.padding(12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                content()
            }
        }
    }
}

@Composable
fun SocialLinkItem(label: String, handle: String, onClick: () -> Unit) {
    ListItem(
        modifier = Modifier.clickable { onClick() },
        headlineContent = { 
            Text(
                label, 
                style = MaterialTheme.typography.labelSmall,
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                color = MaterialTheme.colorScheme.primary
            ) 
        },
        supportingContent = { 
            Text(
                handle, 
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            ) 
        },
        trailingContent = { Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(18.dp)) },
        colors = ListItemDefaults.colors(containerColor = androidx.compose.ui.graphics.Color.Transparent)
    )
}

@Composable
fun InfoItem(icon: ImageVector, label: String, value: String, onClick: () -> Unit) {
    ListItem(
        modifier = Modifier.clickable { onClick() },
        leadingContent = { Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        headlineContent = { 
            Text(
                label, 
                style = MaterialTheme.typography.labelSmall,
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace
            ) 
        },
        supportingContent = { 
            Text(
                value, 
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Bold
            ) 
        },
        colors = ListItemDefaults.colors(containerColor = androidx.compose.ui.graphics.Color.Transparent)
    )
}

@Composable
fun AvailabilityItem(availability: Availability?, onClick: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        if (availability == null) {
            Text("DATA_UNAVAILABLE", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace)
        } else {
            AvailabilityRow("STATUS", availability.status)
            AvailabilityRow("TYPE", availability.type)
            AvailabilityRow("TIMEZONE", availability.timezone)
            AvailabilityRow("RESPONSE", availability.response_time)
            AvailabilityRow("PREF_CONTACT", availability.preferred_contact)
        }
    }
}

@Composable
fun AvailabilityRow(label: String, value: String) {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(
            text = label, 
            style = MaterialTheme.typography.labelSmall,
            fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
            color = MaterialTheme.colorScheme.secondary
        )
        Text(
            text = value, 
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun OpenToItem(role: OpenToInfo, onDelete: (OpenToInfo) -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
            Text(
                text = ">", 
                color = MaterialTheme.colorScheme.primary,
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                modifier = Modifier.padding(end = 8.dp)
            )
            Text(
                text = role.text.uppercase(),
                style = MaterialTheme.typography.bodyMedium,
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace
            )
        }
        IconButton(onClick = { onDelete(role) }, modifier = Modifier.size(24.dp)) {
            Icon(Icons.Default.Delete, contentDescription = null, modifier = Modifier.size(16.dp))
        }
    }
}

// Dialogs Components
@Composable
fun SocialLinkDialog(title: String, initialLink: SocialLink?, onDismiss: () -> Unit, onConfirm: (SocialLink) -> Unit) {
    var url by remember { mutableStateOf(initialLink?.url ?: "") }
    var handle by remember { mutableStateOf(initialLink?.handle ?: "") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(title, fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(value = url, onValueChange = { url = it }, label = { Text("URL") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = handle, onValueChange = { handle = it }, label = { Text("Handle") }, modifier = Modifier.fillMaxWidth())
            }
        },
        confirmButton = { TextButton(onClick = { onConfirm(SocialLink(url, handle)) }) { Text("UPDATE") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("ABORT") } }
    )
}

@Composable
fun ContactInfoDialog(initialInfo: ContactInfo?, onDismiss: () -> Unit, onConfirm: (ContactInfo) -> Unit) {
    var email by remember { mutableStateOf(initialInfo?.email ?: "") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("EMAIL_CONFIG", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace) },
        text = {
            OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email Address") }, modifier = Modifier.fillMaxWidth())
        },
        confirmButton = { TextButton(onClick = { onConfirm(ContactInfo(email)) }) { Text("UPDATE") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("ABORT") } }
    )
}

@Composable
fun AvailabilityDialog(initialAvailability: Availability?, onDismiss: () -> Unit, onConfirm: (Availability) -> Unit) {
    var status by remember { mutableStateOf(initialAvailability?.status ?: "") }
    var type by remember { mutableStateOf(initialAvailability?.type ?: "") }
    var timezone by remember { mutableStateOf(initialAvailability?.timezone ?: "") }
    var responseTime by remember { mutableStateOf(initialAvailability?.response_time ?: "") }
    var preferredContact by remember { mutableStateOf(initialAvailability?.preferred_contact ?: "") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("AVAILABILITY_CONFIG", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.verticalScroll(rememberScrollState())) {
                OutlinedTextField(value = status, onValueChange = { status = it }, label = { Text("Status") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = type, onValueChange = { type = it }, label = { Text("Employment Type") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = timezone, onValueChange = { timezone = it }, label = { Text("Timezone") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = responseTime, onValueChange = { responseTime = it }, label = { Text("Response Time") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = preferredContact, onValueChange = { preferredContact = it }, label = { Text("Preferred Contact") }, modifier = Modifier.fillMaxWidth())
            }
        },
        confirmButton = { TextButton(onClick = { onConfirm(Availability(status, type, timezone, responseTime, preferredContact)) }) { Text("UPDATE") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("ABORT") } }
    )
}

@Composable
fun OpenToDialog(onDismiss: () -> Unit, onConfirm: (OpenToInfo) -> Unit) {
    var text by remember { mutableStateOf("") }
    var active by remember { mutableStateOf(true) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("NEW_ROLE_ASSIGN", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = text, onValueChange = { text = it }, label = { Text("Role Description") }, modifier = Modifier.fillMaxWidth())
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(checked = active, onCheckedChange = { active = it })
                    Text("ACTIVE_STATUS", fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace, style = MaterialTheme.typography.labelSmall)
                }
            }
        },
        confirmButton = { TextButton(onClick = { onConfirm(OpenToInfo(text, active)) }, enabled = text.isNotBlank()) { Text("APPEND") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("ABORT") } }
    )
}
