package com.smaarig.portfolio_editor.screens.education.sections

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
import com.smaarig.portfolio_editor.screens.home.sections.ErrorState
import com.smaarig.portfolio_editor.viewmodels.education.CoursesUiState
import com.smaarig.portfolio_editor.viewmodels.education.CoursesViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CoursesScreen(
    viewModel: CoursesViewModel = viewModel()
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
                is CoursesUiState.Loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                is CoursesUiState.Success -> CourseList(state.data, onDelete = { viewModel.deleteCourse(it) })
                is CoursesUiState.Error -> ErrorState(state.message) { viewModel.fetchCourses() }
            }
        }
    }

    if (showAddDialog) {
        AddCourseDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = {
                viewModel.addCourse(it)
                showAddDialog = false
            }
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun CourseList(courses: List<String>, onDelete: (String) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(courses, key = { it }) { course ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .combinedClickable(
                        onClick = { },
                        onLongClick = { onDelete(course) }
                    ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
            ) {
                Text(
                    text = course,
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun AddCourseDialog(onDismiss: () -> Unit, onConfirm: (String) -> Unit) {
    var courseName by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Course") },
        text = {
            OutlinedTextField(
                value = courseName,
                onValueChange = { courseName = it },
                label = { Text("Course Name") },
                modifier = Modifier.fillMaxWidth()
            )
        },
        confirmButton = {
            Button(onClick = { onConfirm(courseName) }, enabled = courseName.isNotBlank()) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
