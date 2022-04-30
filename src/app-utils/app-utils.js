import axios from "axios";

export const callApi = (method, token, url, body) => {
  return axios({
    method: method,
    url: url,
    data: body || null,
    headers: { authorization: token },
  });
};

export const extractContent = (html) =>
  new DOMParser().parseFromString(html, "text/html").documentElement
    .textContent;

export const dateAndTime = () => {
  // get the date as a string
  const date = new Date();
  const currentDate = date.toDateString();
  // get the time as a string
  const currentTime = date.toLocaleTimeString();

  return { currentDate, currentTime };
};

export const availableTags = ["Office", "Personal", "Home", "Bills", "EMIs"];

export const colorArray = [
  "#dedfe8",
  "#fbf8cc",
  "#ffcfd2",
  "#b9fbc0",
  "#8eecf5",
  "#e6ccb2",
  "#f8fafc",
  "#fdba74",
  "#e6ccb2",
  "#000000",
  "#ffffff"
];
