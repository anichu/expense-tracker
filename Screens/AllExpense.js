import axios from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Expenses from "../components/Expenses";
import { TaskContext } from "../store/task-context";

const AllExpense = () => {
	const { expenses } = useContext(TaskContext);
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
