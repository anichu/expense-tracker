import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { expenseCategories } from "../constants/categories";
import { UserContext } from "../store/user-context";
import { TargetServices } from "../services/target";
import Loading from "../shared/Loading";

const SetExpenseForm = ({ modalVisible, setModalVisible, refetch }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseTime, setExpenseTime] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(expenseCategories);
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    console.log("date~~", date);
    hideDatePicker();
  };

  const handleFormSubmit = async () => {
    let createTarget = {
      name: expenseName,
      expense: expenseAmount,
      category: expenseCategory,
      endDate: date,
      user: user?._id,
    };

    try {
      setLoading(true);
      const result = await TargetServices.createTarget(createTarget);
      if (result) {
        setModalVisible(false);
        console.log(result);
      }
      await refetch();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // Handle form submission logic here
    // console.log("Expense Name:", expenseName);
    // console.log("Expense Amount:", expenseAmount);
    // console.log("Expense Category:", expenseCategory);
    // console.log("Expense Time:", expenseTime);
    console.log("create target~", createTarget);

    // Close the modal after submission
    // setModalVisible(false);
  };

  // if(loading){
  //   return <Loading/>
  // }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Set Expense Target</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Chose a category"
            style={{
              marginBottom: 10,
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#fff",
              paddingVertical: 15,
              marginBottom: 10,
              borderRadius: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
            onPress={showDatePicker}
          >
            <Text style={{ color: "#ccc" }}>
              {date ? date.toString() : "Event Date"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* <TextInput
            style={styles.input}
            placeholder="Time"
            value={expenseTime}
            onChangeText={setExpenseTime}
          /> */}
          <Button
            title={loading ? "Creating..." : "Submit"}
            onPress={handleFormSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default SetExpenseForm;
