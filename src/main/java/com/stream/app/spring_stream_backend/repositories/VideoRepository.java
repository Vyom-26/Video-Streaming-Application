package com.stream.app.spring_stream_backend.repositories;

import com.stream.app.spring_stream_backend.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, String> {
}
