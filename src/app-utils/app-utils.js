import axios from "axios";

export const callApi = (method, token, url, body) => {
  return axios({
    method: method,
    url: url,
    data: body || null,
    headers: { authorization: token },
  });
};
