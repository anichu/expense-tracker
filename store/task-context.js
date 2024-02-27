import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { ExpenseServices } from "../services/expense";
import { UserContext } from "./user-context";
import Loading from "../shared/Loading";

export const TaskContext = createContext({
  expenses: [],
  recentExpenses: [],
});

const TaskContextProvider = ({ children }) => {
  // const [expenses, setExpenses] = useState([]);
  const { user } = useContext(UserContext);
  // console.log("context~", user);

  const {
    data: expenses = [],
    isLoading,
    refetch: expensesRefetch,
  } = useQuery({
    queryKey: ["expenses-all", user?.id],
    queryFn: async () => {
      return await ExpenseServices.getExpenses(user?._id);
    },
  });

  const {
    data: recentExpenses = [],
    isLoading: recentExpensesLoading,
    refetch: recentExpensesRefetch,
  } = useQuery({
    queryKey: ["expenses-recent", user?.id],
    queryFn: async () => {
      return await ExpenseServices.getRecentExpenses(user?._id);
    },
  });

  // console.log("data~", expenses);

  // useEffect(() => {
  //   fetch("https://expensetracker-ivory-alpha.vercel.app/api/expense")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setExpenses(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  if (isLoading || recentExpensesLoading) {
    return <Loading />;
  }
  const value = {
    expenses: expenses,
    expensesRefetch: expensesRefetch,
    recentExpenses,
    recentExpensesRefetch,
    recentExpensesLoading,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
