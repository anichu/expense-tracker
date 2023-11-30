import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Expense = ({ expense }) => {
	return (
		<Pressable style={styles.expenseContainer}>
			<Text style={styles.expenseItem}>{expense.name}</Text>
			<Text style={styles.expenseItem}>TK {expense.expense}</Text>
		</Pressable>
	);
};

export default Expense;

const styles = StyleSheet.create({
	expenseItem: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	expenseContainer: {
		width: "100%",
		padding: 10,
		backgroundColor: "#833471",
		marginVertical: 10,
		borderRadius: 10,
		elevation: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
