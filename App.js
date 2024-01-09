import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Pressable,
	TextInput,
	Modal,
	Button,
	Alert,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpense from "./Screens/AllExpense";
import RecentExpense from "./Screens/RecentExpense";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import TaskContextProvider, { TaskContext } from "./store/task-context";
const Tab = createBottomTabNavigator();

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState("");
	const [expense, setExpense] = useState("");
	const { setExpenses, expenses } = useContext(TaskContext);

	const pressHandler = () => {
		console.log("presseded");
		setModalVisible(true);
	};

	console.log("expenses~", expenses);

	const submitHandler = () => {
		console.log("clicked for add expense");
		if (!name || !expense) {
			Alert.alert("Alert!!!", "Please, fill the blank input", [
				{
					text: "Ok",
					onPress: () => {
						console.log("pressed!");
					},
				},
			]);

			return;
		}

		fetch("https://expensetracker-ivory-alpha.vercel.app/api/expense", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				expense,
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Network response was not ok: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log("sina-sina", data);
				setExpenses([data, ...expenses]);
				setName("");
				setExpense("");
				setModalVisible(false);
			})
			.catch((err) => {
				console.error("Error during fetch:", err);
			});
	};

	return (
		<>
			<StatusBar style="light" />
			<TaskContextProvider>
				<NavigationContainer>
					<SafeAreaView style={styles.container}>
						<Tab.Navigator
							screenOptions={{
								headerStyle: { backgroundColor: "purple" },
								headerTintColor: "white",
								headerRight: () => (
									<Pressable onPress={pressHandler}>
										<Ionicons
											name="md-add-circle"
											style={styles.addIcon}
											size={24}
											color="black"
										/>
									</Pressable>
								),
							}}
						>
							<Tab.Screen
								name="AllExpense"
								options={{
									tabBarIcon: () => (
										<AntDesign name="wallet" size={24} color="black" />
									),
								}}
								component={AllExpense}
							/>
							<Tab.Screen
								name="RecentExpense"
								options={{
									tabBarIcon: () => (
										<AntDesign name="wallet" size={24} color="black" />
									),
								}}
								component={RecentExpense}
							/>
						</Tab.Navigator>
						<Modal
							visible={modalVisible}
							style={styles.modalContainer}
							animationType="slide"
						>
							<View style={styles.modalContainer}>
								<Text style={styles.title}>Add Expense</Text>
								<TextInput
									placeholder="name.."
									onChangeText={(name) => setName(name)}
									placeholderTextColor="white"
									style={styles.textInput}
									value={name}
								/>
								<TextInput
									placeholder="expense.."
									placeholderTextColor="white"
									onChangeText={(expense) => setExpense(expense)}
									style={styles.textInput}
									value={expense}
									keyboardType="decimal-pad"
								/>

								<View style={styles.buttonsContainer}>
									<Pressable
										style={styles.buttonContainer}
										onPress={submitHandler}
									>
										<Text style={styles.button}>submit</Text>
									</Pressable>
									<Pressable
										style={styles.buttonContainer}
										onPress={() => setModalVisible((prev) => !prev)}
									>
										<Text style={styles.button}>close</Text>
									</Pressable>
								</View>
							</View>
						</Modal>
					</SafeAreaView>
				</NavigationContainer>
			</TaskContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "purple",
		color: "white",
	},
	innerContainer: {
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
	addIcon: {
		paddingHorizontal: 10,
		margin: 10,
		color: "white",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "purple",
	},
	textInput: {
		backgroundColor: "#6F1E51",
		width: "100%",
		marginHorizontal: 20,
		fontSize: 18,
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 10,
		color: "white",
		marginVertical: 10,
		outlineStyle: "none",
		borderWidth: 2,
		borderColor: "red",
	},
	button: {
		color: "black",
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginHorizontal: 10,
		width: "100%",
		textAlign: "center",
		backgroundColor: "#B53471",
		borderRadius: 10,
		color: "white",
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: "row",
	},
	buttonContainer: {
		width: 150,
		padding: 10,
		borderRadius: 20,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 30,
		marginVertical: 40,
		color: "white",
	},
});
