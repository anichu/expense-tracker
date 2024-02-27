import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { AuthServices } from "../services/user";
import { UserStore } from "../utils/user";
import { UserContext } from "../store/user-context";
import Loading from "../shared/Loading";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import { getErrorMessage } from "../utils/error";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    // Handle login logic here, e.g., send data to server
    console.log("Logging in with:", { email, password });
    try {
      setLoading(true);
      const user = await AuthServices.login({ email, password });
      setUser(user);
      UserStore.saveToken(user);
      setLoading(false);
      console.log(user);
    } catch (error) {
      setLoading(false);
      const msg = getErrorMessage(error);
      Alert.alert(msg);
      console.log(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "purple",
          padding: 10,
          marginBottom: 10,
          width: "100%",
          elevation: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginForm;
