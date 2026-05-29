package com.example.backend.dto;

public record SalonResponse(
    String placeId,
    String name,
    String address,
    String district,
    String phoneNumber,
    String website,
    Float rating,
    Integer reviewsNumber) {
}
