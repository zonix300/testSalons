package com.example.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.example.backend.dto.SalonRequest;
import com.example.backend.entity.Salon;
import com.example.backend.exception.SalonNotFoundException;
import com.example.backend.mapper.SalonMapper;
import com.example.backend.repository.SalonRepository;

@Service
public class SalonService {

  private final SalonRepository salonRepository;
  private final SalonMapper salonMapper;

  public SalonService(SalonRepository salonRepository, SalonMapper salonMapper) {
    this.salonRepository = salonRepository;
    this.salonMapper = salonMapper;
  }

  public Page<Salon> getAll(Pageable pageable) {
    return salonRepository.findAll(pageable);
  }

  public Page<Salon> getAllLikeQuery(String query, Pageable pageable) {
    return salonRepository.findAllLikeQuery(query, pageable);
  }

  public Salon getByPlaceId(String placeId) {
    return salonRepository.findByPlaceId(placeId)
        .orElseThrow(() -> new SalonNotFoundException("Salon not found with place id: " + placeId));
  }

  public Salon updateSalon(String placeId, SalonRequest request) {
    Salon salon = salonRepository.findByPlaceId(placeId)
        .orElseThrow(() -> new SalonNotFoundException("Salon not found with place id: " + placeId));
    salonMapper.updateEntity(request, salon);

    return salonRepository.save(salon);
  }
}
