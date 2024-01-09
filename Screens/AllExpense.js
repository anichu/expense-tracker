import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Expenses from "../components/Expenses";
import { TaskContext } from "../store/task-context";
import { useFocusEffect } from "@react-navigation/native";
import { ExpenseServices } from "../services/expense";

const AllExpense = () => {
	const { expenses, setExpenses } = useContext(TaskContext);
	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const { data } = await ExpenseServices.getExpenses();
					setExpenses(data);
				} catch (error) {
					console.log(error);
				}
			};

			fetchData();
		}, [])
	);
	return (
		<View style={styles.container}>
			<ScrollView style={{ width: "100%", flex: 1 }}>
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
