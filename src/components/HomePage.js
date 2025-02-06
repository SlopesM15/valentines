import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState(
    `Dear [Their Name],
    
    Your "yes" just turned an ordinary day into one I’ll never forget. I’m so grateful you’re giving me the chance to celebrate Valentine’s Day with someone as amazing as you. From the moment you agreed, I’ve been smiling nonstop—and I can’t wait to make this day as special as you are.
    
    Whether we’re sharing laughs, quiet moments, or [insert a personal reference: your favorite dessert/a walk under the stars/our inside jokes], I know it’ll be unforgettable because it’s with you. Thank you for letting me be your Valentine. Here’s to creating memories that’ll make us both smile for years to come.
    
    Counting down the moments,
    [Your Name]**`
  );
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [draftMessage, setDraftMessage] = useState(message);
  const [nameFields, setNameFields] = useState({
    theirName: "[Their Name]",
    yourName: "[Your Name]",
  });
  const [generatedLink, setGeneratedLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const generateLink = () => {
    const id = crypto.randomUUID();
    const link = `${
      window.location.origin
    }/valentine/${id}?message=${encodeURIComponent(message)}`;
    setGeneratedLink(link);
    setShowPopup(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy link");
    }
  };

  //   const customizeMessage = () => {
  //     const customMessage = prompt(
  //       "Enter your custom message (max 140 characters):",
  //       message
  //     );
  //     if (customMessage !== null) {
  //       setMessage(customMessage.slice(0, 140));
  //     }
  //   };

  const handleCustomize = () => {
    setShowCustomizeModal(true);
    setDraftMessage(message); // Initialize draft with current message
  };

  const saveCustomization = () => {
    // Replace placeholders
    let newMessage = draftMessage
      .replace(/\[Their Name\]/g, nameFields.theirName)
      .replace(/\[Your Name\]/g, nameFields.yourName);

    // Preserve line breaks and trim
    newMessage = newMessage
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .slice(0, 800);

    setMessage(newMessage);
    setShowCustomizeModal(false);
  };

  return (
    <div className="valentine-home-container">
      <div className="valentine-home-content">
        <h1 className="valentine-home-title">
          Create Your Valentine's Surprise 💌
        </h1>

        <div className="valentine-button-group">
          <button className="valentine-primary-btn" onClick={generateLink}>
            ✨ Generate Magic Link
          </button>
          <button
            className="valentine-secondary-btn"
            onClick={() => setShowCustomizeModal(true)}
          >
            🖋 Customize Message
          </button>
        </div>

        <div className="valentine-message-preview">
          <h3 className="preview-title">Your Secret Message Preview:</h3>
          <div className="handwritten-preview">
            {message.split("\n").map((line, index) => (
              <p key={index} className="handwritten-line">
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className={`fab-container ${isExpanded ? "expanded" : ""}`}>
          <div className="fab" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="fab-icon">☕️</span>
            <span className="fab-text">Support My Work</span>
          </div>
          {isExpanded && (
            <a
              href="https://ko-fi.com/slopestech"
              target="_blank"
              rel="noopener noreferrer"
              className="fab-link"
            >
              Buy Me a Coffee!
            </a>
          )}
        </div>

        {showPopup && (
          <div className="valentine-modal-overlay">
            <div className="valentine-modal-content">
              <h2 className="modal-title">Your Special Link Is Ready! 💖</h2>
              <div className="link-container">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="link-input"
                />
                <button className="copy-button" onClick={copyToClipboard}>
                  📋 Copy Link
                </button>
              </div>
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {showCustomizeModal && (
        <div className="valentine-modal-overlay">
          <div className="customization-modal">
            <h2>✨ Customize Your Message ✨</h2>

            <div className="name-fields">
              <input
                type="text"
                placeholder="Their Name"
                value={nameFields.theirName}
                onChange={(e) =>
                  setNameFields((prev) => ({
                    ...prev,
                    theirName: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Your Name"
                value={nameFields.yourName}
                onChange={(e) =>
                  setNameFields((prev) => ({
                    ...prev,
                    yourName: e.target.value,
                  }))
                }
              />
            </div>
            <textarea
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
              rows="8"
              maxLength="800"
            />

            <div className="character-counter">
              {800 - draftMessage.length} characters remaining
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={saveCustomization} className="save-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this to your HomePage.css
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&display=swap');

  /* Customization Modal Styles */
.customization-modal {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
.support-container {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  text-align: center;
}

/* Ensure z-index ordering */
.valentine-home-content {
  position: relative;
  z-index: 1; /* Keep main content above background */
}

.support-container {
  z-index: 1000; /* Keep button above content */
}
.success-message {
  font-family: 'Caveat', cursive;
  color: #e91e63;
  font-size: 1.4rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  animation: float 3s ease-in-out infinite;
}

.kofi-link {
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  color: #29abe0; /* Ko-fi's brand blue */
  font-family: 'Caveat', cursive;
  font-size: 1.3rem;
  box-shadow: 0 4px 15px rgba(41, 171, 224, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: 2px solid #ff5f5f;
  backdrop-filter: blur(3px);
}

.kofi-link:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(41, 171, 224, 0.3);
  background: #fff;
  color: #1f7ba2;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@media (max-width: 768px) {
  .support-container {
    bottom: 10px;
    padding: 0 15px;
  }
  
  .success-message {
    font-size: 1.2rem;
  }
  
  .kofi-link {
    font-size: 1.1rem;
    padding: 10px 20px;
  }
}
.customization-modal h2 {
  color: #e91e63;
  margin-bottom: 1.5rem;
  text-align: center;
}

.name-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.name-fields input {
  padding: 0.8rem;
  border: 2px solid #ffb6c1;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
}

.customization-modal textarea {
  width: 90%;
  padding: 1rem;
  border: 2px solid #ffb6c1;
  border-radius: 10px;
  font-family: 'Caveat', cursive;
  font-size: 1.2rem;
  resize: vertical;
  min-height: 200px;
  margin-bottom: 1rem;
}

.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.fab {
  background: #ff5f5f;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab:hover {
  transform: scale(1.1);
  background: #e91e63;
}

.fab-icon {
  font-size: 28px;
}

.fab-text {
  display: none;
}

.fab-link {
  background: white;
  padding: 12px 24px;
  border-radius: 24px;
  text-decoration: none;
  color: #ff5f5f;
  font-family: 'Caveat', cursive;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  animation: slideIn 0.3s ease-out;
  white-space: nowrap;
  border: 2px solid #ff5f5f;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .fab-container {
    bottom: 10px;
    right: 10px;
  }
  
  .fab {
    width: 48px;
    height: 48px;
  }
  
  .fab-icon {
    font-size: 24px;
  }
  
  .fab-link {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

/* Add this to prevent content overlap */
.valentine-home-container {
  padding-bottom: 80px;
}

@media (max-width: 768px) {
  .valentine-home-container {
    padding-bottom: 60px;
  }
}
.character-counter {
  text-align: right;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
}

.cancel-button {
  background: #666;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    
  
  
  }

.save-button {
  background: #e91e63;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button:hover {
  background: #c2185b;
  transform: scale(1.05);
}

  .valentine-home-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffe6f2 0%, #fff0f7 100%);
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
     padding-bottom: 120px; 
  }

  .valentine-home-content {
    max-width: 800px;
    width: 90%;
    background: rgba(255, 255, 255, 0.9);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.1);
    backdrop-filter: blur(10px);
     padding-bottom: 120px; 
  }

  .valentine-home-title {
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    font-size: 2.8rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .valentine-button-group {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin: 2.5rem 0;
    flex-wrap: wrap;
  }

  .valentine-primary-btn {
    background: #e91e63;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Caveat', cursive;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
  }

  .valentine-primary-btn:hover {
    transform: translateY(-2px) scale(1.05);
    background: #c2185b;
  }

  .valentine-secondary-btn {
    background: white;
    color: #e91e63;
    padding: 1rem 2rem;
    border: 2px solid #e91e63;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Caveat', cursive;
    letter-spacing: 1px;
  }

  .valentine-secondary-btn:hover {
    background: #fff0f5;
    transform: translateY(-2px);
  }

  .valentine-message-preview {
    background: linear-gradient(to bottom right, #fffaf0, #f8f4e6);
    padding: 2rem;
    border-radius: 15px;
    border: 2px dashed #e0d0c0;
    margin: 2rem 0;
    position: relative;
    transform: rotate(-1deg);
  }

  .preview-title {
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .handwritten-preview {
    font-family: 'Caveat', cursive;
    font-size: 1.4rem;
    line-height: 1.8;
    color: #4a4a4a;
    white-space: pre-wrap;
  }

  .handwritten-line {
    margin: 0.8rem 0;
    animation: fadeInUp 0.5s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .valentine-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
  }

  .valentine-modal-content {
    background: linear-gradient(to bottom right, #fffaf0, #f8f4e6);
    padding: 2rem;
    border-radius: 15px;
    max-width: 600px;
    width: 90%;
    text-align: center;
    border: 2px solid #e0d0c0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }

  .modal-title {
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  .link-container {
    display: flex;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .link-input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #e0c0b0;
    border-radius: 8px;
    font-family: 'Caveat', cursive;
    font-size: 1.1rem;
    background: rgba(255,255,255,0.8);
  }

  .copy-button {
    background: #e91e63;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Caveat', cursive;
    font-size: 1.2rem;
  }

  .copy-button:hover {
    background: #c2185b;
    transform: scale(1.05);
  }

  .close-button {
    background: #666;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    font-family: 'Caveat', cursive;
    font-size: 1.2rem;
  }

  .close-button:hover {
    background: #444;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .valentine-home-content {
      padding: 1.5rem;
    }
    
    .valentine-home-title {
      font-size: 2.2rem;
    }
    
    .valentine-button-group {
      flex-direction: column;
      gap: 1rem;
    }
    
    .link-container {
      flex-direction: column;
    }
  }
    @media (max-width: 768px) {
  .valentine-home-container {
    padding: 1rem;
    min-height: 100vh;
    display: block;
    
  }

  .valentine-home-content {
    width: 100%;
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 15px;
  }

  .valentine-home-title {
    font-size: 2.2rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .valentine-button-group {
    flex-direction: column;
    margin: 1.5rem 0;
  }

  .valentine-primary-btn,
  .valentine-secondary-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.3rem !important;
  }

  .valentine-message-preview {
    padding: 1.5rem;
    margin: 1.5rem 0;
    transform: none;
  }

  .preview-title {
    font-size: 1.8rem;
  }

  .handwritten-preview {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  /* Customization Modal Mobile Styles */
  .customization-modal {
    padding: 1.5rem;
    width: 95%;
  }

  .customization-modal h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .name-fields {
    grid-template-columns: 1fr;
  }

  .name-fields input {
    width: 100%;
    font-size: 0.9rem;
  }

  .customization-modal textarea {
    font-size: 1rem;
    min-height: 150px;
    width: 100%;
  }

  .character-counter {
    font-size: 0.8rem;
  }

  /* Link Modal Adjustments */
  .valentine-modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.8rem;
  }

  .link-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .link-input {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  .copy-button,
  .close-button {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .valentine-home-title {
    font-size: 1.8rem;
  }

  .preview-title {
    font-size: 1.6rem;
  }

  .handwritten-preview {
    font-size: 1.1rem;
  }

  .customization-modal h2 {
    font-size: 1.6rem;
  }

  .modal-title {
    font-size: 1.6rem;
  }

  .valentine-primary-btn,
  .valentine-secondary-btn {
    font-size: 1.2rem !important;
  }

  .handwritten-line {
    margin: 0.5rem 0;
  }
}

/* Add these additional responsive fixes */
.valentine-home-content {
  box-sizing: border-box;
}

.name-fields input {
  box-sizing: border-box;
}

.customization-modal textarea {
  box-sizing: border-box;
}

.link-input {
  overflow-x: auto;
  white-space: nowrap;
}
  .coffee-container {
  position: fixed;
  padding: 0 20px;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: right;
  z-index: 1000;
}

.coffee-link {
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  color: #e91e63;
  font-family: 'Caveat', cursive;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(233, 30, 99, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: 2px solid #ffb6c1;
}

.coffee-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(233, 30, 99, 0.25);
  background: #fff;
  color: #c2185b;
}

@media (max-width: 768px) {
  .coffee-container {
    bottom: 10px;
  }
  
  .coffee-link {
    font-size: 1rem;
    padding: 10px 20px;
  }
}
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default HomePage;
