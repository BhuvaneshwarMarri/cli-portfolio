package com.smaarig.portfolio_editor.viewmodels.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.home.Command
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class CommandsUiState {
    object Loading : CommandsUiState()
    data class Success(val data: List<Command>) : CommandsUiState()
    data class Error(val message: String) : CommandsUiState()
}

class CommandsViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<CommandsUiState>(CommandsUiState.Loading)
    val uiState: StateFlow<CommandsUiState> = _uiState

    init {
        fetchCommands()
    }

    fun fetchCommands() {
        viewModelScope.launch {
            _uiState.value = CommandsUiState.Loading
            try {
                val response = RetrofitClient.homeApi.getCommands()
                _uiState.value = CommandsUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = CommandsUiState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun addCommand(command: Command) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addCommand(command)
                fetchCommands()
            } catch (e: Exception) { /* handle error */ }
        }
    }

    fun deleteCommand(cmd: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteCommand(cmd)
                if (_uiState.value is CommandsUiState.Success) {
                    val currentList = (_uiState.value as CommandsUiState.Success).data
                    _uiState.value = CommandsUiState.Success(currentList.filter { it.cmd != cmd })
                }
            } catch (e: Exception) { /* handle error */ }
        }
    }
}
