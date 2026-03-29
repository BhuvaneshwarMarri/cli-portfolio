package com.smaarig.portfolio_editor.viewmodels.experience

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.experience.Job
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class JobsUiState {
    object Loading : JobsUiState()
    data class Success(val data: List<Job>) : JobsUiState()
    data class Error(val message: String) : JobsUiState()
}

class JobsViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<JobsUiState>(JobsUiState.Loading)
    val uiState: StateFlow<JobsUiState> = _uiState

    init {
        fetchJobs()
    }

    fun fetchJobs() {
        viewModelScope.launch {
            _uiState.value = JobsUiState.Loading
            try {
                val jobs = RetrofitClient.homeApi.getJobs()
                _uiState.value = JobsUiState.Success(jobs)
            } catch (e: Exception) {
                _uiState.value = JobsUiState.Error(e.message ?: "Unknown Error")
            }
        }
    }

    fun addJob(job: Job) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addJob(job)
                fetchJobs()
            } catch (e: Exception) {
                _uiState.value = JobsUiState.Error(e.message ?: "Failed to add job")
            }
        }
    }

    fun deleteJob(company: String, title: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteJob(company, title)
                fetchJobs()
            } catch (e: Exception) {
                _uiState.value = JobsUiState.Error(e.message ?: "Failed to delete job")
            }
        }
    }
}
