export const textRead = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
};
