import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Expenses from "../components/Expenses";
import { ExpenseServices } from "../services/expense";
import { useFocusEffect } from "@react-navigation/native";

const RecentExpense = () => {
	const [recentExpenses, setRecentExpenses] = useState([]);
	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const { data } = await ExpenseServices.getRecentExpenses();
					console.log("recent-data~", data);
					setRecentExpenses(data);
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
