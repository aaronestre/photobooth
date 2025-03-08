"use client";
import { useEffect, useRef } from "react";

export default function Camera() {
    const videoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1080,
                height: 1080,
            },
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div>
            <video className="object-cover w-[500px] h-[500px] border-2 border-white border-solid"ref={videoRef}></video>
        </div>
    );
}
