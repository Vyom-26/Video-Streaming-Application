import React, {useEffect, useRef} from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video-js.css";
import toast from "react-hot-toast";


function VideoPlayer({src}){
    const videoRef = useRef();
    const playerRef = useRef();

    useEffect(() => {
        //for init
        playerRef.current = videojs(videoRef.current, {
            controls:true,
            autoplay:true,
            muted:true,
            preload:"auto",
        });

        if((Hls.isSupported())){
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
                videoRef.current.play();
            });
        }
        else if(videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('canplay', ()=>{
                videoRef.current.play();
            })
        }
        else{
            console.log("video format not supported!");
            toast.error("Video format not supported!");
        }

    }, [src]);

    return (
        <div>
            <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="640"
                data-setup="{}"
                ref={videoRef}
            >
            </video>
        </div>
    )
}

export default VideoPlayer;