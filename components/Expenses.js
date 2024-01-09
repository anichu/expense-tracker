import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Expense from "./Expense";

const Expenses = ({ expenses }) => {
	// console.log("expense", expenses);

	return (
		<View style={styles.expenseContainer}>
			{expenses &&
				expenses?.map((expense, index) => (
					<Expense key={index} expense={expense} />
				))}
		</View>
	);
};

export default Expenses;

const styles = StyleSheet.create({
	expenseContainer: {
		flex: 1,
		width: "100%",
		padding: 10,
	},
});
