import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  ImageBackground,
  View,
  Alert,
  Modal,
} from "react-native";

//Dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as global from "../global";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
function DetailsScreen({ route }) {
  const navigation = useNavigation();
  const { globalNombre } = route.params;
  const { globalApellidoP } = route.params;
  const { globalApellidoM } = route.params;
  const { globalCarrera } = route.params;
  const { globalId } = route.params;
  const { id } = route.params;
  const { globalActividades } = route.params;
  const back = () => {
    navigation.navigate("HomeScreen", {
      globalNombre: globalNombre,
      globalCarrera: globalCarrera,
      globalApellidoP: globalApellidoP,
      globalApellidoM: globalApellidoM,
      globalActividades: globalActividades,
      globalId: globalId,
    });
  };

  const calificar = (calificacion) => {
    axios
      .get(global.host + "calificar.php", {
        params: {
          calificacion: calificacion,
          id: id,
        },
      })
      .then((response) => {
        Alert.alert("Gracias por Calificar :))");
        setModalVisible(!setModalVisible);
      });
  };
  const inscribirse = () => {
    axios
      .get(global.host + "inscribirse.php", {
        params: {
          globalId: globalId,
          id: id,
        },
      })
      .then((response) => {
        alert(response.data);
        if (response.data[0] == "T") {
          const taller =
            response.data[27] + response.data[28] + response.data[29];
          const posicion = response.data[46];
          globalActividades[posicion - 1] = taller;
        }
      });
  };
  const [Actividad, setActividad] = useState({});
  useEffect(() => {
    if (Actividad) {
      axios
        .get(global.host + "getDetails.php", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          setActividad(response.data);
        });
    }
  }, [Actividad]);
  const [modalVisible, setModalVisible] = useState(false);
  const image = {
    uri: "https://i.ibb.co/bz8f4xs/png-transparent-mysql-logo-lamp-apache-http-server-computer-servers-linux-installation-php-web-serve.png",
  };
  return (
    <>
      <StatusBar hidden={true} />
      <View
        style={{
          backgroundColor: "#646c9c",
          alignItems: "flex-end",
        }}
      >
        <Pressable style={styles.button} onPress={back}>
          <Text style={styles.textButton}>Atras</Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: "#bdbdbd", margin: 5, borderRadius: 7 }}>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.avatar}
            source={require("./images/avatar2.png")}
          />
          <View>
            <Text style={{ textAlign: "center", marginLeft: 100 }}>
              {Actividad[0]?.["tipo"]}
            </Text>
            <Text style={{ textAlign: "center", marginLeft: 100 }}>
              {Actividad[0]?.["nombre"]}
            </Text>
          </View>
        </View>
        <Text style={{ textAlign: "left" }}>{Actividad[0]?.["ponente"]}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pressable style={styles.button2} onPress={inscribirse}>
          <Text style={styles.textButton2}>Inscribirse</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Pressable onPress={() => calificar(1)} style={{ margin: 5 }}>
                  <Ionicons name="star" size={32} color="#e8c536" />
                </Pressable>
                <Pressable onPress={() => calificar(2)} style={{ margin: 5 }}>
                  <Ionicons name="star" size={32} color="#e8c536" />
                </Pressable>
                <Pressable onPress={() => calificar(3)} style={{ margin: 5 }}>
                  <Ionicons name="star" size={32} color="#e8c536" />
                </Pressable>
                <Pressable onPress={() => calificar(4)} style={{ margin: 5 }}>
                  <Ionicons name="star" size={32} color="#e8c536" />
                </Pressable>
                <Pressable onPress={() => calificar(5)} style={{ margin: 5 }}>
                  <Ionicons name="star" size={32} color="#e8c536" />
                </Pressable>
              </View>
              <Pressable
                style={[styles.button3, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={styles.button2}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textButton2}>Calificar</Text>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() =>
            navigation.navigate("CheckScreen", {
              id: id,
              globalId: globalId,
              globalNombre: globalNombre,
              globalApellidoP: globalApellidoP,
              globalApellidoM: globalApellidoM,
              globalCarrera: globalCarrera,
            })
          }
        >
          <Text style={styles.textButton2}>Pasar Lista</Text>
        </Pressable>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text>{Actividad[0]?.["descripcion"]}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>Lugar</Text>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {Actividad[0]?.["lugar"]}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>Fecha</Text>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {Actividad[0]?.["fecha"]}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    margin: 5,
    borderWidth: 2,
  },
  scrollView: {
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    width: "34%",
    height: 40,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#374484",
  },
  textButton2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.25,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  button: {
    margin: 5,
    width: 60,
    height: 50,
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
  button3: {
    width: 100,
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#a1aad8",
  },
});

export default DetailsScreen;
