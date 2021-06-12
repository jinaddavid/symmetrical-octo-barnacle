import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CandidateTextInput = ({ validateOnChange, label, value, errors }) => {
  let ErrorDisplayed = null;
  ErrorDisplayed = errors.map((item, index) => (
    <View key={index} style={{ flex: 1 }} key={index}>
      <Text style={[styles.label, { color: "red" }]}>{item}</Text>
    </View>
  ));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${label}:`}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={validateOnChange}
        autoCorrect={false}
      />
      {ErrorDisplayed}
    </View>
  );
};

export default CandidateTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 8,
  },
  error: {
    fontSize: 12,
    color: "#e74c3c",
  },
  errorContainer: {
    padding: 8,
  },
});
