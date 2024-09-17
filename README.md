---

# Video Streaming Application

A **Video Streaming Application** built with a **Spring Boot backend** and **React (Vite) frontend**. This application allows users to upload, store, and stream videos efficiently. It features real-time video delivery, course management, and an optimized front-end for a smooth streaming experience. It also integrates **FFmpeg** for video processing, ensuring support for various formats and resolutions.
![Screenshot 2024-09-17 145623](https://github.com/user-attachments/assets/6541c5e6-fa33-4237-8be4-51624f4b7480)

---

# Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [How It Works](#how-it-works)
6. [FFmpeg Integration](#ffmpeg-integration)
7. [Setup and Usage](#setup-and-usage)
8. [Classes Overview](#classes-overview)
9. [Future Enhancements](#future-enhancements)
10. [Contributing](#contributing)

---

# Introduction

This Video Streaming Application is designed to handle video uploads, manage metadata, and stream videos to users in real-time. The backend is powered by Spring Boot for robust server-side processing and storage, while the frontend uses React (Vite) for high-speed and efficient rendering. The application integrates FFmpeg for advanced video processing, ensuring support for multiple formats and video compression.
![Screenshot 2024-09-17 145828](https://github.com/user-attachments/assets/0b32a99e-4163-47b3-93eb-585b853f7e58)
*Uploading a new video file.* 
![Screenshot 2024-09-17 145715](https://github.com/user-attachments/assets/35969612-f4b7-43ff-9c01-4e2366e21a45)
*Video uploaded sucessfully* 


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

 - The application integrates FFmpeg, a powerful multimedia framework, to handle video processing. Whenever a new video is uploaded, FFmpeg is triggered to convert the video into an optimized streaming format (HLS - HTTP Live Streaming). This ensures that the video can be streamed efficiently across different devices and network speeds.

 - **Video Format Conversion:** Uploaded videos are processed to generate HLS streams (.m3u8 and .ts segments).
 - **Segmented Video Streaming:** FFmpeg splits the video into multiple segments for efficient streaming, ensuring smooth playback.
 - **Optimized Video Playback:** The integration with FFmpeg ensures that videos are optimized for streaming with HLS (HTTP Live Streaming), supporting seamless adaptive bitrate streaming.

 ## FFmpeg Command Breakdown

 - The FFmpeg command used in the project is designed to convert an uploaded video into HLS (HTTP Live Streaming) format for optimized streaming. Here's a detailed breakdown of the command:
 ```
   String ffmpegCmd = String.format(
    "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\" \"%s/master.m3u8\"",
    videoPath.toString(), outputPath.toString(), outputPath.toString()
);
 ```
- **ffmpeg:** This is the FFmpeg executable, a widely-used tool for video/audio processing.

- **-i "%s":** Specifies the input file. Here, %s is replaced by the absolute path of the uploaded video (videoPath.toString()).

- **-c libx264:** This sets the video codec to libx264, which is a widely-used encoder for H.264 video compression. H.264 provides good video quality at lower bitrates and is compatible with most browsers and devices.

- **-c aac:** This sets the audio codec to AAC (Advanced Audio Coding), a standard for audio compression and streaming.

- **-strict -2:** This flag allows the use of experimental features (AAC audio in this case). Without this flag, FFmpeg might not allow certain codec configurations.

- **-f hls:** This option sets the output format to HLS (HTTP Live Streaming). HLS is a protocol for adaptive streaming, used for delivering content smoothly across varying network conditions.

- **-hls_time 10:** This option specifies the duration of each HLS segment in seconds. Here, each segment will be 10 seconds long.

- **-hls_list_size 0:** This configures the HLS playlist to include all segments indefinitely. By setting this to 0, all segments are kept in the playlist without limit.

- **-hls_segment_filename "%s/segment_%%3d.ts":** This specifies the naming pattern for the output segments. %s is the output directory path, and %%3d ensures the segment files are numbered sequentially with three digits (e.g., segment_001.ts, segment_002.ts).

 - **"%s/master.m3u8":** This specifies the name of the HLS playlist file (master.m3u8), which references all the video segments. The playlist file is what the video player uses to stream the video.
![Screenshot 2024-09-17 145849](https://github.com/user-attachments/assets/5d7b63eb-e597-4fb1-83cb-9a9de86d4316)
![Screenshot 2024-09-17 145908](https://github.com/user-attachments/assets/5a9eb2fb-d8dc-4f36-9f29-6c6fac7a7f8e)
*This is the implementation of ffmpeg which gets hit while uploading videos*

![Screenshot 2024-09-17 150104](https://github.com/user-attachments/assets/64384c01-2921-4145-bc45-8d37d9d0af9a)
*This is the master.m3u8 file and one of the various segment.ts files created by utilizing ffmpeg*




---

# Setup and Usage

## Backend Setup:

1. **Clone the repository:**
```
git clone https://github.com/your-username/Video-Streaming-Application

```

2. **Navigate to the backend directory:**
```
cd Video-Streaming-Application/backend

```

3. **Configure the database in application.properties:**
```
spring.datasource.url=jdbc:mysql://localhost:3306/video_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

4. **Install dependencies and run the backend:**
```
mvn clean install
mvn spring-boot:run
```

## Frontend Setup:

1. **Navigate to the frontend directory:**
```
cd Video-Streaming-Application/frontend
```
2. **Install dependencies:**
```
   npm install
```
3. **Run the frontend:**
```
   npm run dev
```


---

# Classes Overview

1. **VideoController:** Handles REST endpoints for video-related operations, such as uploading videos and fetching video details.
2. **Video:** Entity class representing a video file with attributes like title, description, and file path.
3. **Course:** Entity class representing a collection of videos.
4. **VideoRepository:** Interface for interacting with the database using Spring Data JPA.
5. **VideoService:** Service layer responsible for business logic related to video upload and retrieval.
6. **CustomMessage:** Payload class used to send custom responses to the frontend.

---

# Future Enhancements

1. **User Authentication:** Add user login and authentication to manage personalized video content.
2. **Video Transcoding:** Implement video transcoding to support multiple video formats and resolutions.
3. **Commenting System:** Allow users to leave comments on videos.
4. **Recommendations:** Implement a recommendation system based on user watch history.

---

# Contributing

- Contributions are welcome! If you'd like to contribute, please follow the standard GitHub flow:
   - Fork the repository.
   - Create a new branch.
   - Make your changes and commit them.
   - Push to your fork.
   - Submit a pull request.
 
---

