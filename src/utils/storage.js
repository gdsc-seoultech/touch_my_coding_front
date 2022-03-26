export const getLocalStorage = () => {
  const localStorage = window.localStorage.getItem("touch_code");
  return JSON.parse(localStorage);
};

export const saveLocalStorage = (code) => {
  window.localStorage.setItem("touch_code", JSON.stringify(code));
};

export const getRandomValue = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const getLocalUuid = () => {
  const localStorage = window.localStorage.getItem("touch_uuid");
  return JSON.parse(localStorage);
};

export const setLocalUuid = (uuid) => {
  window.localStorage.setItem("touch_uuid", JSON.stringify(uuid));
};
