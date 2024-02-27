import axios from "axios";

export const signup = async (user) => {
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/users",
    user
  );
  return data.data;
};

export const login = async (user) => {
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/users/login",
    user
  );
  return data.data;
};

export const AuthServices = {
  signup,
  login,
};
