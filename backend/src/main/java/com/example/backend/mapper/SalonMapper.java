package com.example.backend.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dto.SalonRequest;
import com.example.backend.dto.SalonResponse;
import com.example.backend.entity.Salon;

@Mapper(componentModel = "spring")
public interface SalonMapper {

  SalonResponse toResponse(Salon salon);

  List<SalonResponse> toResponseList(List<Salon> salons);

  @Mapping(target = "id", ignore = true)
  Salon toEntity(SalonRequest request);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  void updateEntity(SalonRequest request, @MappingTarget Salon salon);
}
