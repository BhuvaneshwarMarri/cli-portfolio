package com.smaarig.portfolio_editor.viewmodels.education

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.education.Timeline
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class TimelinesUiState {
    object Loading : TimelinesUiState()
    data class Success(val data: List<Timeline>) : TimelinesUiState()
    data class Error(val message: String) : TimelinesUiState()
}

class TimelinesViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<TimelinesUiState>(TimelinesUiState.Loading)
    val uiState: StateFlow<TimelinesUiState> = _uiState

    init {
        fetchTimelines()
    }

    fun fetchTimelines() {
        viewModelScope.launch {
            _uiState.value = TimelinesUiState.Loading
            try {
                val timelines = RetrofitClient.homeApi.getTimelines()
                _uiState.value = TimelinesUiState.Success(timelines)
            } catch (e: Exception) {
                _uiState.value = TimelinesUiState.Error(e.message ?: "Unknown Error")
            }
        }
    }

    fun addTimeline(timeline: Timeline) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addTimeline(timeline)
                fetchTimelines()
            } catch (e: Exception) {
                _uiState.value = TimelinesUiState.Error(e.message ?: "Failed to add timeline")
            }
        }
    }

    fun deleteTimeline(title: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteTimeline(title)
                fetchTimelines()
            } catch (e: Exception) {
                _uiState.value = TimelinesUiState.Error(e.message ?: "Failed to delete timeline")
            }
        }
    }
}
