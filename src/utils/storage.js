import axios from "axios";

export const getLocalStorage = () => {
  const localStorage = window.localStorage.getItem("touch_code");
  return JSON.parse(localStorage);
};

export const saveLocalStorage = (code) => {
  window.localStorage.setItem("touch_code", JSON.stringify(code));
};

export const sendCode = async (data) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/",
      data: {
        data,
      },
    });
    if (result.data.success) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
