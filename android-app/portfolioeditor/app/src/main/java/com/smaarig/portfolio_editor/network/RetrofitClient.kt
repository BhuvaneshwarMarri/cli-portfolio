package com.smaarig.portfolio_editor.network

import com.smaarig.portfolio_editor.BuildConfig
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory

object RetrofitClient {
    private val BASE_URL: String by lazy {
        val endpoint = BuildConfig.spring_endpoint
        if (endpoint.endsWith("/")) endpoint else "$endpoint/"
    }

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val skillsApi: SkillsApiService by lazy {
        retrofit.create(SkillsApiService::class.java)
    }

    val homeApi: HomeApiService by lazy {
        retrofit.create(HomeApiService::class.java)
    }

    // You can add more API interfaces here as you create them
    // val educationApi: EducationApiService by lazy { retrofit.create(EducationApiService::class.java) }
    // val projectsApi: ProjectsApiService by lazy { retrofit.create(ProjectsApiService::class.java) }
}
