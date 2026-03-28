package com.smaarig.portfolio_editor

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.rememberNavController
import com.smaarig.portfolio_editor.navigation.BottomNavBar
import com.smaarig.portfolio_editor.navigation.MainNavigationGraph

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediaEditorApp() {
    val navController = rememberNavController();
    Scaffold(
        topBar = { TopAppBar(title = { Text("Portfolio Editor") }) },
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
    MediaEditorApp();
}