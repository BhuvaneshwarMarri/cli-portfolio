package com.smaarig.portfolio_editor.models.contact

data class SocialLink(
    val url: String,
    val handle: String
)

data class Availability(
    val status: String,
    val type: String,
    val timezone: String,
    val response_time: String,
    val preferred_contact: String
)

data class ContactInfo(
    val email: String
)

data class OpenToInfo(
    val text: String,
    val active: Boolean
)
