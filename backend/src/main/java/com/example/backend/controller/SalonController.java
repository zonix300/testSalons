package com.example.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.SalonRequest;
import com.example.backend.dto.SalonResponse;
import com.example.backend.entity.Salon;
import com.example.backend.mapper.SalonMapper;
import com.example.backend.service.SalonService;

@RestController
@RequestMapping("/api/salons")
public class SalonController {

  private final SalonService salonService;
  private final SalonMapper salonMapper;

  public SalonController(SalonService salonService, SalonMapper salonMapper) {
    this.salonService = salonService;
    this.salonMapper = salonMapper;
  }

  @GetMapping
  public ResponseEntity<Page<SalonResponse>> getSalons(
      @RequestParam(name = "query", required = false) String query,
      Pageable pageable) {

    Page<Salon> salons;
    System.out.println(query);

    if (query != null && !query.isBlank()) {
      salons = salonService.getAllLikeQuery(query, pageable);
    } else {
      salons = salonService.getAll(pageable);
    }

    Page<SalonResponse> response = salons.map(salonMapper::toResponse);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{placeId}")
  public ResponseEntity<SalonResponse> getSalon(
      @PathVariable(name = "placeId") String placeId) {
    Salon salon = salonService.getByPlaceId(placeId);
    return ResponseEntity.ok(salonMapper.toResponse(salon));
  }

  @PutMapping("/{placeId}")
  public ResponseEntity<SalonResponse> updateSalon(
      @PathVariable(name = "placeId") String placeId,
      @RequestBody SalonRequest request) {
    Salon salon = salonService.updateSalon(placeId, request);
    return ResponseEntity.ok(salonMapper.toResponse(salon));
  }
}
