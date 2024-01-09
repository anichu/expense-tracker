import axios from "axios";

export const getExpenses = async () => {
	return await axios.get(
		"https://expensetracker-ivory-alpha.vercel.app/api/expense"
	);
};

export const getRecentExpenses = async () => {
	return await axios.get(
		"https://expensetracker-ivory-alpha.vercel.app/api/expense/recent"
	);
};

export const ExpenseServices = {
	getExpenses,
	getRecentExpenses,
};
