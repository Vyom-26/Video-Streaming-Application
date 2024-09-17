---

# Video Streaming Application

A **Video Streaming Application** built with a **Spring Boot backend** and **React (Vite) frontend**. This application allows users to upload, store, and stream videos efficiently. It features real-time video delivery, course management, and an optimized front-end for a smooth streaming experience. It also integrates **FFmpeg** for video processing, ensuring support for various formats and resolutions.

---

# Table of Contents

1. Introduction
2. Features
3. Technologies Used
4. Project Structure
5. How It Works
6. FFmpeg Integration
7. Setup and Usage
8. Workflow
9. Classes Overview
10. Future Enhancements
11. Video Demonstration
12. Contributing
13. License

---

# Introduction

This Video Streaming Application is designed to handle video uploads, manage metadata, and stream videos to users in real-time. The backend is powered by Spring Boot for robust server-side processing and storage, while the frontend uses React (Vite) for high-speed and efficient rendering. The application integrates FFmpeg for advanced video processing, ensuring support for multiple formats and video compression.

---

# Features

1. **Video Upload:** Simple and intuitive interface for uploading videos.
2. **Real-Time Streaming:** Smooth, buffer-free video streaming.
3. **Course Management:** Videos can be grouped into courses, making it easier to manage educational content.
4. **Video Processing with FFmpeg:** FFmpeg is used to handle various video formats, compress files, and ensure compatibility.
5. **Responsive Frontend:** Built with React (Vite), the frontend ensures high performance and quick rendering.
6. **Database Management:** Stores metadata like video title, description, and file path using MySQL.

---

# Technologies Used

- Backend:
    - Spring Boot
    - Spring Data JPA
    - MySQL
    - Lombok
    - FFmpeg (For video processing)
- Frontend:
    - React (Vite)
    - HTML/CSS
    - JavaScript
 
---

# Project Structure

```
Video-Streaming-Application/
│
├── src/main/java/com/example/videostreaming/
│   ├── VideoStreamingApplication.java    # Main entry point for the Spring Boot backend
│   ├── controller/
│   │   └── VideoController.java          # Handles HTTP requests for video upload and streaming
│   ├── model/
│   │   └── Video.java                    # Entity representing the video details
│   │   └── Course.java                   # Entity representing a course containing videos
│   ├── service/
│   │   └── VideoService.java             # Business logic for managing videos
│   ├── repository/
│   │   └── VideoRepository.java          # Data access layer for videos
│
├── src/main/resources/
│   └── application.properties            # Configuration for MySQL and server
│
├── frontend/
│   ├── src/
│   │   └── App.jsx                       # Main React component
│   └── public/
│       └── index.html                    # Entry point for the React app
│
├── README.md                             # This file
├── pom.xml                               # Maven dependencies
└── package.json                          # Frontend dependencies
```

---

# How It Works

1. **Video Upload:** Users upload videos through the React frontend. The files are sent to the backend and stored on the server.
2. **Database:** The video metadata (title, description, file path) is stored in a MySQL database.
3. **Streaming:** When requested, the server streams the video files directly to the frontend using Spring Boot's powerful REST API.
4. **FFmpeg Processing:** The uploaded video is processed by FFmpeg to ensure proper format and resolution, which improves streaming performance and compatibility.
---

# FFmpeg Integration

The application integrates FFmpeg, a powerful multimedia framework, to handle video processing. Whenever a new video is uploaded, FFmpeg is triggered to convert the video into an optimized streaming format (HLS - HTTP Live Streaming). This ensures that the video can be streamed efficiently across different devices and network speeds.
   
