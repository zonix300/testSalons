package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "salons")
public class Salon {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "salon_seq")
  @SequenceGenerator(name = "salon_seq", sequenceName = "salons_id_seq", allocationSize = 1)
  Integer id;
  @Column(nullable = false)
  String placeId;

  @Column(nullable = false)
  String name;
  @Column(nullable = false)
  String address;
  @Column(nullable = false)
  String district;

  String phoneNumber;
  String website;
  Float rating;
  Integer reviewsNumber;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPlace_id() {
    return placeId;
  }

  public void setPlaceId(String placeId) {
    this.placeId = placeId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getDistrict() {
    return district;
  }

  public void setDistrict(String district) {
    this.district = district;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public String getPlaceId() {
    return placeId;
  }

  public Float getRating() {
    return rating;
  }

  public void setRating(Float rating) {
    this.rating = rating;
  }

  public Integer getReviewsNumber() {
    return reviewsNumber;
  }

  public void setReviewsNumber(Integer reviewsNumber) {
    this.reviewsNumber = reviewsNumber;
  }

}
