package com.example.backend.exception;

public class SalonNotFoundException extends RuntimeException {

  public SalonNotFoundException(String message) {
    super(message);
  }
}
