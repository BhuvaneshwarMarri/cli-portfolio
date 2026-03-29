package com.smaarig.portfolio_editor

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.smaarig.portfolio_editor.navigation.BottomNavBar
import com.smaarig.portfolio_editor.navigation.MainNavigationGraph
import com.smaarig.portfolio_editor.viewmodels.theme.ThemeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediaEditorApp(themeViewModel: ThemeViewModel = viewModel()) {
    val navController = rememberNavController()
    
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "home"
    
    val title = when (currentRoute) {
        "home" -> "PORTFOLIO"
        "settings" -> "SETTINGS"
        "education" -> "EDUCATION"
        "skills" -> "SKILLS"
        "projects" -> "PROJECTS"
        "experience" -> "EXPERIENCE"
        "contact" -> "CONTACT"
        "commands" -> "COMMANDS"
        "interests" -> "INTERESTS"
        "links" -> "LINKS"
        "courses" -> "COURSES"
        "timeline" -> "TIMELINE"
        "jobs" -> "JOBS"
        "skills_matrix" -> "SKILLS MATRIX"
        "proficiency_levels" -> "PROFICIENCY"
        "skill_groups" -> "SKILL GROUPS"
        "tech_stack" -> "TECH STACK"
        "projects_to_include" -> "SELECTION"
        else -> "PORTFOLIO"
    }

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { 
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleLarge
                    ) 
                },
                actions = {
                    IconButton(onClick = { navController.navigate("settings") }) {
                        Icon(Icons.Default.Settings, contentDescription = "Settings")
                    }
                }
            )
        }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize()) {
            MainNavigationGraph(
                navController = navController, 
                innerPadding = innerPadding,
                themeViewModel = themeViewModel
            )
            
            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 8.dp)
            ) {
                BottomNavBar(navController = navController)
            }
        }
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
