package com.smaarig.portfolio_editor.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

enum class AppTheme {
    Default, Catppuccin, Gruvbox, Forest, Nothing, Nord, Dracula, TokyoNight
}

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
)

private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40
)

private val CatppuccinColorScheme = darkColorScheme(
    primary = CatppuccinPrimary,
    background = CatppuccinBackground,
    surface = CatppuccinSurface,
    onSurface = CatppuccinOnSurface
)

private val GruvboxColorScheme = darkColorScheme(
    primary = GruvboxPrimary,
    background = GruvboxBackground,
    surface = GruvboxSurface,
    onSurface = GruvboxOnSurface
)

private val ForestColorScheme = lightColorScheme(
    primary = ForestPrimary,
    background = ForestBackground,
    surface = ForestSurface,
    onSurface = ForestOnSurface
)

private val NothingColorScheme = darkColorScheme(
    primary = NothingPrimary,
    background = NothingBackground,
    surface = NothingSurface,
    onSurface = NothingOnSurface
)

private val NordColorScheme = darkColorScheme(
    primary = NordPrimary,
    background = NordBackground,
    surface = NordSurface,
    onSurface = NordOnSurface
)

private val DraculaColorScheme = darkColorScheme(
    primary = DraculaPrimary,
    background = DraculaBackground,
    surface = DraculaSurface,
    onSurface = DraculaOnSurface
)

private val TokyoNightColorScheme = darkColorScheme(
    primary = TokyoNightPrimary,
    background = TokyoNightBackground,
    surface = TokyoNightSurface,
    onSurface = TokyoNightOnSurface
)

@Composable
fun PortfolioeditorTheme(
    theme: AppTheme = AppTheme.Default,
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when (theme) {
        AppTheme.Catppuccin -> CatppuccinColorScheme
        AppTheme.Gruvbox -> GruvboxColorScheme
        AppTheme.Forest -> ForestColorScheme
        AppTheme.Nothing -> NothingColorScheme
        AppTheme.Nord -> NordColorScheme
        AppTheme.Dracula -> DraculaColorScheme
        AppTheme.TokyoNight -> TokyoNightColorScheme
        AppTheme.Default -> {
            when {
                dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
                    val context = LocalContext.current
                    if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
                }
                darkTheme -> DarkColorScheme
                else -> LightColorScheme
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
