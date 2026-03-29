package com.smaarig.portfolio_editor.network

import com.smaarig.portfolio_editor.models.home.Command
import com.smaarig.portfolio_editor.models.home.Interest
import com.smaarig.portfolio_editor.models.home.Link
import com.smaarig.portfolio_editor.models.education.Timeline
import com.smaarig.portfolio_editor.models.experience.Job
import com.smaarig.portfolio_editor.models.experience.SkillMatrix
import retrofit2.http.*

interface HomeApiService {
    // Commands
    @GET("home/commands")
    suspend fun getCommands(): List<Command>

    @POST("home/commands")
    suspend fun addCommand(@Body command: Command): Command

    @DELETE("home/commands/{cmd}")
    suspend fun deleteCommand(@Path("cmd") cmd: String)

    // Interests
    @GET("home/interests")
    suspend fun getInterests(): List<Interest>

    @POST("home/interests")
    suspend fun addInterest(@Body interest: Interest): Interest

    @DELETE("home/interests/{text}")
    suspend fun deleteInterest(@Path("text") text: String)

    // Links
    @GET("home/links")
    suspend fun getLinks(): List<Link>

    @POST("home/links")
    suspend fun addLink(@Body link: Link): Link

    @DELETE("home/links/{label}")
    suspend fun deleteLink(@Path("label") label: String)

    // Courses
    @GET("courses")
    suspend fun getCourses(): List<String>

    @POST("courses")
    suspend fun addCourse(@Body course: String): String

    @DELETE("courses/{name}")
    suspend fun deleteCourse(@Path("name") name: String)

    // Timeline
    @GET("courses/timeline")
    suspend fun getTimelines(): List<Timeline>

    @POST("courses/timeline")
    suspend fun addTimeline(@Body timeline: Timeline): Timeline

    @DELETE("courses/timeline/{title}")
    suspend fun deleteTimeline(@Path("title") title: String)

    // Experience - Jobs
    @GET("experience/jobs")
    suspend fun getJobs(): List<Job>

    @POST("experience/jobs")
    suspend fun addJob(@Body job: Job): Job

    @DELETE("experience/jobs/{company}/{title}")
    suspend fun deleteJob(@Path("company") company: String, @Path("title") title: String)

    // Experience - Skill Matrix
    @GET("experience/skill-matrix")
    suspend fun getSkillMatrix(): List<SkillMatrix>

    @POST("experience/skill-matrix")
    suspend fun addSkillMatrix(@Body skillMatrix: SkillMatrix): SkillMatrix

    @DELETE("experience/skill-matrix/{label}")
    suspend fun deleteSkillMatrix(@Path("label") label: String)

    // Projects
    @GET("projects")
    suspend fun getProjects(): List<String>

    @POST("projects")
    suspend fun addProject(@Body project: String): String

    @DELETE("projects/{name}")
    suspend fun deleteProject(@Path("name") name: String)
}
