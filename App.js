import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import Home from "./screens/Home";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Home />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
