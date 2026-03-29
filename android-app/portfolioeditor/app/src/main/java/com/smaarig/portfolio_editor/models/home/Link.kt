package com.smaarig.portfolio_editor.models.home

import com.google.gson.annotations.SerializedName

data class Link(
    @SerializedName("icon") val icon: String,
    @SerializedName("label") val label: String,
    @SerializedName("href") val href: String,
    @SerializedName("val") val value: String,
    @SerializedName("active") val active: Boolean
)
