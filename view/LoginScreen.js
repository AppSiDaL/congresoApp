import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

//Dependencies
import * as global from "../global";
import axios, { Axios, AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";
function Login() {
  const navigation = useNavigation();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [NewNumeroControl, setNewNumeroControl] = useState("");
  const [NewNombre, setNewNombre] = useState("");
  const [NewApellidoPaterno, setNewApellidoPaterno] = useState("");
  const [NewApellidoMaterno, setNewApellidoMaterno] = useState("");
  const [NewCarrera, setNewCarrera] = useState("");
  const [NewGrupo, setNewGrupo] = useState("");
  const [NewUsuario, setNewUsuario] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const signIn = () => {
    axios
      .get(global.host + "signIn.php", {
        params: {
          numeroControl: NewNumeroControl,
          nombre: NewNombre,
          apellidoPaterno: NewApellidoPaterno,
          apellidoMaterno: NewApellidoMaterno,
          carrera: NewCarrera,
          grupo: NewGrupo,
          usuario: NewUsuario,
          contraseña: NewPassword,
        },
      })
      .then((response) => {
        alert("Registrado correctamente");
      });
  };

  const logear = () => {
    axios
      .get(global.host + "log.php", {
        params: {
          usuario: usernameValue,
          password: passwordValue,
        },
      })
      .then((response) => {
        const globalNombre = response.data[0]["nombre"];
        const globalCarrera = response.data[0]["carrera"];
        const globalApellidoP = response.data[0]["apellidoPaterno"];
        const globalApellidoM = response.data[0]["apellidoMaterno"];
        const globalId = response.data[0]["id"];
        const globalActividades = [];

        for (let i = 1; i <= 5; i++) {
          globalActividades.push(response.data[0]["actividad" + i]);
        }

        if (JSON.stringify(response.data) != "[]") {
          navigation.navigate("HomeScreen", {
            globalId: globalId,
            globalNombre: globalNombre,
            globalApellidoP: globalApellidoP,
            globalApellidoM: globalApellidoM,
            globalCarrera: globalCarrera,
            globalActividades: globalActividades,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <StatusBar hidden={true} />
      <Image
        style={styles.tesjoLogo}
        source={require("./images/logoTesjo.png")}
      />
      <Text style={styles.bienvenido}>BIENVENIDO</Text>
      <Text style={styles.title}>Talleres y Conferencias TESJo</Text>
      <Text style={styles.username}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsernameValue}
      ></TextInput>
      <Text style={styles.username}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPasswordValue}
      ></TextInput>

      <Pressable style={styles.button} onPress={logear}>
        <Text style={styles.textButton}>Loggin</Text>
      </Pressable>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.registrate}>Sin Cuenta? Registrate</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.username}>Numero de Control</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewNumeroControl}
                ></TextInput>
                <Text style={styles.username}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewNombre}
                ></TextInput>
                <Text style={styles.username}>Apellido Paterno</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewApellidoPaterno}
                ></TextInput>
                <Text style={styles.username}>Apellido Materno</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewApellidoMaterno}
                ></TextInput>
                <Text style={styles.username}>Carrera</Text>
                <Picker style={styles.carreraPicker} onValueChange={setNewCarrera}>
                  <Picker.Item
                    label="Ing. Sistemas Comp."
                    value="Ing. Sistemas"
                  />
                  <Picker.Item
                    label="Ing. Mecatronicoa"
                    value="Ing. Mecatronica"
                  />
                </Picker>
                <Text style={styles.username}>Grupo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewGrupo}
                ></TextInput>
                <Text style={styles.username}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewUsuario}
                ></TextInput>
                <Text style={styles.username}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewPassword}
                ></TextInput>

                <Pressable style={styles.buttonModal} onPress={signIn}>
                  <Text style={styles.textButton}>Registrate</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textButton}>Cancelar</Text>
                </Pressable>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  carreraPicker: {
    backgroundColor:"#a1aad8",
    marginTop:10,
  },
  container: {
    paddingTop: 5,
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    height: 700,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  registrate: {
    color: "black",
    textAlign: "center",
    marginTop: 50,
    fontSize: 15,
  },
  button: {
    marginTop: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#14246c",
  },
  buttonModal: {
    marginTop: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#374484",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    textAlign:"center",
    marginTop: 20,
    height: 50,
    backgroundColor: "#a1aad8",
    borderRadius: 20,
  },
  username: {
    marginTop: 20,
    color: "gray",
  },
  title: {
    marginTop: 20,
    color: "black",
    fontStyle:"italic",
    fontSize: 20,
    textAlign: "center",
  },
  bienvenido: {
    marginTop: 30,
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
  tesjoLogo: {
    marginTop: 50,
    maxWidth: "100%",
    height: 100,
  },
});

export default Login;
