export const calculateTotalExpenses = (expenses) => {
  // calculate total exposes from db
  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += +expense.expense;
  });
  return totalExpenses;
};
