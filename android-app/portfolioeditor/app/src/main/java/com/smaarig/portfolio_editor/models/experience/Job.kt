package com.smaarig.portfolio_editor.models.experience

data class Job(
    val title: String,
    val company: String,
    val period: String,
    val duration: String,
    val status: String,
    val type: String,
    val location: String,
    val stack: List<String>,
    val bullets: List<String>,
    val metrics: List<Metric>
)

data class Metric(
    val label: String,
    val value: String,
    val color: String
)
