package com.smaarig.portfolio_editor.models.education

data class Timeline(
    val year: String,
    val title: String,
    val place: String,
    val detail: String,
    val tags: List<String>,
    val status: String
)
