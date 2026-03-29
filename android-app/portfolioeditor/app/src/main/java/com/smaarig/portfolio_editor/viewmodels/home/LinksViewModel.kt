package com.smaarig.portfolio_editor.viewmodels.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.home.Link
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class LinksUiState {
    object Loading : LinksUiState()
    data class Success(val data: List<Link>) : LinksUiState()
    data class Error(val message: String) : LinksUiState()
}

class LinksViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<LinksUiState>(LinksUiState.Loading)
    val uiState: StateFlow<LinksUiState> = _uiState

    init {
        fetchLinks()
    }

    fun fetchLinks() {
        viewModelScope.launch {
            _uiState.value = LinksUiState.Loading
            try {
                val response = RetrofitClient.homeApi.getLinks()
                _uiState.value = LinksUiState.Success(response)
            } catch (e: Exception) {
                _uiState.value = LinksUiState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun addLink(link: Link) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addLink(link)
                fetchLinks()
            } catch (e: Exception) { /* handle error */ }
        }
    }

    fun deleteLink(label: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteLink(label)
                if (_uiState.value is LinksUiState.Success) {
                    val currentList = (_uiState.value as LinksUiState.Success).data
                    _uiState.value = LinksUiState.Success(currentList.filter { it.label != label })
                }
            } catch (e: Exception) { /* handle error */ }
        }
    }
}
