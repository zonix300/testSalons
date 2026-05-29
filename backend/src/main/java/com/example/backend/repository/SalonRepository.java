package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.entity.Salon;

public interface SalonRepository extends JpaRepository<Salon, Integer> {

  Page<Salon> findAll(Pageable pageable);

  Optional<Salon> findByPlaceId(String placeId);

  @Query("SELECT s FROM Salon s WHERE LOWER(s.address) LIKE LOWER(CONCAT(:query, '%')) OR LOWER(s.district) LIKE LOWER(CONCAT(:query, '%'))")
  Page<Salon> findAllLikeQuery(@Param("query") String query, Pageable pageable);
}
