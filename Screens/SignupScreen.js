import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AuthServices } from "../services/user";
import Loading from "../shared/Loading";
import { UserContext } from "../store/user-context";
import { UserStore } from "../utils/user";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSignup = async () => {
    // Handle signup logic here, e.g., send data to server
    console.log("Signing up with:", { email, password, name });
    try {
      setLoading(true);
      const user = await AuthServices.signup({ email, password, name });
      setUser(user);
      UserStore.saveToken(user);
      setLoading(false);
      console.log(user);
    } catch (error) {
      setLoading(false);
      const msg = getErrorMessage(error);
      Alert.alert(msg);
      console.log(error);
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
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
        onPress={handleSignup}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Sign Up
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

export default Signup;
