// Voice synthesis setup
const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const button = document.getElementById("voice-button");
const responseOutput = document.getElementById("response-output");
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

// Handle speech recognition
button.addEventListener("click", () => {
  recognition.start();
  responseOutput.textContent = "Listening...";
});

recognition.onresult = (event) => {
  const speechResult = event.results[0][0].transcript.toLowerCase();
  responseOutput.textContent = `You said: "${speechResult}"`;
  // Basic responses
  if (speechResult.includes("hello")) {
    speak("Hello! How can I assist you?");
  } else if (speechResult.includes("time")) {
    const currentTime = new Date().toLocaleTimeString();
    speak(`The current time is ${currentTime}`);
  } else if (speechResult.includes("open youtube")) {
    window.open("https://www.youtube.com", "_blank");
  } else if (speechResult.includes("open system")) {
    window.open("https://chatgpt.com/", "_blank");
  } else if (speechResult.includes("open google")) {
    window.open("https://www.google.com", "_blank");
  } else if (speechResult.includes("open codewithharry")) {
    window.open("https://www.codewithharry.com/", "_blank");
  } else if (speechResult.includes("wikipedia")) {
    window.open("https://www.wikipedia.com", "_blank");
  } else if (speechResult.includes("bye")) {
    speak("bye, lets meet agian");
  } else if (speechResult.includes("who is dhruva")) {
    speak("he is the great programer in the world and also he created me");
  } else if (speechResult.includes("open my calculator")) {
    window.open(
      "file:///C:/Users/admin/Desktop/kendriya%20vidyalaya%20bowenpally/projects/caluculator/index.html",
      "_blank"
    );
  } else if (speechResult.includes("search")) {
    // Perform a web search
    const query = speechResult.replace("search", "").trim();
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    status.textContent = `Searching for "${query}"...`;
    speak(`searching "${query}"`);
    window.open(searchURL, "_blank");
    // Play music on YouTube
  } else if (speechResult.includes("play")) {
    function playMusic(command) {
      const song = command.replace("play", "").replace("on youtube", "").trim();
      if (song) {
        const searchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
          song
        )}`;
        window.open(searchURL, "_blank");
      } else {
        const status = document.getElementById("status");
        status.textContent = "I couldn't find the song name.";
      }
    }
  } else {
    speak("I am not sure how to respond to that.");
  }
};

recognition.onerror = (event) => {
  responseOutput.textContent = "Error occurred in recognition: " + event.error;
};
