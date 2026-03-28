package com.smaarig.portfolio_editor.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Terminal
import androidx.compose.material.icons.filled.Work
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomNavItem(
    val route: String,
    val icon: ImageVector,
    val label: String
){
    object Home: BottomNavItem(
        route = "home",
        icon = Icons.Default.Home,
        label = "Home"
    )
    object Education: BottomNavItem(
        route = "education",
        icon = Icons.Default.School,
        label = "Education"
    )
    object Projects: BottomNavItem(
        route = "projects",
        icon = Icons.Default.Terminal,
        label = "Projects"
    )
    object Skills: BottomNavItem(
        route = "skills",
        icon = Icons.Default.Code,
        label = "Skills"
    )
    object Experience: BottomNavItem(
        route = "experience",
        icon = Icons.Default.Work,
        label = "Experience"
    )
    object Contact: BottomNavItem(
        route = "contact",
        icon = Icons.Default.Email,
        label = "Contact"
    )
}