import * as SecureStore from "expo-secure-store";

// Save token
const saveToken = async (user) => {
  try {
    await SecureStore.setItemAsync("expense-user-data", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Get token
const getToken = async () => {
  try {
    let user = await SecureStore.getItemAsync("expense-user-data");
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// Remove token
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("expense-user-data");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const UserStore = {
  saveToken,
  getToken,
  removeToken,
};
