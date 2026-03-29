package com.smaarig.portfolio_editor.viewmodels.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.home.Interest
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class InterestsUiState {
    object Loading : InterestsUiState()
    data class Success(val data: List<Interest>) : InterestsUiState()
    data class Error(val message: String) : InterestsUiState()
}

class InterestsViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<InterestsUiState>(InterestsUiState.Loading)
    val uiState: StateFlow<InterestsUiState> = _uiState

    init {
        fetchInterests()
    }

    fun fetchInterests() {
        viewModelScope.launch {
            _uiState.value = InterestsUiState.Loading
            try {
                val response = RetrofitClient.homeApi.getInterests()
                _uiState.value = InterestsUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = InterestsUiState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun addInterest(interest: Interest) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addInterest(interest)
                fetchInterests()
            } catch (e: Exception) { /* handle error */ }
        }
    }

    fun deleteInterest(text: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteInterest(text)
                if (_uiState.value is InterestsUiState.Success) {
                    val currentList = (_uiState.value as InterestsUiState.Success).data
                    _uiState.value = InterestsUiState.Success(currentList.filter { it.text != text })
                }
            } catch (e: Exception) { /* handle error */ }
        }
    }
}
