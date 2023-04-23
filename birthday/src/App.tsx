import { useEffect, useState } from "react";

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
    const difference = +new Date(`4/23/${this_year}`) - +new Date();

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
      <span key={interval}>
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

  // Create a state to store the name

  const [birthdayName, setBirthdayName] = useState("!");
  const [giftCard, setGiftCard] = useState("");

  useEffect(() => {
    // Fetch the value of the environment variable and set it as the initial value of birthdayName
    if (import.meta.env.VITE_NAME) {
      setBirthdayName(import.meta.env.VITE_NAME);
    } else {
      setBirthdayName("!");
    }
    // Fetch the value of the environment variable and set it as the initial value of giftCard
    if (import.meta.env.VITE_CARD) {
      setGiftCard(import.meta.env.VITE_CARD);
    } else {
      setGiftCard("X");
    }
  }, []);

  const handleAmazonButtonClick = () => {
    window.location.href =
      "https://www.amazon.com/gp/css/gc/payment/view-gc-balance";
  };

  return (
    <div className="App">
      <div className="w-full flex flex-col justify-center items-center pt-20 pb-20 bg-red-600 shadow-lg shadow-gray-400">
        <h1 className="text-2xl md:text-4xl font-black text-white">
          Hey {birthdayName}!
        </h1>
        <h1 className="text-2xl md:text-4xl font-black text-white">
          {!timerComponents.length
            ? `🥳🎉Happy
          Birthday ${birthdayName}!!🎉🥳`
            : "😎Your Birthday is Coming!😎"}
        </h1>
      </div>
      <section
        id="countdown"
        className="w-full flex flex-col justify-center items-center gap-10 p-16 md:flex-row"
      >
        <p className="font-bold text-sm text-center md:text-3xl md:text-right">
          🕑Countdown to May 30, 2023🕑
        </p>
        <div className="text-blue-700 text-xl md:text-4xl font-bold flex flex-row justify-center text-center gap-3">
          {!timerComponents.length
            ? "🎂It's your birthday!!🎂"
            : timerComponents}
        </div>
      </section>
      <section id="video">
        <div className="flex flex-col justify-center items-center aspect-w-16 aspect-h-9 mb-20">
          <iframe
            className="shadow-lg shadow-gray-400"
            src="https://www.youtube.com/embed/a3Z7zEc7AXQ?autoplay=1&mute=1"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section id="gift" className="w-full p-16 bg-green-700">
        {!timerComponents.length && giftCard !== "X" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-md text-center font-bold text-2xl md:text-3xl text-white mb-5">
              🎂Happy Birthday {birthdayName}!!🎂
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex flex-col justify-center items-center">
                <p className="text-md text-center md:text-left md:font-bold text-lg md:text-2xl text-white mb-5">
                  😲Here is your code for an Amazon Gift Card:
                </p>
                <img
                  src="https://d13080yemosbe2.cloudfront.net/Images/GiftCardFaceplates/External/AMAZON_fp01.png"
                  alt="amazon gift card"
                  className="w-4/6 md:w-3/6 rounded-lg shadow-white relative my-5"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-md text-center md:text-md text-white m-2 p-7 bg-green-900 border-gray-800 rounded-lg">
                  {giftCard}
                </p>
                <button
                  className="bg-purple-500 text-white font-bold text-md p-4 mt-5 rounded-md shadow-lg hover:bg-yellow-300 hover:text-black hover:shadow-neutral-50"
                  onClick={handleAmazonButtonClick}
                >
                  Redeem your Code
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-md text-center font-bold text-2xl md:text-3xl text-white mb-5">
            👋Make sure to come back here on your Birthday!👋
          </p>
        )}
      </section>
    </div>
  );
};

export default App;
