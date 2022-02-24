import { textRead } from "./TextToSpeech";

export const mainCommand = (command) => {
  switch (command) {
    case "guide":
      return textRead("Hello. This is touch my coding page to make web application for all people");
    case "new page":
      return "";
    case "page list":
      return textRead("Tell your all page");
    case "start project":
      return "";
    case "build app":
      return window.location.assign("/form");
    default:
      return textRead("not valiid command. Try it again.");
  }
};
