import React, { useState, useEffect } from 'react';

const loadingPhrases = [
  "Warming up the ovens...",
  "Chopping the fresh vegetables...",
  "Setting up the tables...",
  "Preparing your delicious menu...",
  "Plating the dishes...",
  "Almost ready!"
];

const Loader = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    // Change phrase every 4 seconds
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
    }, 4000);

    // Show subtext after 8 seconds to explain potential delay
    const subtextTimeout = setTimeout(() => {
      setShowSubtext(true);
    }, 8000);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(subtextTimeout);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <h3 className="loader-text">{loadingPhrases[phraseIndex]}</h3>
      {showSubtext && (
        <p className="loader-subtext">
          Waking up our servers... this can take up to 50 seconds the first time. Thanks for waiting!
        </p>
      )}
    </div>
  );
};

export default Loader;
