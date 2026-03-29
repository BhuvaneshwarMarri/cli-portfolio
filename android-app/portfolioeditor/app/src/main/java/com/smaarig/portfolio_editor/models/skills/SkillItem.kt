package com.smaarig.portfolio_editor.models.skills

import com.google.gson.annotations.SerializedName

data class SkillItem(
    @SerializedName("name") val name: String,
    @SerializedName("level") val level: Any, // Can be String or Number
    @SerializedName("tag") val tag: String
)
