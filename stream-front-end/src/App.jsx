import './App.css'
import VideoUpload from "./components/VideoUpload.jsx";
import {Toaster} from "react-hot-toast";
import {useState} from "react";
import VideoPlayer from "./components/VideoPlayer.jsx";
import {Button, TextInput} from "flowbite-react";

function App() {

    const [fieldValue, setFieldValue] = useState(null);

    const [videoId, setVideoId] = useState(
        "d1cab11b-e285-451e-8960-479edd9a06a2"
    );

    function playVideo(videoId){
        setVideoId(videoId);
    }

  return (
    <>
        <Toaster/>
        <div className="flex flex-col items-center space-y-9 justify-center py-9">
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100">
                Video Streaming App
            </h1>

            <div className="flex mt-14 w-full justify-around">


                <VideoUpload/>


                <div>
                    {/*<h1 className="text-white text-center">Playing Video</h1>*/}
                    <div className="video-container">
                        <VideoPlayer
                            src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
                        />
                        <div className="video-controls my-4 w-52 flex items-center justify-center">
                            <TextInput onClick={(event)=>{
                                setFieldValue(event.target.value)
                            }} name="video_id_field" placeholder="Enter video id"/>
                            <Button onClick={()=>{
                                setVideoId(fieldValue);
                            }}>Play</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default App
