package com.smaarig.portfolio_editor.network

import com.smaarig.portfolio_editor.models.skills.ProficiencyLevel
import com.smaarig.portfolio_editor.models.skills.SkillGroup
import com.smaarig.portfolio_editor.models.skills.SkillsData
import retrofit2.http.*

interface SkillsApiService {
    @GET("skills")
    suspend fun getSkills(): List<SkillsData>

    @POST("skills")
    suspend fun saveSkills(@Body skills: SkillsData): SkillsData

    @DELETE("skills/{id}")
    suspend fun deleteSkills(@Path("id") id: String)

    // Proficiency Levels
    @GET("skills/proficiency-levels")
    suspend fun getProficiencyLevels(): List<ProficiencyLevel>

    @POST("skills/proficiency-levels")
    suspend fun addProficiencyLevel(@Body proficiencyLevel: ProficiencyLevel): ProficiencyLevel

    @DELETE("skills/proficiency-levels/{label}")
    suspend fun deleteProficiencyLevel(@Path("label") label: String)

    // Skill Groups
    @GET("skills/skill-groups")
    suspend fun getSkillGroups(): List<SkillGroup>

    @POST("skills/skill-groups")
    suspend fun addSkillGroup(@Body skillGroup: SkillGroup): SkillGroup

    @DELETE("skills/skill-groups/{title}")
    suspend fun deleteSkillGroup(@Path("title") title: String)

    // Tech Stack
    @GET("skills/tech-stack")
    suspend fun getTechStack(): List<String>

    @POST("skills/tech-stack")
    suspend fun addTechStack(@Body techStack: okhttp3.RequestBody): String

    @DELETE("skills/tech-stack/{name}")
    suspend fun deleteTechStack(@Path("name") name: String)
}
