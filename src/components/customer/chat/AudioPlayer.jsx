import { useState, useEffect, useRef } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


const AudioPlayer = (props) => {
    const [play, setPlay] = useState(false)
    const audioRef = useRef(null)
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const audio = audioRef.current;
        const updateTime = () => setElapsed(audio.currentTime);
        audio.addEventListener('timeupdate', updateTime);
        return () => audio.removeEventListener('timeupdate', updateTime);
    },[])

    const toggleAudio = () => {
        if (play) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlay(!play);
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    const progress = props.duration > 0 ? elapsed / props.duration : 0;

    const Controls = ({ iconColor, barBg, barFill, timeColor }) => (
        <>
            {!play
                ? <FaPlay className={`${iconColor} h-6 w-6 md:h-7 md:w-7 cursor-pointer shrink-0`} onClick={toggleAudio} />
                : <FaPause className={`${iconColor} h-6 w-6 md:h-7 md:w-7 cursor-pointer shrink-0`} onClick={toggleAudio} />
            }
            <div className='flex flex-col justify-center flex-1 mx-3 gap-1'>
                <div className={`w-full h-1 rounded-full ${barBg}`}>
                    <div
                        className={`h-full rounded-full ${barFill} transition-all duration-100`}
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
                <div className={`text-xs ${timeColor} tabular-nums`}>
                    {formatTime(elapsed)} / {formatTime(props.duration)}
                </div>
            </div>
        </>
    );

    if (props.senderType == "USER") {
        return(
            <div className='rounded-lg p-2 bg-[#2aa1a3] flex items-center justify-start w-1/3 min-w-[200px] h-auto self-end'>
                <Controls
                    iconColor='text-white'
                    barBg='bg-white/30'
                    barFill='bg-white'
                    timeColor='text-white/80'
                />
                <audio ref={audioRef} src={props.fileUrl} onEnded={() => setPlay(false)}/>
            </div>
        )
    }
    return(
        <div className='rounded-lg p-2 bg-white border border-[var(--light-border-color)] flex items-center justify-start w-1/3 min-w-[200px] h-auto self-start'>
            <Controls
                iconColor='text-gray-600'
                barBg='bg-gray-200'
                barFill='bg-[#2aa1a3]'
                timeColor='text-gray-400'
            />
            <audio ref={audioRef} src={props.fileUrl} onEnded={() => setPlay(false)}/>
        </div>
    )
}

export default AudioPlayer