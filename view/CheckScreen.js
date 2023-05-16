import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import * as global from "../global";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CheckScreen({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const { globalId } = route.params;
  const { globalNombre } = route.params;
  const { globalApellidoP } = route.params;
  const { globalApellidoM } = route.params;
  const { globalCarrera } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [key, setKey] = useState("");
  useEffect(() => {
    axios
      .get(global.host + "obtainKey.php", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setKey(response.data[0]["llave"]);
      });
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data == key) {
      navigation.navigate("CertificadoScreen", {
        id: id,
        globalId: globalId,
        globalNombre: globalNombre,
        globalApellidoP: globalApellidoP,
        globalApellidoM: globalApellidoM,
        globalCarrera: globalCarrera,
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
