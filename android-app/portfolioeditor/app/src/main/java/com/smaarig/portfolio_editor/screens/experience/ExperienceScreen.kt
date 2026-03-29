package com.smaarig.portfolio_editor.screens.experience

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.smaarig.portfolio_editor.screens.home.SectionCard

@Composable
fun ExperienceScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        SectionCard(title = "Jobs", onClick = { navController.navigate("jobs") })
        SectionCard(title = "Skills Matrix", onClick = { navController.navigate("skills_matrix") })
    }
}
