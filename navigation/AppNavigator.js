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
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import AllExpense from "../Screens/AllExpense";
import DropDownPicker from "react-native-dropdown-picker";
import { ExpenseServices, getRecentExpenses } from "../services/expense";
import { TaskContext } from "../store/task-context";
import RecentExpense from "../Screens/RecentExpense";
import { expenseCategories } from "../constants/categories";
import LoginForm from "../Screens/LoginScreen";
import Signup from "../Screens/SignupScreen";
import { UserContext } from "../store/user-context";
import ProfileScreen from "../Screens/ProfileScreen";
import Loading from "../shared/Loading";
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [expense, setExpense] = useState("");
  const { expenses, expensesRefetch, recentExpensesRefetch } =
    useContext(TaskContext);
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(expenseCategories);
  const [loading, setLoading] = useState(false);

  const pressHandler = () => {
    console.log("presseded");
    setModalVisible(true);
  };

  // console.log("expenses~", expenses);

  const submitHandler = async () => {
    console.log("clicked for add expense");
    if (!name || !expense || !value) {
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

    if (!user) {
      Alert.alert("Please,Login first");
      return;
    }

    try {
      const createExpense = {
        name,
        expense,
        category: value,
        user: user?._id,
      };
      setLoading(true);
      const data = await ExpenseServices.createExpense(createExpense);
      if (data) {
        await expensesRefetch();
        await recentExpensesRefetch();
        setName("");
        setExpense("");
        setModalVisible(false);
      }
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    // fetch("https://expensetracker-ivory-alpha.vercel.app/api/expense", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     expense,
    //   }),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`Network response was not ok: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log("sina-sina", data);
    //     setName("");
    //     setExpense("");
    //     setModalVisible(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error during fetch:", err);
    //   });
  };

  console.log("value~~", value);

  if (loading) {
    return <Loading />;
  }

  return (
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
          {user && (
            <Tab.Screen
              name="AllExpense"
              options={{
                tabBarIcon: () => (
                  <AntDesign name="wallet" size={24} color="black" />
                ),
              }}
              component={AllExpense}
            />
          )}
          {user && (
            <Tab.Screen
              name="RecentExpense"
              options={{
                tabBarIcon: () => (
                  <AntDesign name="wallet" size={24} color="black" />
                ),
              }}
              component={RecentExpense}
            />
          )}

          {user && (
            <Tab.Screen
              name="Profile"
              options={{
                tabBarIcon: () => (
                  <AntDesign name="user" size={24} color="black" />
                ),
              }}
              component={ProfileScreen}
            />
          )}
          {!user && (
            <Tab.Screen
              name="Login"
              options={{
                tabBarIcon: () => (
                  <AntDesign name="wallet" size={24} color="black" />
                ),
              }}
              component={LoginForm}
            />
          )}
          {!user && (
            <Tab.Screen
              name="Signup"
              options={{
                tabBarIcon: () => (
                  <AntDesign name="wallet" size={24} color="black" />
                ),
              }}
              component={Signup}
            />
          )}
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

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Chose a category"
              // containerStyle={{
              //   borderWidth: 1,
              //   borderRadius: 10,
              //   borderColor: "red",
              //   backgroundColor: "#6F1E51",
              //   // zIndex: 999999,
              // }}
            />

            <View style={styles.buttonsContainer}>
              <Pressable style={styles.buttonContainer} onPress={submitHandler}>
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
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "49%",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 40,
    color: "white",
  },
});
