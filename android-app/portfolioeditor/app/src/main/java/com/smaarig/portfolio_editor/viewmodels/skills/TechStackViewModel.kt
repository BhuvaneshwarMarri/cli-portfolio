package com.smaarig.portfolio_editor.viewmodels.skills

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.RequestBody

sealed class TechStackUiState {
    object Loading : TechStackUiState()
    data class Success(val data: List<String>) : TechStackUiState()
    data class Error(val message: String) : TechStackUiState()
}

class TechStackViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<TechStackUiState>(TechStackUiState.Loading)
    val uiState: StateFlow<TechStackUiState> = _uiState

    init {
        fetchTechStack()
    }

    fun fetchTechStack() {
        viewModelScope.launch {
            _uiState.value = TechStackUiState.Loading
            try {
                val response = RetrofitClient.skillsApi.getTechStack()
                _uiState.value = TechStackUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = TechStackUiState.Error(e.message ?: "An unknown error occurred")
            }
        }
    }

    fun addTechStack(name: String) {
        viewModelScope.launch {
            try {
                val body = RequestBody.create(MediaType.parse("text/plain"), name)
                RetrofitClient.skillsApi.addTechStack(body)
                fetchTechStack()
            } catch (e: Exception) {
                // handle error
            }
        }
    }

    fun deleteTechStack(name: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.skillsApi.deleteTechStack(name)
                if (_uiState.value is TechStackUiState.Success) {
                    val currentList = (_uiState.value as TechStackUiState.Success).data
                    _uiState.value = TechStackUiState.Success(
                        currentList.filter { it != name }
                    )
                }
            } catch (e: Exception) {
                // handle error
            }
        }
    }
}
