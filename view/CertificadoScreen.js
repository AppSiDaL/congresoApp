import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

export default function CertificadoScreen({ route }) {
  const { id } = route.params;
  const { globalId } = route.params;
  const { globalNombre } = route.params;
  const { globalApellidoP } = route.params;
  const { globalApellidoM } = route.params;
  const { globalCarrera } = route.params;
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <style>
      .gen {
        border-width: 10px;
        border-style: groove;
        border-color: rgb(56, 51, 196);
      }
    </style>
    <body>
      <div class="gen">
        <div class="head" style="flex: 1;display: flex;">
          <a href="https://ibb.co/gMBX61Z"
            ><img
              src="https://i.ibb.co/svMDtS9/logo-Tesjo.png"
              alt="logo-Tesjo"
              border="0"
          /></a>
          <a href="https://ibb.co/bX31xS7"
            ><img
              style="height: 200px; margin-left: 900px"
              src="https://i.ibb.co/KWG6YMm/isc-removebg-preview-1.png"
              alt="isc-removebg-preview-1"
              border="0"
          /></a>
        </div>
        <div class="texto">
          <h1 style="text-align: center; margin-top: 30px">
            EL TECNOLOGICO DE ESTUDIOS SUPERIORES DE JOCOTITAL OTORGA EL PRESENTE:
          </h1>
          <h1 style="font-size: 70px; text-align: center; color: #0e0ae2">
            RECONOCIMIENTO
          </h1>
          <h1 style="text-align: center">
            AL ESTUDIANTE DE LA INGENIERIA EN SISTEMAS COMPUTACIONALES:
          </h1>
          <h1 style="text-align: center; font-size: 50px">
            GILBERTO DAVALOS NAVA
          </h1>
          <h1 style="text-align: center">
            POR CONCLUIR DE MANERA EXITOSA EL TALLER:DESARROLLO FULLSTACK CON
            LAMP+REACT.JS
          </h1>
          <h1 style="text-align: center">
            JOCOTITLAN ESTADO DE MEXICO A 13/05/2023
          </h1>
        </div>
        <div class="firmas" style="flex-direction: row; display: flex">
          <h1
            style="
              text-align: center;
              margin-top: 150px;
              margin-left: 150px;
              border-top-width: 5px;
              border-color: black;
              border-top-style: solid;
            "
          >
            M.JUAN CARLOS AMBRIZ POLO
          </h1>
          <h1
            style="
              text-align: center;
              margin-top: 150px;
              margin-left: 700px;
              border-top-width: 5px;
              border-color: black;
              border-top-style: solid;
            "
          >
            PONENTE
          </h1>
        </div>
      </div>
    </body>
  </html>
  
`;
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      height:1080,
      width:1920,
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html,Orientation });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});
