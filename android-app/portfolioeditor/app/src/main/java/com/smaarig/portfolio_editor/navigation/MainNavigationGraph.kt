package com.smaarig.portfolio_editor.navigation

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.smaarig.portfolio_editor.screens.contact.ContactScreen
import com.smaarig.portfolio_editor.screens.settings.SettingsScreen
import com.smaarig.portfolio_editor.screens.education.sections.CoursesScreen
import com.smaarig.portfolio_editor.screens.education.EducationScreen
import com.smaarig.portfolio_editor.screens.education.sections.TimelineScreen
import com.smaarig.portfolio_editor.screens.experience.ExperienceScreen
import com.smaarig.portfolio_editor.screens.experience.sections.JobsScreen
import com.smaarig.portfolio_editor.screens.experience.sections.SkillsMatrixScreen
import com.smaarig.portfolio_editor.screens.home.sections.CommandsScreen
import com.smaarig.portfolio_editor.screens.home.HomeScreen
import com.smaarig.portfolio_editor.screens.home.sections.InterestsScreen
import com.smaarig.portfolio_editor.screens.home.sections.LinksScreen
import com.smaarig.portfolio_editor.screens.projects.ProjectsScreen
import com.smaarig.portfolio_editor.screens.projects.sections.ProjectsToIncludeScreen
import com.smaarig.portfolio_editor.screens.skills.SkillsScreen
import com.smaarig.portfolio_editor.screens.skills.sections.ProficiencyLevelsScreen
import com.smaarig.portfolio_editor.screens.skills.sections.SkillGroupsScreen
import com.smaarig.portfolio_editor.screens.skills.sections.TechStackScreen

@Composable
fun MainNavigationGraph(
    navController: NavHostController,
    innerPadding: PaddingValues,
    themeViewModel: com.smaarig.portfolio_editor.viewmodels.theme.ThemeViewModel
){
    NavHost(
        navController = navController,
        startDestination = BottomNavItem.Home.route,
        modifier = Modifier.padding(
            top = innerPadding.calculateTopPadding(),
            bottom = 100.dp
        )
    ){
        composable(BottomNavItem.Home.route) {
            HomeScreen(navController)
        }
        composable("settings") {
            SettingsScreen(themeViewModel)
        }
        composable("commands") {
            CommandsScreen()
        }
        composable("interests") {
            InterestsScreen()
        }
        composable("links") {
            LinksScreen()
        }
        composable(BottomNavItem.Education.route) {
            EducationScreen(navController)
        }
        composable("courses") {
            CoursesScreen()
        }
        composable("timeline") {
            TimelineScreen()
        }
        composable(BottomNavItem.Experience.route) {
            ExperienceScreen(navController)
        }
        composable("jobs") {
            JobsScreen()
        }
        composable("skills_matrix") {
            SkillsMatrixScreen()
        }
        composable(BottomNavItem.Skills.route) {
            SkillsScreen(navController)
        }
        composable("proficiency_levels") {
            ProficiencyLevelsScreen()
        }
        composable("skill_groups") {
            SkillGroupsScreen()
        }
        composable("tech_stack") {
            TechStackScreen()
        }
        composable(BottomNavItem.Contact.route) {
            ContactScreen()
        }
        composable(BottomNavItem.Projects.route) {
            ProjectsScreen(navController)
        }
        composable("projects_to_include") {
            ProjectsToIncludeScreen()
        }
    }
}
