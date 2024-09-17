package com.stream.app.spring_stream_backend.controllers;

import com.stream.app.spring_stream_backend.AppConstants;
import com.stream.app.spring_stream_backend.entities.Video;
import com.stream.app.spring_stream_backend.payload.CustomeMessage;
import com.stream.app.spring_stream_backend.services.VideoService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin("*")
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    //video upload
    @PostMapping
    public ResponseEntity<?>create(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description
    ){
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setVideoId(UUID.randomUUID().toString());
        Video savedVideo = videoService.save(video, file);

        if(savedVideo != null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(video);
        }
        else{
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CustomeMessage.builder()
                            .message("Video not uploaded")
                            .success(false)
                            .build());
        }
    }

    //get all videos
    @GetMapping
    public List<Video> getAll(){
        return videoService.getAll();
    }


    //stream video
    @GetMapping("/stream/{videoId}")
    public ResponseEntity<Resource> stream(
            @PathVariable String videoId
    ){
        Video video = videoService.get(videoId);

        String contentType =  video.getContentType();
        String filePath = video.getFilePath();

        Resource resource = new FileSystemResource(filePath);

        if(contentType==null){
            contentType = "applications/octet-stream";
        }

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }


    //stream video in chunks
    @GetMapping("/stream/range/{videoId}")
    public ResponseEntity<Resource> streamVideoRange(
            @PathVariable String videoId,
            @RequestHeader(value ="Range", required = false) String range
    ){
        System.out.println(range);

        Video video = videoService.get(videoId);
        Path path = Paths.get(video.getFilePath());

        Resource resource = new FileSystemResource(path);

        String contentType =  video.getContentType();
        if(contentType==null){
            contentType = "application/octet-stream";
        }
        //file length
        long fileLength = path.toFile().length();

        if(range==null){
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        }

        long rangeStart;
        long rangeEnd;

        String[] ranges = range.replace("bytes=","").split("-");

        rangeStart = Long.parseLong(ranges[0]);

        rangeEnd = rangeStart + AppConstants.CHUNK_SIZE;

        if(rangeEnd>=fileLength){
            rangeEnd = fileLength-1;
        }
//        if(ranges.length > 1){
//            rangeEnd = Long.parseLong(ranges[1]);
//        }
//        else{
//            rangeEnd = fileLength - 1;
//        }
//
//        if(rangeEnd>fileLength-1){
//            rangeEnd = fileLength - 1;
//        }

        System.out.println("range start: "+rangeStart);
        System.out.println("range end: "+rangeEnd);
        System.out.println("Video Streaming!!!");
        InputStream inputStream;

        try{
            inputStream = Files.newInputStream(path);
            inputStream.skip(rangeStart);

            long contentLength = rangeEnd - rangeStart + 1;
            byte[] data = new byte[(int)contentLength];
            inputStream.read(data, 0, data.length);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Range", "bytes "+rangeStart+"-"+rangeEnd+"/"+fileLength);
            headers.add("Cache-Control", "no-cache");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");
            headers.add("X-Content-Type-Options", "nosniff");
            headers.setContentLength(contentLength);

            return ResponseEntity
                    .status(HttpStatus.PARTIAL_CONTENT)
                    .headers(headers)
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(new ByteArrayResource(data));

        }catch(IOException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }

    //master m3u8 file
    @Value("${file.video.hsl}")
    private String HSL_DIR;
    @GetMapping("/{videoId}/master.m3u8")
    public ResponseEntity<Resource> serveMasterFile(
            @PathVariable String videoId
    ){
        //creating path
        Path path = Paths.get(HSL_DIR,videoId,"master.m3u8");

        System.out.println(path);

        if(!Files.exists(path)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Resource resource = new FileSystemResource(path);

        return ResponseEntity
                .ok()
                .header(
                        HttpHeaders.CONTENT_TYPE,"application/vnd.apple.mpegurl"
                )
                .body(resource);
    }

    //serve the segments
    @GetMapping("/{videoId}/{segment}.ts")
    public ResponseEntity<Resource> serveSegments(
            @PathVariable String videoId,
            @PathVariable String segment
    ){
        //create Path for segment
        Path path = Paths.get(HSL_DIR,videoId,segment+".ts");

        if(!Files.exists(path)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Resource resource = new FileSystemResource(path);

        return ResponseEntity
                .ok()
                .header(
                        HttpHeaders.CONTENT_TYPE,"video/mp2t"
                )
                .body(resource);
    }
}