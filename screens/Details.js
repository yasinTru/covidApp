import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../services/Api";
import formatNumber from "../utils/formatNumber";

const Details = () => {
  const [country, setCountry] = React.useState({});
  const [historical, setHistorical] = React.useState();
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    if (!!route.params.country) {
      api.get(`countries/${route.params.country}`).then((response) => {
        setCountry(response.data);
      });
      api
        .get(`historical/${route.params.country}?lastdays=5`)
        .then((response) => {
          setHistorical(response.data.timeline);
        });
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/back-arrow.png")}
          />
        </TouchableOpacity>
      </View>
      {!!Object.keys(country).length && (
        <View style={styles.details}>
          <View style={styles.countryHeader}>
            <Image
              source={{ uri: `${country.countryInfo["flag"]}` }}
              style={{ height: windowWidth * 0.4, width: windowWidth * 0.8 }}
            />
          </View>
          <ScrollView style={styles.countryDetail}>
            <View style={styles.detailRow}>
              <Text>Ülke Nüfusu: {formatNumber(country.population)}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={{ flex: 0.7 }}>
                <Text>Toplam Vakalar: {formatNumber(country.cases)}</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignItems: "flex-end",
                  backgroundColor: "orange",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text style={styles.text}>
                  +{formatNumber(country.todayCases)}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={{ flex: 0.7 }}>
                <Text>Toplam Ölümler: {formatNumber(country.deaths)}</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignItems: "flex-end",
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text style={styles.text}>
                  +{formatNumber(country.todayDeaths)}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={{ flex: 0.7 }}>
                <Text>
                  Toplam İyileşenler: {formatNumber(country.recovered)}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignItems: "flex-end",
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text style={styles.text}>
                  +{formatNumber(country.todayRecovered)}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text>Aktif Hasta Sayısı: {formatNumber(country.active)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>
                Durumu Kritik Hasta Sayısı: {formatNumber(country.critical)}
              </Text>
            </View>
            <View style={styles.oranRow}>
              <View
                style={{
                  backgroundColor: "orange",
                  flex: 0.3,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.text}>
                  %{country.casesPerOneMillion / 10000}
                </Text>
                <Text style={styles.text}> Vaka Oranı </Text>
              </View>
              <View
                style={{
                  backgroundColor: "red",
                  flex: 0.3,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.text}>
                  %{country.deathsPerOneMillion / 10000}
                </Text>
                <Text style={styles.text}>Ölüm Oranı </Text>
              </View>
              <View
                style={{
                  backgroundColor: "green",
                  flex: 0.3,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.text}>
                  %{country.testsPerOneMillion / 10000}
                </Text>
                <Text style={styles.text}>Test Oranı </Text>
              </View>
            </View>
            <View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ textAlign: "center" }}>
                  Son 5 Gündeki Toplamlar
                </Text>
              </View>
              {historical && (
                <View style={{ margin: 10 }}>
                  <View
                    style={{
                      marginHorizontal: 5,
                      backgroundColor: "orange",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 25,
                      marginBottom: 10,
                    }}
                  >
                    <View>
                      <Text style={styles.textDate}>Vakalar</Text>
                    </View>
                    {Object.entries(historical.cases).map(([key, value]) => (
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ flex: 0.5 }}>
                          <Text style={styles.textDate}>{key}</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                          <Text style={styles.textDate}>{value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      marginHorizontal: 5,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 25,
                      marginBottom: 10,
                    }}
                  >
                    <View>
                      <Text style={styles.textDate}>Ölümler</Text>
                    </View>
                    {Object.entries(historical.deaths).map(([key, value]) => (
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ flex: 0.5 }}>
                          <Text style={styles.textDate}>{key}</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                          <Text style={styles.textDate}>{value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      marginHorizontal: 5,
                      backgroundColor: "green",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 25,
                      marginBottom: 10,
                    }}
                  >
                    <View>
                      <Text style={styles.textDate}>İyileşenler</Text>
                    </View>
                    {Object.entries(historical.recovered).map(
                      ([key, value]) => (
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ flex: 0.5 }}>
                            <Text style={styles.textDate}>{key}</Text>
                          </View>
                          <View style={{ flex: 0.5 }}>
                            <Text style={styles.textDate}>{value}</Text>
                          </View>
                        </View>
                      )
                    )}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#d7d7d8",
  },
  backButton: {
    flex: 0.05,
    padding: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
  },
  details: {
    flex: 0.9,
    marginTop: 5,
  },
  countryHeader: { alignItems: "center", flex: 0.5 },
  countryDetail: {
    flex: 0.5,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#d7d7d8",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  oranRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white", fontWeight: "bold" },
  textDate: { color: "white", textAlign: "center", fontSize: 18 },
});
