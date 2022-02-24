import { textRead } from "./TextToSpeech";

export const mainCommand = (command) => {
  switch (command) {
    case "guide":
      return guide();
    case "new page":
      return "";
    case "move page":
      return "";
    case "delete page":
      return "";
    case "page list":
      return "";
    case "start project":
      return "";
    case "search icon":
      return "";
    case "search image":
      return "";
    case "build app":
      return window.location.assign("/form");
    default:
      return textRead("not valiid command. Try it again.");
  }
};

const guide = () => {
  return textRead("hello world");
};
