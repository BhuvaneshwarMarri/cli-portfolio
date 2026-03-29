package com.smaarig.portfolio_editor.viewmodels.skills

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.skills.ProficiencyLevel
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class ProficiencyLevelUiState {
    object Loading : ProficiencyLevelUiState()
    data class Success(val data: List<ProficiencyLevel>) : ProficiencyLevelUiState()
    data class Error(val message: String) : ProficiencyLevelUiState()
}

class ProficiencyLevelViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<ProficiencyLevelUiState>(ProficiencyLevelUiState.Loading)
    val uiState: StateFlow<ProficiencyLevelUiState> = _uiState

    init {
        fetchProficiencyLevels()
    }

    fun fetchProficiencyLevels() {
        viewModelScope.launch {
            _uiState.value = ProficiencyLevelUiState.Loading
            try {
                val response = RetrofitClient.skillsApi.getProficiencyLevels()
                _uiState.value = ProficiencyLevelUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = ProficiencyLevelUiState.Error(e.message ?: "An unknown error occurred")
            }
        }
    }

    fun addProficiencyLevel(proficiencyLevel: ProficiencyLevel) {
        viewModelScope.launch {
            try {
                RetrofitClient.skillsApi.addProficiencyLevel(proficiencyLevel)
                fetchProficiencyLevels() // Refresh list
            } catch (e: Exception) {
                // In a real app, handle error (e.g., via a separate channel/flow)
            }
        }
    }

    fun deleteProficiencyLevel(label: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.skillsApi.deleteProficiencyLevel(label)
                // Option 1: Re-fetch the list
                // fetchProficiencyLevels()

                // Option 2: Optimistically remove from local state
                if (_uiState.value is ProficiencyLevelUiState.Success) {
                    val currentList = (_uiState.value as ProficiencyLevelUiState.Success).data
                    _uiState.value = ProficiencyLevelUiState.Success(
                        currentList.filter { it.label != label }
                    )
                }
            } catch (e: Exception) {
                // In a real app, handle error
            }
        }
    }
}
