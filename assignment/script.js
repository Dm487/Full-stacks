const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const charCount = document.getElementById("charCount");
const statusText = document.getElementById("statusText");

const listenInput = document.getElementById("listenInput");
const listenOutput = document.getElementById("listenOutput");
const copyInput = document.getElementById("copyInput");
const copyOutput = document.getElementById("copyOutput");

function updateCharCount() {
  charCount.textContent = `${inputText.value.length}/500`;
}

async function translateText() {
  const text = inputText.value.trim();
  let source = fromLang.value;
  const target = toLang.value;

  if (!text) {
    outputText.value = "";
    statusText.textContent = "Please enter text";
    return;
  }

  if (source === target) {
    outputText.value = text;
    statusText.textContent = "Same language selected";
    return;
  }

  // MyMemory works more reliably if source is a real code
  // so we force English when Detect Language is selected
  if (source === "auto") {
    source = "en";
  }

  statusText.textContent = "Translating...";
  outputText.value = "Loading...";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.responseData && data.responseData.translatedText) {
      outputText.value = data.responseData.translatedText;
      statusText.textContent = "Done";
    } else {
      outputText.value = "";
      statusText.textContent = "Translation failed";
    }
  } catch (error) {
    console.error("Translation error:", error);
    outputText.value = "";
    statusText.textContent = "Error connecting to API";
  }
}

function swapLanguages() {
  if (fromLang.value === "auto") {
    alert("Choose a real source language before swapping.");
    return;
  }

  const tempLang = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = tempLang;

  const tempText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempText;

  updateCharCount();
}

async function copyText(text, label) {
  if (!text.trim()) {
    alert(`No ${label} to copy.`);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert(`${label} copied.`);
  } catch (error) {
    console.error(error);
    alert("Copy failed.");
  }
}

function speakText(text, lang) {
  if (!text.trim()) {
    alert("No text to read.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  if (lang === "fr") {
    utterance.lang = "fr-FR";
  } else {
    utterance.lang = "en-US";
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

inputText.addEventListener("input", updateCharCount);
translateBtn.addEventListener("click", translateText);
swapBtn.addEventListener("click", swapLanguages);

copyInput.addEventListener("click", () => copyText(inputText.value, "input text"));
copyOutput.addEventListener("click", () => copyText(outputText.value, "output text"));

listenInput.addEventListener("click", () => {
  const lang = fromLang.value === "fr" ? "fr" : "en";
  speakText(inputText.value, lang);
});

listenOutput.addEventListener("click", () => {
  speakText(outputText.value, toLang.value);
});

window.addEventListener("load", () => {
  updateCharCount();
  translateText();
});