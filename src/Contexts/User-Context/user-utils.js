export const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1)
}

export const userToken = () => JSON.parse(localStorage.getItem("authToken")) || null;