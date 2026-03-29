package com.smaarig.portfolio_editor.viewmodels.projects

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class ProjectsUiState {
    object Loading : ProjectsUiState()
    data class Success(val data: List<String>) : ProjectsUiState()
    data class Error(val message: String) : ProjectsUiState()
}

class ProjectsViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<ProjectsUiState>(ProjectsUiState.Loading)
    val uiState: StateFlow<ProjectsUiState> = _uiState

    init {
        fetchProjects()
    }

    fun fetchProjects() {
        viewModelScope.launch {
            _uiState.value = ProjectsUiState.Loading
            try {
                val projects = RetrofitClient.homeApi.getProjects()
                _uiState.value = ProjectsUiState.Success(projects)
            } catch (e: Exception) {
                _uiState.value = ProjectsUiState.Error(e.message ?: "Unknown Error")
            }
        }
    }

    fun addProject(name: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addProject(name)
                fetchProjects()
            } catch (e: Exception) {
                _uiState.value = ProjectsUiState.Error(e.message ?: "Failed to add project")
            }
        }
    }

    fun deleteProject(name: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteProject(name)
                fetchProjects()
            } catch (e: Exception) {
                _uiState.value = ProjectsUiState.Error(e.message ?: "Failed to delete project")
            }
        }
    }
}
