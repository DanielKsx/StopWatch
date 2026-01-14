import styles from './StopWatch.module.scss';
import Button from '../Button/Button';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import { useEffect, useRef, useState } from 'react';


const StopWatch = () => {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!isRunning) return;

        timerRef.current = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1);

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [isRunning]);
    
    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (t) => {
        const ms = (t % 1000);
        const totalSeconds = Math.floor(t / 1000);

        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);

        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');
        const milli = String(ms).padStart(2, '0');

        return h + ':' + m + ':' + s + '.' + milli;
    };


    return (
        <section className={styles.stopWatch}>
            <TimeDisplay value={formatTime(time)} />

            <div className={styles.controls}>
                <Button onClick={handleStart} disabled={isRunning}>Start</Button>
                <Button onClick={handleStop} disabled={!isRunning}>Stop</Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
        </section>
    );
};

export default StopWatch;