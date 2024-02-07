import React, { useRef, useState } from 'react';
import CustomOverlay from './CustomOverlay';
import ReactPlayer from 'react-player'
const Landing = () => {
    const rtspUrl = 'rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast';
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const videoRef = useRef(null);

    const togglePlay = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }

    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        video.volume = e.target.value;
        setVolume(e.target.value);
    };

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    const handlePlaybackRateChange = (e) => {
        const video = videoRef.current;
        video.playbackRate = e.target.value;
        setPlaybackRate(e.target.value);
    };

    const toggleFullScreen = () => {
        const video = videoRef.current;
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div>
            <CustomOverlay />
            
            <div className='mx-80 mt-20 w-[800px]'>
                <div className='bg-red-300'>
                    <ReactPlayer
                        ref={videoRef}
                        url={rtspUrl}
                        playing={isPlaying}
                        muted={isMuted}
                        volume={volume}
                        playbackRate={playbackRate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onVolumeChange={handleVolumeChange}
                        onProgress={handleTimeUpdate}
                        onPlaybackRateChange={handlePlaybackRateChange}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className='flex flex-row mt-4 gap-4'>
                    <button onClick={togglePlay} className={`px-4 py-2 ${isPlaying ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-3xl`}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={toggleMute} className={`px-4 py-2 ${isMuted ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-3xl`}>
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <div className="flex items-center gap-1">
                        <span>Volume</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="mr-2 w-40"
                        />
                        <span className="text-sm">{(volume * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Speed</span>
                        <input
                            type="range"
                            min="0.25"
                            max="2"
                            step="0.25"
                            value={playbackRate}
                            onChange={handlePlaybackRateChange}
                            className="mr-2 w-40"
                        />
                        <span className="text-sm">{(playbackRate)}x</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <button onClick={toggleFullScreen} className="px-4 py-2 bg-blue-500 text-white rounded-3xl">
                            {isFullScreen ? 'Exit FC' : 'Fullscreen'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
