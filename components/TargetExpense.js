import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TargetServices } from "../services/target";
import { Entypo } from "@expo/vector-icons";

const TargetExpense = ({ item, refetch }) => {
  const [exceeds, setExceeds] = useState(null);
  const deleteHandler = async (id) => {
    console.log(id);

    try {
      const data = await TargetServices.deleteTarget(id);
      if (data.success) {
        await refetch();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TargetServices.checkExceeds({
          category: item.category,
          amount: item.expense,
          startDate: item.startDate,
          endDate: item.endDate,
          user: item.user,
        });
        // console.log(data);
        setExceeds(data);
      } catch (error) {
        console.log(error?.message);
      }
    };

    fetchData();
  }, [item]);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: exceeds && exceeds.data === false ? "purple" : "red",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.label}>Category:</Text>
        <Text
          style={[
            styles.text,
            {
              color: "white",
              fontWeight: "bold",
            },
          ]}
        >
          {item.category}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
        }}
        onPress={() => deleteHandler(item._id)}
      >
        <Entypo
          name="trash"
          size={24}
          color={exceeds && exceeds.data === false ? "red" : "purple"}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.label}>Amount: </Text>
        <Text style={styles.text}>{item.expense}</Text>
      </View>
      {exceeds && exceeds.data === true && (
        <View
          style={{
            backgroundColor: "purple",
            marginVertical: 10,
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "red",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Exceeds the target
          </Text>
        </View>
      )}
    </View>
  );
};

export default TargetExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "orange",
  },
});
