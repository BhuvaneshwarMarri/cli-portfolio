package com.smaarig.portfolio_editor.viewmodels.experience

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.experience.SkillMatrix
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class SkillsMatrixUiState {
    object Loading : SkillsMatrixUiState()
    data class Success(val data: List<SkillMatrix>) : SkillsMatrixUiState()
    data class Error(val message: String) : SkillsMatrixUiState()
}

class SkillsMatrixViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<SkillsMatrixUiState>(SkillsMatrixUiState.Loading)
    val uiState: StateFlow<SkillsMatrixUiState> = _uiState

    init {
        fetchSkillMatrix()
    }

    fun fetchSkillMatrix() {
        viewModelScope.launch {
            _uiState.value = SkillsMatrixUiState.Loading
            try {
                val matrix = RetrofitClient.homeApi.getSkillMatrix()
                _uiState.value = SkillsMatrixUiState.Success(matrix)
            } catch (e: Exception) {
                _uiState.value = SkillsMatrixUiState.Error(e.message ?: "Unknown Error")
            }
        }
    }

    fun addSkillMatrix(skillMatrix: SkillMatrix) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addSkillMatrix(skillMatrix)
                fetchSkillMatrix()
            } catch (e: Exception) {
                _uiState.value = SkillsMatrixUiState.Error(e.message ?: "Failed to add skill matrix")
            }
        }
    }

    fun deleteSkillMatrix(label: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteSkillMatrix(label)
                fetchSkillMatrix()
            } catch (e: Exception) {
                _uiState.value = SkillsMatrixUiState.Error(e.message ?: "Failed to delete skill matrix")
            }
        }
    }
}
