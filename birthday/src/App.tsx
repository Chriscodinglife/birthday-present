import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

/* Create an App component that renders the following:
- A title that says happy birthday
- A section for a Youtube video that automatically plays when the page loads
- A section for a working countdown that goes down by days to May 30
*/

// Set the type for timeLeft
interface timeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App = () => {
  // Create a function that calculates the time left and set the type return of timeLeft
  const calculateTimeLeft = (): timeLeft => {
    // Get the current year
    let this_year = new Date().getFullYear();
    const difference = +new Date(`5/30/${this_year}`) - +new Date();

    // Make a blank array to get the time thats left
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    // Add the time left to the array if the difference is greater than zero
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  // Create a state to store the timeLeft
  const [timeLeft, setTimeLeft] = useState<timeLeft>(calculateTimeLeft());

  // Create an array to store the timer components
  const timerComponents: JSX.Element[] = [];

  // Loop through the timeLeft and add the timer components
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof timeLeft]) {
      return;
    }

    // Add the timer components to the array
    timerComponents.push(
      <span>
        {timeLeft[interval as keyof timeLeft]} {interval}{" "}
      </span>
    );
  });

  //  Create a useEffect to update the timeLeft
  useEffect(() => {
    // Create a Timer
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="App">
      <div className="w-full pt-20 pb-20 bg-rose-600 shadow-lg shadow-gray-400">
        <h1 className="flex flex-row justify-center text-3xl md:text-4xl font-black text-white">
          🥳🎉Happy Birthday!!🎉🥳
        </h1>
      </div>
      <section
        id="countdown"
        className="w-full flex flex-col justify-center items-center gap-10 p-16 md:flex-row"
      >
        <p className="font-bold text-xl text-right md:text-3xl">
          Countdown to May 30, 2023:{" "}
        </p>
        <div className="text-blue-700 text-2xl md:text-4xl font-bold flex flex-row justify-center text-center gap-3">
          {!timerComponents.length ? "Time's up!" : timerComponents}
        </div>
      </section>
      <section id="video" className="z-1">
        <div className="flex flex-row justify-center items-center shadow-lg shadow-cyan-300/50 pb-20 relative">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=a3Z7zEc7AXQ&ab_channel=RVE"
            playing={true}
          />
        </div>
      </section>
      <section
        id="gift"
        className="w-full p-16 flex flex-col justify-center items-center gap-2 bg-cyan-800 z-10"
      >
        <p className="text-md text-center font-bold text-2xl md:text-3xl text-white">
          {!timerComponents.length
            ? "Gift Card"
            : "Make sure to come back here on your Birthday!"}
        </p>
      </section>
    </div>
  );
};

export default App;
