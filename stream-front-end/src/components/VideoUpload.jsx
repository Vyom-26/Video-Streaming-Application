// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
function VideoUpload(){

    const [selectedFile, setSelectedFile] = useState(null);
    const [meta, setMeta] = useState({
        title:"",
        description:"",
    });
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    function handleFileChange(event){
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    function formFieldChange(event){
        // console.log(event.target.name);
        // console.log(event.target.value);
        setMeta({
            ...meta,
            [event.target.name]:event.target.value
        })
    }

    function handleForm(formEvent){
        formEvent.preventDefault();
        if(!selectedFile){
            alert("Select File!!");
            return;
        }
        //submit the file to the server
        saveVideoToServer(selectedFile, meta);
    }

    function resetForm(){
        setMeta({
            title:"",
            description:"",
        });
        setSelectedFile(null);
        setUploading(false);
    }

    //submit file to the server
    async function saveVideoToServer(video, videoMetaData){
        setUploading(true);
        //api call

        try{

            let formData = new FormData();
            formData.append("title", videoMetaData.title);
            formData.append("description", videoMetaData.description);
            formData.append("file", selectedFile);

            let response = await axios.post(`http://localhost:8080/api/v1/videos`, formData, {
              headers:{
                  'Content-Type' : 'multipart/form-data'
              },
                onUploadProgress:(progressEvent)=>{
                  const progress = Math.round((progressEvent.loaded*100)/progressEvent.total);
                  console.log(progressEvent);
                  setProgress(progress);
                },
            });
            console.log(response);
            setProgress(0);
            setMessage("File Uploaded!!!" + response.data.videoId);
            setUploading(false);
            toast.success("File Uploaded successfully!!!");
            resetForm();
        }catch(error){
            console.log(error);
            setMessage("Error in uploading file");
            setUploading(false);
            toast.error("File not Uploaded!!!");
        }
    }

    return (
        <div className="text-white">
            <Card className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1>
                        Upload Videos
                    </h1>
                </div>

                <div>
                    <form
                        noValidate
                        className="flex flex-col space-y-6"
                        onSubmit={handleForm}
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Video Title"/>
                            </div>
                            <TextInput
                                value={meta.title}
                                onChange={formFieldChange}
                                name="title"
                                placeholder="Enter Title"
                            />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="comment"
                                    value="Video Description"
                                />
                            </div>
                            <Textarea
                                value={meta.description}
                                name="description"
                                onChange={formFieldChange}
                                id="comment"
                                placeholder="Write video description"
                                required rows={4}
                            />
                        </div>
                        <div className="flex items-center space-x-5 justify-center">
                            <div className="shrink-0">
                                <img className="h-16 w-16 object-cover"
                                     src={videoLogo}
                                     alt="Current profile photo"/>
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    name="file"
                                    onChange={handleFileChange}
                                    type="file"
                                    className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                    "/>
                            </label>
                        </div>
                        <div className="">
                            {uploading && (
                                <Progress
                                    color={'green'}
                                    progress={progress}
                                    textLabel="Uploading"
                                    size="lg"
                                    labelProgress
                                    labelText
                                />
                            )}
                        </div>

                        <div className="">
                            {message &&
                                <Alert color={'success'} rounded withBorderAccent onDismiss={()=>{
                                    setMessage("");
                                }}>
                                    <span className="font-medium">Success alert!</span>
                                    {message}
                                </Alert>
                            }
                        </div>

                        <div className="flex justify-center">
                            <Button disabled={uploading} type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

import videoLogo from "../assets/video-posting.png";
import {Alert, Button, Card, Label, Progress, Textarea, TextInput} from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

export default VideoUpload;