import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";


export default function LetItRain() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [show, setShow] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    setHeight(confettiRef.current.clientHeight);
    setWidth(confettiRef.current.clientWidth);
  }, []);

  const handleShow = toggle => {
    setShow(toggle);
  };

  return (
    <div className="App">
      <div
        onMouseEnter={() => handleShow(true)}
        onMouseLeave={() => handleShow(false)}
        className="confetti-wrap"
        ref={confettiRef}
      >
        <Confetti
          recycle={show}
          numberOfPieces={4000}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}
