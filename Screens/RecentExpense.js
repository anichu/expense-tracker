import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useState, useMemo } from "react";
import Expenses from "../components/Expenses";
import { ExpenseServices } from "../services/expense";
import { useFocusEffect } from "@react-navigation/native";
import { TaskContext } from "../store/task-context";
import Loading from "../shared/Loading";
import TotalExpenses from "../components/TotalExpenses";
import { calculateTotalExpenses } from "../utils/expense";

const RecentExpense = () => {
  const { recentExpenses, recentExpensesRefetch, recentExpensesLoading } =
    useContext(TaskContext);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await recentExpensesRefetch();
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [])
  );

  const total = useMemo(
    () => calculateTotalExpenses(recentExpenses),
    [recentExpenses]
  );

  if (recentExpensesLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <TotalExpenses title="Total Expenses Last 7 days" total={total} />
        <View style={{ flex: 1 }}>
          <Expenses expenses={recentExpenses} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
});
