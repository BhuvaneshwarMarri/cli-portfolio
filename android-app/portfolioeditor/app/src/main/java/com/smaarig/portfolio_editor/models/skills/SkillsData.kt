package com.smaarig.portfolio_editor.models.skills

import com.google.gson.annotations.SerializedName

data class SkillsData (
    @SerializedName("_id") val id: String,
    @SerializedName("type") val type: String,
    @SerializedName("proficiency_levels") val proficiencyLevels: List<ProficiencyLevel>,
    @SerializedName("skill_groups") val skillGroups: List<SkillGroup>,
    @SerializedName("tech_stack") val techStack: List<String>
)