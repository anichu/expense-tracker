import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext({
	expenses: [],
	setExpenses: () => {},
});

const TaskContextProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([]);
	useEffect(() => {
		fetch("http://192.168.1.108:7070/api/expense/")
			.then((res) => res.json())
			.then((data) => {
				setExpenses(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const value = {
		expenses: expenses,
		setExpenses: setExpenses,
	};
	return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
