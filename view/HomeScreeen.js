import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
} from "react-native";

//Dependencies
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import * as global from "../global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { globalId } = route.params;
  const { globalNombre } = route.params;
  const { globalCarrera } = route.params;
  const { globalApellidoP } = route.params;
  const { globalApellidoM } = route.params;
  var { globalActividades } = route.params;

  const Logout = () => {
    navigation.navigate("LoginScreen");
  };
  const [Actividades, setActividades] = useState({});

  useEffect(() => {
    if (Actividades) {
      axios
        .get(global.host + "getActivities.php", {
          params: {
            actividad1: globalActividades[0],
            actividad2: globalActividades[1],
            actividad3: globalActividades[2],
            actividad4: globalActividades[3],
            actividad5: globalActividades[4],
          },
        })
        .then((response) => {
          setActividades(response.data);
        });
    }
  }, [Actividades]);

  const stringJson = JSON.stringify(Actividades);
  const data = JSON.parse(stringJson);
  const dataArray = Object.values(data);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.topCard}>
        <Image style={styles.avatar} source={require("./images/avatar.png")} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 20 }}>Bienvenid@ {globalNombre}</Text>
          <Text>{globalCarrera}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse", margin: 5 }}>
          <Pressable style={styles.button} onPress={Logout}>
            <Text style={styles.textButton}>Log Out</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pressable
          style={[{ backgroundColor: "#374484" }, styles.button2]}
          onPress={() =>
            navigation.navigate("HomeScreen", {
              globalId: globalId,
              globalNombre: globalNombre,
              globalApellidoP: globalApellidoP,
              globalApellidoM: globalApellidoM,
              globalCarrera: globalCarrera,
              globalActividades: globalActividades,
            })
          }
        >
          <Text style={[{ color: "white" }, styles.textButton2]}>Tuyos</Text>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() =>
            navigation.navigate("ExploreScreen", {
              globalId: globalId,
              globalNombre: globalNombre,
              globalCarrera: globalCarrera,
              globalApellidoP: globalApellidoP,
              globalApellidoM: globalApellidoM,
              globalActividades: globalActividades,
            })
          }
        >
          <Text style={styles.textButton2}>Explora</Text>
        </Pressable>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {dataArray.map((item) => {
            return (
              <View key={"CardCard" + item[0]["id"]}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#bdbdbd",
                  }}
                  key={"GenCard" + item[0]["id"]}
                >
                  <Pressable
                    key={"DeleteButton" + item[0]["id"]}
                    onPress={() => {
                      console.log(globalActividades);
                      globalActividades = globalActividades.splice(0, 1);
                      console.log(globalActividades);
                    }}
                  >
                    <Ionicons
                      key={"Delete" + item[0]["id"]}
                      name="trash"
                      size={25}
                      color="red"
                    />
                  </Pressable>
                  <Pressable
                    key={"Presable" + item[0]["id"]}
                    style={{ marginTop: 10, backgroundColor: "gray" }}
                    onPress={() =>
                      navigation.navigate("DetailsScreen", {
                        id: item[0]["id"],
                        globalId: globalId,
                        globalNombre: globalNombre,
                        globalCarrera: globalCarrera,
                        globalApellidoP: globalApellidoP,
                        globalApellidoM: globalApellidoM,
                        globalActividades: globalActividades,
                      })
                    }
                  >
                    <View
                      style={styles.cardDetails}
                      key={"Card" + item[0]["id"]}
                    >
                      <View style={styles.card} key={"Card1" + item[0]["id"]}>
                        <Image
                          key={"Avatar" + item[0]["id"]}
                          style={styles.avatar}
                          source={require("./images/avatar2.png")}
                        />
                        <Text key={"Ponente" + item[0]["id"]}>
                          {item[0]["ponente"]}
                        </Text>
                      </View>
                      <View
                        key={"Card2" + item[0]["id"]}
                        style={{ alignItems: "center", width: 170 }}
                      >
                        <Text key={"Tipo" + item[0]["id"]}>
                          {item[0]["tipo"]}
                        </Text>
                        <Text key={"Nombre" + item[0]["id"]}>
                          {item[0]["nombre"]}
                        </Text>
                      </View>
                      <Text
                        key={"Dirigido" + item[0]["id"]}
                        style={{ marginTop: 120 }}
                      >
                        {item[0]["dirigido"]}
                      </Text>
                    </View>
                  </Pressable>
                </View>
                <View
                  key={"salto" + item[0]["id"]}
                  style={{ width: "100%", height: 10 }}
                ></View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  cardDetails: {
    backgroundColor: "#bdbdbd",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  container: {
    borderWidth: 2,
    flex: 1,
    paddingTop: 5,
  },
  scrollView: {
    backgroundColor: "#cbe1e3",
    marginHorizontal: 5,
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    height: 50,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#14246c",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.25,
  },
  button2: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  topCard: {
    flexDirection: "row",
    backgroundColor: "#646c9c",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    height: 100,
    width: 100,
  },
  card: {
    marginTop: 30,
    maxWidth: "100%",
  },
});

export default HomeScreen;
