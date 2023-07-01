import React, { useState, useEffect } from 'react';

const TypeWriterEffect = ({ lines, typingSpeed, repeatDelay  }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let timeout;

    const type = () => {
      if (currentIndex < lines[currentLineIndex].length) {
        setDisplayText((prevText) => prevText + lines[currentLineIndex].charAt(currentIndex));
        currentIndex++;
        timeout = setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => {
          setDisplayText('');
          currentIndex = 0;
          setCurrentLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
          type();
        }, repeatDelay);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [lines, currentLineIndex, typingSpeed, repeatDelay]);

  return (
    <h1 className="text-2xl font-bold">{displayText}</h1>
  )
}

export default TypeWriterEffect
