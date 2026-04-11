package com.smaarig.portfolio_editor.viewmodels.skills

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.skills.SkillGroup
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class SkillGroupUiState {
    object Loading : SkillGroupUiState()
    data class Success(val data: List<SkillGroup>) : SkillGroupUiState()
    data class Error(val message: String) : SkillGroupUiState()
}

class SkillGroupViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<SkillGroupUiState>(SkillGroupUiState.Loading)
    val uiState: StateFlow<SkillGroupUiState> = _uiState

    init {
        fetchSkillGroups()
    }

    fun fetchSkillGroups() {
        viewModelScope.launch {
            _uiState.value = SkillGroupUiState.Loading
            try {
                val response = RetrofitClient.skillsApi.getSkillGroups()
                _uiState.value = SkillGroupUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = SkillGroupUiState.Error(e.message ?: "An unknown error occurred")
            }
        }
    }

    fun addSkillGroup(skillGroup: SkillGroup) {
        viewModelScope.launch {
            try {
                RetrofitClient.skillsApi.addSkillGroup(skillGroup)
                fetchSkillGroups()
            } catch (e: Exception) {
                _uiState.value = SkillGroupUiState.Error(e.message ?: "Failed to add skill group")
            }
        }
    }

    fun deleteSkillGroup(title: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.skillsApi.deleteSkillGroup(title)
                if (_uiState.value is SkillGroupUiState.Success) {
                    val currentList = (_uiState.value as SkillGroupUiState.Success).data
                    _uiState.value = SkillGroupUiState.Success(
                        currentList.filter { it.title != title }
                    )
                }
            } catch (e: Exception) {
                _uiState.value = SkillGroupUiState.Error(e.message ?: "Failed to delete skill group")
            }
        }
    }
}
