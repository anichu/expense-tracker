import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TotalExpenses = ({ title = "Total expenses:", total }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 10,
      }}
    >
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {" "}
        {title}:
      </Text>
      <Text
        style={{
          color: "blue",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Tk {total}
      </Text>
    </View>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({});
