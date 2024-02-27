import axios from "axios";

export const createTarget = async (target) => {
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/targets",
    target
  );

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

  return data.data;
};
export const TargetServices = {
  createTarget,
  getTargets,
};
