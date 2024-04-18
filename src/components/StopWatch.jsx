import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/videos/medium.mp4";

const StopWatch = () => {
   
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        // let intervalId;

        if (isRunning) {
            intervalRef.current = setInterval(() => {
              setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
        console.log(startTimeRef.current);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatTime = (time) => {
        // const getSeconds = `0${time % 60}`.slice(-2);
        // const minutes = `${Math.floor(time / 60)}`;
        // const getMinutes = `0${minutes % 60}`.slice(-2);
        // const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        // return `${getHours} : ${getMinutes} : ${getSeconds}`;
        let hours = Math.floor(elapsedTime / 3600000);
        let minutes = Math.floor((elapsedTime % 3600000) / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        let milliseconds = Math.floor((elapsedTime % 1000) / 100);
        hours=String(hours).padStart(2, '0');
        minutes=String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');
        return `${minutes} : ${seconds} : ${milliseconds}`
    }

    return (
      <>
        <div className="stopwatch">
          <video className="videoTag" id="background-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className="center">
            <div className="display">{formatTime()}</div>
            <div className="controls">
              <button onClick={handleStart} className="start-button">
                Start
              </button>
              <button onClick={handleStop} className="stop-button">
                Stop
              </button>
              <button onClick={handleReset} className="reset-button">
                Reset
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default StopWatch;