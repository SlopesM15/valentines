import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import letterClose from "../assets/letterclose.gif";

import foxoverletter from "../assets/foxoverletter.svg";
import foxbutt from "../assets/foxbutt.svg";
import foxBlush from "../assets/foxblush.svg";
import foxSad from "../assets/foxsad.svg";
import foxAngry from "../assets/foxmad.svg";
import LZString from "lz-string";
const ValentineCard = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const foxStates = [foxoverletter, foxBlush, foxSad, foxAngry];
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("Will you be my Valentine?");
  const [accepted, setAccepted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const buttonsRef = useRef(null);
  const [isResponded, setIsResponded] = useState(false);
  const noButtonRef = useRef(null);
  const [isPositioned, setIsPositioned] = useState(false);
  useEffect(() => {
    const compressedMessage = searchParams.get("message");
    if (compressedMessage) {
      const decompressed =
        LZString.decompressFromEncodedURIComponent(compressedMessage);
      setMessage(decompressed || "Will you be my Valentine?");
    }
  }, [searchParams]);
  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    setIsResponded(true);

    const button = noButtonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Safety margins
    const padding = 20;

    const isMobile = window.innerWidth <= 768;
    const maxX = isMobile
      ? vw - buttonRect.width - 40
      : vw - buttonRect.width - 20;
    const maxY = isMobile
      ? vh - buttonRect.height - 40
      : vh - buttonRect.height - 20;

    // Keep existing positioning logic but use new maxX/maxY
    const newX = Math.max(20, Math.min(Math.random() * maxX, maxX - 20));
    const newY = Math.max(20, Math.min(Math.random() * maxY, maxY - 20));

    // Use transform for better performance and to avoid layout shifts
    button.style.transform = `translate(${newX}px, ${newY}px)`;
    setIsPositioned(true);
  };

  const getCurrentFoxImage = () => {
    const stateIndex = Math.min(
      Math.floor(noClickCount / 3),
      foxStates.length - 1
    );
    return foxStates[stateIndex];
  };

  const handleYesClick = () => {
    setAccepted(true);
    setTimeout(() => setIsOpen(true), 1000);
  };
  return (
    <div className="valentine-container">
      {!accepted ? (
        <div className="proposal">
          <div className="image-container">
            <img
              src={getCurrentFoxImage()}
              alt="Fox over Letter"
              className="fox-image"
            />
          </div>
          {/* Add this new text element */}
          <div className="proposal-text">
            <h1>Will you be my Valentine?</h1>
          </div>

          <div className="buttons">
            <button
              className="yes-button"
              onClick={handleYesClick}
              style={{ opacity: isResponded ? 1 : 1 }}
            >
              Yes!
            </button>
            <button
              ref={noButtonRef}
              className="no-button"
              onClick={handleNoClick}
              style={{
                position: isResponded ? "fixed" : "relative",
                transition: isResponded ? "transform 0.5s ease" : "none",
                left: isResponded ? "0" : "auto",
                top: isResponded ? "0" : "auto",
                transform: isPositioned ? "" : "translate(0, 0)",
              }}
            >
              No
            </button>
          </div>
          <div className="image-container">
            <img src={letterClose} alt="Closed Letter" className="letter-gif" />
          </div>
        </div>
      ) : (
        <div className="open-letter-container">
          <div className="image-container">
            <img src={foxbutt} alt="Fox over Letter" className="fox-image" />
          </div>

          <div className="message-container letter-style">
            <div className="handwritten-message">
              <h2>To My Dearest,</h2>
              <p className="animated-text">{message}</p>

              <p className="signature">
                With all my heart,
                <br />
                Your Secret Admirer 💌
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
    .yes-button, .no-button {
    padding: 15px 40px;
    font-size: 2rem !important;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Dancing Script', cursive;
    letter-spacing: 2px;
    transform: scale(1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .yes-button {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .yes-button:hover {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 6px 12px rgba(255, 107, 107, 0.4);
  }
     .yes-button::after {
    content: '💖';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
  }
    .yes-button:hover::after {
    right: 20px;
    opacity: 1;
  }

  .no-button {
    background: linear-gradient(135deg, #a0a0a0 0%, #c0c0c0 100%);
    color: white;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0; /* Remove default button margin */
    transform: translate(0, 0); /* Initial position */
  }

  .no-button:hover {
    transform: scale(0.95) rotate(2deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .no-button::before {
    content: '💔';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .no-button:hover::before {
    left: 20px;
    opacity: 1;
  }
.proposal, .open-letter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

    /* Add animation for multiple clicks */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
     .no-button.shake {
    animation: shake 0.4s ease;
  }
  .fixed-size-image {
  width: 200px;
  height: 200px;
}

.fixed-size-image {
  width: 200px;
  height: 200px;
}

.fixed-size-image {
  width: 200px;
  height: 200px;
}

.fixed-size-image {
  width: 200px;
  height: 200px;
}
  /* LETTER STYLING */
  .letter-style {
    font-family: 'Caveat', cursive;
    font-size: 1.8rem;
    line-height: 1.6;
    background: linear-gradient(to bottom right, #fffaf0, #f8f4e6);
    padding: 40px 30px;
    border: 2px solid #e0d0c0;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 600px;
    text-align: left;
    position: relative;
    transform: rotate(-1deg);
    animation: letterEntrance 1s ease-out;
  }

  .handwritten-message h2 {
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    margin-bottom: 30px;
    font-size: 2.5rem;
    text-align: center;
  }

 .animated-text {
  position: relative;
  margin: 20px 0;
  padding-left: 20px;
  animation: write 2s ease forwards;
  white-space: normal; /* Changed from nowrap */
  overflow: hidden;
  font-size: 2rem;
  color: #4a4a4a;
  max-width: 100%;
}

  @keyframes write {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes letterEntrance {
    0% {
      transform: translateY(100px) rotate(-5deg);
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotate(-1deg);
      opacity: 1;
    }
  }

  .handwritten-message p {
    margin: 25px 0;
    position: relative;
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
  }

  .handwritten-message p:nth-child(2) {
    animation-delay: 0.5s;
  }

  .handwritten-message p:nth-child(3) {
    animation-delay: 1.5s;
  }

  .handwritten-message p:nth-child(4) {
    animation-delay: 2s;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .message-container {
    position: relative;
    margin-top: -50px;
    z-index: 1;
  }

  .message-container::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 2px dashed #e0c0b0;
    border-radius: 10px;
    animation: borderGlow 2s infinite;
  }

  @keyframes borderGlow {
    0%, 100% { border-color: #e0c0b0; }
    50% { border-color: #e91e63; }
  }

  /* Keep previous button and image styles */
  .valentine-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #ffe6f2 0%, #fff0f7 100%);
    font-family: 'Caveat', cursive;
   padding: 20px;
  overflow-x: hidden; /
    
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
    position: relative;
    min-height: 50px;
  }

  .yes-button, .no-button {
    padding: 12px 30px;
    font-size: 1.8rem !important;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Dancing Script', cursive;
    letter-spacing: 1px;
    transform: rotate(-2deg);
  }

  .image-container {
     margin: 10px 0;
    display: flex;
    justify-content: center;
  }

  .fox-image {
    max-width: 200px;
    height: auto;
    margin: 0 auto;
  }

  .letter-gif {
    max-width: 200px;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
  .valentine-container {
    padding: 10px;
  }

  .buttons {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin: 20px 0;
  }

  .yes-button, .no-button {
    font-size: 1.5rem !important;
    padding: 10px 30px;
    width: 100%;
    max-width: 200px;
  }

  .fox-image, .letter-gif {
    max-width: 150px;
  }

  .letter-style {
    font-size: 1.4rem;
    padding: 20px;
    margin: 10px;
    transform: none;
  }

  .animated-text {
    font-size: 1.6rem;
    white-space: normal;
  }

  .message-container::before {
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
}
@media (max-width: 768px) {
  @keyframes write {
    from { 
      max-height: 0;
      opacity: 0;
    }
    to { 
      max-height: 500px; /* Adjust based on content */
      opacity: 1;
    }
  }
  
  .animated-text {
    animation: write 2s ease forwards;
    width: 90% !important; /* Override width animation */
  }
}
@media (max-width: 480px) {
  .yes-button, .no-button {
    font-size: 1.3rem !important;
    padding: 8px 25px;
  }

  .handwritten-message h2 {
    font-size: 2rem;
  }

  .animated-text {
    font-size: 1.4rem;
  }

  .signature {
    font-size: 1.2rem;
  }
}
  .proposal-text {
  text-align: center;
  margin: 20px 0;
  animation: fadeIn 1s ease-in;
}

.proposal-text h1 {
  font-family: 'Dancing Script', cursive;
  color: #e91e63;
  font-size: 2.5rem;
  margin: 0;
  padding: 10px 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile Responsive Additions */
@media (max-width: 768px) {
  .proposal-text h1 {
    font-size: 2rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .proposal-text h1 {
    font-size: 1.8rem;
    line-height: 1.2;
  }
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default ValentineCard;
