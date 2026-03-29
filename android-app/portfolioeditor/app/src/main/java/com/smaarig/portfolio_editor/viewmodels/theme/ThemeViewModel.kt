package com.smaarig.portfolio_editor.viewmodels.theme

import androidx.lifecycle.ViewModel
import com.smaarig.portfolio_editor.ui.theme.AppTheme
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class ThemeViewModel : ViewModel() {
    private val _currentTheme = MutableStateFlow(AppTheme.Default)
    val currentTheme: StateFlow<AppTheme> = _currentTheme

    fun setTheme(theme: AppTheme) {
        _currentTheme.value = theme
    }
}
