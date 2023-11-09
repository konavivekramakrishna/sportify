import { requestMethod } from "../types";
import { API_URL } from "../config";

const getToken = () => {
  let t = localStorage.getItem("token");
  t = t ? t : sessionStorage.getItem("token");
  return t ? "Token " + t : "Token ";
};

export const apiCall = async (
  endpoint: string,
  method: requestMethod = "GET",
  data: object = {},
) => {
  let link = API_URL + endpoint;
  let payload = "";

  if (method === "GET") {
    const params = data
      ? `?${Object.entries(data)
          .map((entry) => `${entry[0]}=${entry[1]}`)
          .join("&")}`
      : "";
    link += params;
  } else {
    payload = data ? JSON.stringify(data) : "";
  }

  const token = getToken();

  const auth = token ? "Token " + token : "";

  const res = await fetch(link, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });

  if (!res.ok) {
    console.error("Request failed with status:", res.status);
    return null;
  }

  try {
    const text = await res.text();
    if (text) {
      return JSON.parse(text);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return JSON.stringify(error);
  }
};

// articles crud

export const fetchArticle = async (id: number) => {
  return await apiCall(`/articles/${id}`, "GET");
};

export const fetchAllArticles = async () => {
  return await apiCall("/articles", "GET");
};

// sports crud

export const fetchSport = async (id: number) => {
  return await apiCall(`/sports/${id}`, "GET");
};

export const fetchAllSports = async () => {
  return await apiCall("/sports", "GET");
};

// matches crud

export const fetchMatch = async (id: number) => {
  return await apiCall(`/matches/${id}`, "GET");
};

export const fetchAllMatches = async () => {
  return await apiCall("/matches", "GET");
};

// teams crud

export const fetchAllTeams = async () => {
  return await apiCall("/teams", "GET");
};

export const fetchTeam = async (id: number) => {
  return await apiCall(`/teams/${id}`, "GET");
};

// user crud

export const signInUser = async (data: any) => {
  return await apiCall("/users/sign_in", "POST", data);
};

export const updatePreference = async (data: any) => {
  return await apiCall("/user/preferences", "PATCH", data);
};

export const me = async () => {
  return await apiCall("/user", "GET");
};

export const changePassword = async (data: any) => {
  return await apiCall("/user/password", "PATCH", data);
};

export const createNewUser = async (data: any) => {
  return await apiCall("/users", "POST", data);
};

export const resetPassword = async (data: any) => {
  return await apiCall("/user/password", "PATCH", data);
};

// preferences crud
export const setPreference = async (data: any) => {
  return await apiCall("/user/preferences", "PATCH", data);
};
