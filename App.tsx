import React, { useState, useEffect } from 'react';

interface Lap {
  id: number;
  time: number;
}

const Stopwatch1206: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStartStop = (): void => {
    setIsRunning((prevState) => !prevState);
  };

  const handleLap = (): void => {
    const newLap: Lap = {
      id: laps.length + 1,
      time: time,
    };
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {time}</p>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleLap}>Lap</button>
      <h2>Total Laps: {laps.length}</h2>
      <ul>
        {laps.map((lap) => (
          <li key={lap.id}>Lap {lap.id}: {lap.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch1206;
