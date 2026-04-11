package com.smaarig.portfolio_editor.screens.settings

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForwardIos
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.smaarig.portfolio_editor.ui.theme.AppTheme
import com.smaarig.portfolio_editor.viewmodels.theme.ThemeViewModel

@Composable
fun SettingsScreen(themeViewModel: ThemeViewModel) {
    val currentTheme by themeViewModel.currentTheme.collectAsState()
    var notificationsEnabled by remember { mutableStateOf(true) }
    var analyticEnabled by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        SettingsSection(title = "APPEARANCE") {
            ThemeSelector(
                selectedTheme = currentTheme,
                onThemeSelected = { themeViewModel.setTheme(it) }
            )
        }

        SettingsSection(title = "PREFERENCES") {
            SettingsToggle(
                icon = Icons.Default.Notifications,
                label = "Notifications",
                checked = notificationsEnabled,
                onCheckedChange = { notificationsEnabled = it }
            )
            SettingsToggle(
                icon = Icons.Default.BarChart,
                label = "Usage Analytics",
                checked = analyticEnabled,
                onCheckedChange = { analyticEnabled = it }
            )
        }

        SettingsSection(title = "APP DETAILS") {
            SettingsItem(
                icon = Icons.Default.Info,
                label = "Version",
                value = "1.0.0-DOT"
            )
            SettingsItem(
                icon = Icons.Default.Person,
                label = "Developer",
                value = "Smaarig Portfolio"
            )
            SettingsItem(
                icon = Icons.Default.Email,
                label = "Support Email",
                value = "support@smaarig.com"
            )
        }

        SettingsSection(title = "SYSTEM") {
            SettingsItem(
                icon = Icons.Default.Storage,
                label = "Clear Cache",
                onClick = { /* Implement clear cache */ }
            )
        }
        
        Spacer(modifier = Modifier.height(100.dp)) // Extra space for floating nav
    }
}

@Composable
fun SettingsSection(title: String, content: @Composable ColumnScope.() -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = title,
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(start = 4.dp)
        )
        ElevatedCard(
            modifier = Modifier.fillMaxWidth(),
            shape = MaterialTheme.shapes.large,
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.2f)
            )
        ) {
            Column(modifier = Modifier.padding(8.dp)) {
                content()
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ThemeSelector(selectedTheme: AppTheme, onThemeSelected: (AppTheme) -> Unit) {
    Column(modifier = Modifier.padding(8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Default.Palette, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
            Spacer(modifier = Modifier.width(12.dp))
            Text(text = "Active Theme", style = MaterialTheme.typography.bodyLarge)
        }
        Spacer(modifier = Modifier.height(16.dp))
        FlowRow(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            AppTheme.entries.forEach { theme ->
                FilterChip(
                    selected = selectedTheme == theme,
                    onClick = { onThemeSelected(theme) },
                    label = { 
                        Text(
                            text = theme.name.uppercase(), 
                            style = MaterialTheme.typography.labelSmall,
                            fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace
                        ) 
                    },
                    shape = MaterialTheme.shapes.small,
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MaterialTheme.colorScheme.primary,
                        selectedLabelColor = MaterialTheme.colorScheme.onPrimary
                    )
                )
            }
        }
    }
}

@Composable
fun SettingsToggle(
    icon: ImageVector,
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    ListItem(
        headlineContent = { Text(label, style = MaterialTheme.typography.bodyLarge) },
        leadingContent = { Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        trailingContent = {
            Switch(
                checked = checked,
                onCheckedChange = onCheckedChange,
                colors = SwitchDefaults.colors(
                    checkedThumbColor = MaterialTheme.colorScheme.primary,
                    checkedTrackColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        },
        colors = ListItemDefaults.colors(containerColor = androidx.compose.ui.graphics.Color.Transparent)
    )
}

@Composable
fun SettingsItem(
    icon: ImageVector,
    label: String,
    value: String? = null,
    onClick: (() -> Unit)? = null
) {
    val modifier = if (onClick != null) Modifier.fillMaxWidth().clickable { onClick() } 
                   else Modifier.fillMaxWidth()
    
    ListItem(
        modifier = modifier,
        headlineContent = { Text(label, style = MaterialTheme.typography.bodyLarge) },
        leadingContent = { Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        trailingContent = {
            if (value != null) {
                Text(
                    text = value,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            } else {
                Icon(Icons.AutoMirrored.Filled.ArrowForwardIos, contentDescription = null, modifier = Modifier.size(16.dp))
            }
        },
        colors = ListItemDefaults.colors(containerColor = androidx.compose.ui.graphics.Color.Transparent)
    )
}
