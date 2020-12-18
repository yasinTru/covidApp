import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Home = () => {
  const [listAllCountries, setListAllCountriess] = useState({});
  const [listCountries, setListCountries] = useState([]);
  const [listFilterCountries, setListFilterCountries] = useState([]);

  useEffect(() => {
    api.get("countries").then((response) => {
      setListCountries(response.data);
      setListFilterCountries(response.data);
    });

    api.get("all").then((response) => {
      setListAllCountriess(response.data);
    });

    setSearch("");
  }, []);

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
