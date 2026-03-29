package com.smaarig.portfolio_editor

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.smaarig.portfolio_editor.navigation.BottomNavBar
import com.smaarig.portfolio_editor.navigation.MainNavigationGraph
import com.smaarig.portfolio_editor.ui.theme.AppTheme
import com.smaarig.portfolio_editor.viewmodels.theme.ThemeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediaEditorApp(themeViewModel: ThemeViewModel = viewModel()) {
    val navController = rememberNavController()
    var showThemeMenu by remember { mutableStateOf(false) }
    
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "home"
    
    val title = when (currentRoute) {
        "home" -> "Portfolio Editor"
        "education" -> "Education"
        "skills" -> "Skills"
        "projects" -> "Projects"
        "experience" -> "Experience"
        "contact" -> "Contact"
        "commands" -> "Commands"
        "interests" -> "Interests"
        "links" -> "Links"
        "courses" -> "Courses"
        "timeline" -> "Timeline"
        "jobs" -> "Jobs"
        "skills_matrix" -> "Skills Matrix"
        "proficiency_levels" -> "Proficiency"
        "skill_groups" -> "Skill Groups"
        "tech_stack" -> "Tech Stack"
        "projects_to_include" -> "Project Selection"
        else -> "Portfolio Editor"
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleLarge
                    ) 
                },
                actions = {
                    IconButton(onClick = { showThemeMenu = true }) {
                        Icon(Icons.Default.Settings, contentDescription = "Settings")
                    }
                    DropdownMenu(
                        expanded = showThemeMenu,
                        onDismissRequest = { showThemeMenu = false }
                    ) {
                        AppTheme.values().forEach { theme ->
                            DropdownMenuItem(
                                text = { Text(theme.name) },
                                onClick = {
                                    themeViewModel.setTheme(theme)
                                    showThemeMenu = false
                                }
                            )
                        }
                    }
                }
            )
        },
        bottomBar = { BottomNavBar(navController = navController) }
    ) { innerPadding ->
        MainNavigationGraph(navController = navController, innerPadding = innerPadding)
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true,
    name = "Portfolio Admin"
)
@Composable
fun PreviewMediaEditorApp() {
    MediaEditorApp()
}
