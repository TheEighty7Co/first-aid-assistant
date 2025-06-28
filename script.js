const logDiv = document.getElementById("log");

const log = (msg, cls = "bot") => {
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
};

const speak = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = speechSynthesis.getVoices().find(v =>
    v.lang === "en-US" && v.name.toLowerCase().includes("female")
  ) || speechSynthesis.getVoices()[0];
  speechSynthesis.speak(utter);
  log(text, "bot");
};

const listen = () => {
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript.toLowerCase();
    log(text, "user");
    if (text.includes("stroke")) speak("Did they fail the FAST check?");
    else if (text.includes("cpr")) speak("Is the person unresponsive and not breathing normally?");
    else if (text.includes("bleeding")) speak("Is the bleeding life-threatening?");
    else if (text.includes("burn")) speak("Is the burn severe or blistered?");
    else if (text.includes("choking")) speak("Can the person speak or cough?");
    else speak("Please say stroke, CPR, bleeding, burn, or choking.");
  };

  rec.onerror = () => speak("Sorry, I didn't catch that. Try again.");
  rec.start();
};

document.getElementById("start-btn").onclick = () => {
  speak("Welcome to First Aid Assistant. Please say your emergency.");
  setTimeout(listen, 3000);
};
