package com.smaarig.portfolio_editor.models.skills

import com.google.gson.annotations.SerializedName

data class ProficiencyLevel(
    @SerializedName("label") val label: String,
    @SerializedName("range") val range: String,
    @SerializedName("color") val color: String,
    @SerializedName("skills") val skills: List<String>?
)