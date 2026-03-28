package com.smaarig.portfolio_editor.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun BottomNavBar(
    navController: NavHostController,
){
    val items = listOf(
        BottomNavItem.Home,
        BottomNavItem.Education,
        BottomNavItem.Skills,
        BottomNavItem.Projects,
        BottomNavItem.Experience,
        BottomNavItem.Contact
    )
    NavigationBar {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route
        items.forEach { item ->
            val isSelected = currentRoute == item.route
            NavigationBarItem(
                selected = isSelected,
                onClick = {
                    navController.navigate(item.route) {
                        navController.graph.startDestinationRoute?.let{ route->
                            popUpTo(route) {saveState = true}
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                icon = {
                    Box(
                       contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .background(
                                color = if (isSelected) {
                                    MaterialTheme.colorScheme.secondaryContainer
                                } else {
                                    Color.Transparent
                                },
                                shape = CircleShape
                            )
                            .padding(12.dp)
                    ){
                        Icon(
                            imageVector = item.icon,
                            contentDescription = item.label,
                            tint = if(isSelected){
                                MaterialTheme.colorScheme.onSecondaryContainer
                            }else {
                                MaterialTheme.colorScheme.onSurfaceVariant
                            }
                        )
                    }
                },
                label = {Text(text=item.label)},
                colors = NavigationBarItemDefaults.colors(
                    indicatorColor = Color.Transparent
                )
            )
        }
    }
}