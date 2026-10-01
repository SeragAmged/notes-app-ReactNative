import { useAuthContext } from "@/src/auth/authContext";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  isRegistering: boolean;
  loading: boolean;
  error: string | null;
}

const AuthScreen = () => {
  const [state, setState] = React.useState<State>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isRegistering: false,
    loading: false,
    error: null,
  });
  const auth = useAuthContext();

  const handleToggleForm = () => {
    setState({
      ...state,
      isRegistering: !state.isRegistering,
      error: null,
    });
  };

  const authenticating = async () => {
    if (state.isRegistering && state.password !== state.confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        error: "Passwords do not match",
      }));
      return;
    }

    if (state.password.length < 6) {
      setState((prevState) => ({
        ...prevState,
        error: "Password must be at least 6 characters",
      }));
      return;
    }

    if (RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(state.email) && state.email.length < 6) {
      setState((prevState) => ({
        ...prevState,
        error: "Email must be at least 6 characters",
      }));
      return;
    }

    setState({ ...state, loading: true });
    try {
      if (state.isRegistering) {
        await auth.register(state.email, state.password, state.name);
      } else {
        await auth.login(state.email, state.password);
      }
      setState((prevState) => ({ ...prevState, error: null }));
      router.replace("/notes");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
      console.error("❌ Error authenticating account:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {state.isRegistering ? "Sign Up" : "Login"}
      </Text>
      {state.isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={state.name}
          onChangeText={(text) => setState({ ...state, name: text })}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => setState({ ...state, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.password}
        onChangeText={(text) => setState({ ...state, password: text })}
        secureTextEntry
      />
      {state.isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChangeText={(text) => setState({ ...state, confirmPassword: text })}
          secureTextEntry
        />
      )}

      {state.error && <Text style={styles.errorText}>{state.error}</Text>}

      <TouchableOpacity
        style={styles.actionButton}
        onPress={authenticating}
        disabled={state.loading}
      >
        {state.loading ? (
          <ActivityIndicator size="small" color="#d5d5d5ff" />
        ) : (
          <Text style={styles.actionButtonText}>
            {state.isRegistering ? "Sign Up" : "Login"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleToggleForm}>
        <Text style={styles.textButton}>
          {state.isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#d5d5d5ff",
  },
  input: {
    height: 40,
    width: "100%",
    color: "white",
    backgroundColor: "#434141ff",
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: "#007bff",
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  textButton: {
    color: "#007bff",
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    width: "100%",
    marginBottom: 16,
  },
});
