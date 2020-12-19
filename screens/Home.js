import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../services/Api";
import formatNumber from "../utils/formatNumber";

const Home = () => {
  const [listAllCountries, setListAllCountriess] = useState({});
  const [listCountries, setListCountries] = useState([]);
  const [listFilterCountries, setListFilterCountries] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleFilterCountry = (text) => {
    const filtered = listCountries.filter((item) =>
      item.country.toLowerCase().includes(text.toLowerCase())
    );
    setSearch(text);
    setListFilterCountries(filtered);
  };

  const listCases = (type, total, today) => {
    let title, subtitle;
    switch (type) {
      case "cases":
        title = "textCases";
        subtitle = "textNewCases";
        break;
      case "death":
        title = "textDeath";
        subtitle = "textNewDeath";
        break;
      default:
        title = "textHealthy";
        subtitle = "textNewHealthy";
        break;
    }

    return (
      <View style={styles.cardCol}>
        <View style={styles.cardColItem}>
          <Text style={styles[title]}>{formatNumber(total)}</Text>
          <Text style={styles[subtitle]}>(+{formatNumber(today)})</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.search}
          placeholder="Bir ülke giriniz"
          placeholderTextColor="gray"
          onChangeText={(text) => handleFilterCountry(text)}
          defaultValue={search}
        />
      </View>
      {!!listFilterCountries.length ? (
        <>
          {!!Object.keys(listAllCountries).length && !search && (
            <View style={styles.card}>
              <View style={styles.cardTitle}>
                <Text style={styles.cardTitleText}>Global</Text>
              </View>
              <View style={styles.cardBody}>
                {listCases(
                  "cases",
                  listAllCountries.cases,
                  listAllCountries.todayCases
                )}
                {listCases(
                  "death",
                  listAllCountries.deaths,
                  listAllCountries.todayDeaths
                )}
                {listCases(
                  "healthy",
                  listAllCountries.recovered,
                  listAllCountries.todayRecovered
                )}
              </View>
            </View>
          )}

          <FlatList
            data={listFilterCountries}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <TouchableOpacity key={`country_${item._id}`}>
                <View style={styles.card}>
                  <View style={styles.cardTitle}>
                    <Image
                      source={{ uri: `${item.countryInfo.flag}` }}
                      style={styles.cardTitleFlag}
                    />
                    <Text style={styles.cardTitleText}>{item.country}</Text>
                    <Text style={styles.textContinent}>({item.continent})</Text>
                  </View>
                  <View style={styles.cardBody}>
                    {listCases("cases", item.cases, item.todayCases)}
                    {listCases("death", item.deaths, item.todayDeaths)}
                    {listCases("healthy", item.recovered, item.todayRecovered)}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={styles.notFound}>Bir Ülke Bulunamadı</Text>
      )}
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
  card: {
    flexDirection: "column",
    minHeight: 60,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  cardTitleFlag: {
    marginRight: 10,
    width: 40,
    height: 30,
  },
  globe: {
    marginRight: 10,
  },
  cardTitleText: {
    fontSize: 19,
    fontWeight: "700",
  },
  cardBody: {
    flexDirection: "row",
  },
  cardCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 120,
  },
  cardColItem: {
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCases: {
    color: "#ff8e01",
  },
  textCases: {
    color: "#ff8e01",
    fontSize: 14,
  },
  textNewCases: {
    color: "#ff8e01",
    fontStyle: "italic",
    fontSize: 10,
  },
  iconDeath: {
    color: "#333333",
  },
  textDeath: {
    color: "#333333",
    fontSize: 14,
  },
  textNewDeath: {
    color: "#333333",
    fontStyle: "italic",
    fontSize: 10,
  },
  iconHealthy: {
    color: "#d32f2e",
  },
  textHealthy: {
    color: "#d32f2e",
    fontSize: 14,
  },
  textNewHealthy: {
    color: "#d32f2e",
    fontStyle: "italic",
    fontSize: 10,
  },
  textContinent: {
    fontStyle: "italic",
    fontSize: 10,
    padding: 5,
    justifyContent: "center",
  },
  notFound: {
    flex: 1,
    color: "gray",
    fontSize: 18,
    fontWeight: "700",
    justifyContent: "center",
    alignSelf: "center",
  },
});
