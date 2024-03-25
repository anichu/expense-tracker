import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Expenses from "../components/Expenses";
import { TaskContext } from "../store/task-context";
import { useFocusEffect } from "@react-navigation/native";
import { ExpenseServices } from "../services/expense";
import { UserContext } from "../store/user-context";
import { calculateTotalExpenses } from "../utils/expense";
import TotalExpenses from "../components/TotalExpenses";

const AllExpense = () => {
  const { expenses, expensesRefetch } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  // Memoize the result of expensiveComputation
  const total = useMemo(() => calculateTotalExpenses(expenses), [expenses]);

  console.log(expenses);
  console.log("user", user._id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await expensesRefetch();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await expensesRefetch();
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [user])
  );
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <TotalExpenses title="Total expenses" total={total} />
        <View style={{ flex: 1 }}>
          <Expenses expenses={expenses} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AllExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
});
