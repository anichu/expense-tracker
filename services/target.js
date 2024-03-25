import axios from "axios";

export const createTarget = async (target) => {
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/targets",
    target
  );

  return data.data;
};
export const checkExceeds = async (target) => {
  console.log(target);
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/targets/check-exceeds",
    target
  );

  // console.log("data~", data);

  return data.data;
};

export const getTargets = async (id) => {
  if (!id) {
    return [];
  }
  console.log(id);
  const data = await axios.get(
    "https://expensetracker-ivory-alpha.vercel.app/api/targets/user/" + id
  );

  // console.log(data);

  return data.data;
};
export const deleteTarget = async (id) => {
  if (!id) {
    return [];
  }
  console.log(id);
  const data = await axios.delete(
    "https://expensetracker-ivory-alpha.vercel.app/api/targets/" + id
  );

  // console.log(data);

  return data.data;
};
export const TargetServices = {
  createTarget,
  getTargets,
  deleteTarget,
  checkExceeds,
};
