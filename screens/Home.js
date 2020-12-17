import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.search}
          placeholder="Bir ülke giriniz"
          placeholderTextColor="gray"
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 5,
    flexDirection: "column",
  },
  searchBar: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcdce6",
    marginBottom: 20,
  },
  search: {
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    fontSize: 14,
    marginLeft: 10,
    height: 40,
  },
});
