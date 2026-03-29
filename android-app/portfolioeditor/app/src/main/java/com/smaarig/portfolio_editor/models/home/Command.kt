package com.smaarig.portfolio_editor.models.home

import com.google.gson.annotations.SerializedName

data class Command(
    @SerializedName("cmd") val cmd: String,
    @SerializedName("desc") val desc: String
)
