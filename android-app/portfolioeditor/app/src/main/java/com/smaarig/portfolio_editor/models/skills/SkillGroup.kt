package com.smaarig.portfolio_editor.models.skills

import com.google.gson.annotations.SerializedName

data class SkillGroup(
    @SerializedName("title") val title: String,
    @SerializedName("icon") val icon: String,
    @SerializedName("color") val color: String,
    @SerializedName("skills") val skills: List<SkillItem>?
)
