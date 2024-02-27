import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskContextProvider from "./store/task-context";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import UserProvider from "./store/user-context";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TaskContextProvider>
          <AppNavigator />
        </TaskContextProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
