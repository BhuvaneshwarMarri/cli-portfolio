package com.smaarig.portfolio_editor.viewmodels.education

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class CoursesUiState {
    object Loading : CoursesUiState()
    data class Success(val data: List<String>) : CoursesUiState()
    data class Error(val message: String) : CoursesUiState()
}

class CoursesViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<CoursesUiState>(CoursesUiState.Loading)
    val uiState: StateFlow<CoursesUiState> = _uiState

    init {
        fetchCourses()
    }

    fun fetchCourses() {
        viewModelScope.launch {
            _uiState.value = CoursesUiState.Loading
            try {
                val courses = RetrofitClient.homeApi.getCourses()
                _uiState.value = CoursesUiState.Success(courses)
            } catch (e: Exception) {
                _uiState.value = CoursesUiState.Error(e.message ?: "Unknown Error")
            }
        }
    }

    fun addCourse(course: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addCourse(course)
                fetchCourses()
            } catch (e: Exception) {
                _uiState.value = CoursesUiState.Error(e.message ?: "Failed to add course")
            }
        }
    }

    fun deleteCourse(name: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteCourse(name)
                fetchCourses()
            } catch (e: Exception) {
                _uiState.value = CoursesUiState.Error(e.message ?: "Failed to delete course")
            }
        }
    }
}
