import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import Routing from "./navigations/routing";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routing />
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
