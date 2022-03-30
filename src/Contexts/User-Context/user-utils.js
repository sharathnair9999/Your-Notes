export const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1)
}

export const validPassword = (str) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(str);


export const userToken = () => JSON.parse(localStorage.getItem("authToken")) || null;