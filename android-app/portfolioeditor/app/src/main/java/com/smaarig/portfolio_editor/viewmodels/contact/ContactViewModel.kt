package com.smaarig.portfolio_editor.viewmodels.contact

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smaarig.portfolio_editor.models.contact.*
import com.smaarig.portfolio_editor.network.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class ContactUiState(
    val github: SocialLink? = null,
    val linkedin: SocialLink? = null,
    val twitter: SocialLink? = null,
    val availability: Availability? = null,
    val contactInfo: ContactInfo? = null,
    val openTo: List<OpenToInfo> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

class ContactViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(ContactUiState())
    val uiState: StateFlow<ContactUiState> = _uiState

    init {
        fetchAllData()
    }

    fun fetchAllData() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            try {
                val github = try { RetrofitClient.homeApi.getGithub() } catch (e: Exception) { null }
                val linkedin = try { RetrofitClient.homeApi.getLinkedin() } catch (e: Exception) { null }
                val twitter = try { RetrofitClient.homeApi.getTwitter() } catch (e: Exception) { null }
                val availability = try { RetrofitClient.homeApi.getAvailability() } catch (e: Exception) { null }
                val info = try { RetrofitClient.homeApi.getContactInfo() } catch (e: Exception) { null }
                val openTo = try { RetrofitClient.homeApi.getOpenTo() } catch (e: Exception) { emptyList() }

                _uiState.value = _uiState.value.copy(
                    github = github,
                    linkedin = linkedin,
                    twitter = twitter,
                    availability = availability,
                    contactInfo = info,
                    openTo = openTo,
                    isLoading = false
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(isLoading = false, error = e.message)
            }
        }
    }

    // Social Links
    fun updateGithub(link: SocialLink) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addGithub(link)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteGithub() {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteGithub()
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun updateLinkedin(link: SocialLink) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addLinkedin(link)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteLinkedin() {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteLinkedin()
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun updateTwitter(link: SocialLink) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addTwitter(link)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteTwitter() {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteTwitter()
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    // Availability
    fun updateAvailability(availability: Availability) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addAvailability(availability)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteAvailability() {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteAvailability()
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    // Contact Info
    fun updateContactInfo(info: ContactInfo) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addContactInfo(info)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteContactInfo() {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteContactInfo()
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    // Open To
    fun addOpenTo(info: OpenToInfo) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.addOpenTo(info)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }

    fun deleteOpenTo(text: String) {
        viewModelScope.launch {
            try {
                RetrofitClient.homeApi.deleteOpenTo(text)
                fetchAllData()
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(error = e.message)
            }
        }
    }
}
