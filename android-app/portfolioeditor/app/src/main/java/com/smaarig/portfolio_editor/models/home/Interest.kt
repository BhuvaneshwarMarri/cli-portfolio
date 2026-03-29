package com.smaarig.portfolio_editor.models.home

import com.google.gson.annotations.SerializedName

data class Interest(
    @SerializedName("icon") val icon: String,
    @SerializedName("text") val text: String
)
