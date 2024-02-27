import axios from "axios";

export const createExpense = async (expense) => {
  const data = await axios.post(
    "https://expensetracker-ivory-alpha.vercel.app/api/expense",
    expense
  );

  return data.data;
};

export const getExpenses = async (id) => {
  console.log("id", id);
  if (!id) {
    return [];
  }
  const data = await axios.get(
    "https://expensetracker-ivory-alpha.vercel.app/api/expense/user/" + id
  );
  return data.data;
};

export const getRecentExpenses = async (id) => {
  if (!id) return [];
  const data = await axios.get(
    "https://expensetracker-ivory-alpha.vercel.app/api/expense/user/recent/" +
      id
  );
  // console.log("recent", data);
  return data.data;
};

export const ExpenseServices = {
  getExpenses,
  getRecentExpenses,
  createExpense,
};
