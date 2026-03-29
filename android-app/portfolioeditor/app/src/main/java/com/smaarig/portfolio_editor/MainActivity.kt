package com.smaarig.portfolio_editor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smaarig.portfolio_editor.ui.theme.PortfolioeditorTheme
import com.smaarig.portfolio_editor.viewmodels.theme.ThemeViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val themeViewModel: ThemeViewModel = viewModel()
            val currentTheme by themeViewModel.currentTheme.collectAsState()
            
            PortfolioeditorTheme(theme = currentTheme) {
                MediaEditorApp(themeViewModel = themeViewModel)
            }
        }
    }
}
