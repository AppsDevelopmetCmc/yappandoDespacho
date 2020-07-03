import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Button, Alert, View, Text, StyleSheet, Image } from "react-native";

export class CargarImagen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      nuevaImagen: true,
    };
  }
  render() {
    const { uploading, progress, image } = this.state;
    return (
      <View>
        {/** Display selected image */}
        {this.state.image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Seleccione una imagen!</Text>
        )}
        {uploading && (
          <View style={[styles.progressBar, { width: progress }]} />
        )}
        <Button
          title="Seleccione Imagen"
          onPress={() => {
            this.abrirImagen();
          }}
        />
        <Button
          title="Guardar"
          onPress={() => {
            this.cargarImagen();
          }}
        />
      </View>
    );
  }

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };
      // this helps us get a blob
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);

      xhr.send(null);
    });
  };
  cargarImagen = async () => {
    let fnRecuperarRuta = this.props.route.params.fnRecuperarRuta;
    let navigation = this.props.navigation;
    this.uriToBlob(this.state.image).then((blob) => {
      //return uploadToFirebase(blob);
      const nombreArchivo = new Date().getTime();
      let storageRef = global.storage.ref();
      let imagesRef = storageRef.child("images/" + nombreArchivo);
      imagesRef.put(blob).then(function (snapshot) {
        let referenciaStorage = global.storage.refFromURL(
          "gs://little-market-dev-377b6.appspot.com/images/" + nombreArchivo
        );
        referenciaStorage
          .getDownloadURL()
          .then((data) => {
            let urlDescarga = data;
            fnRecuperarRuta(urlDescarga);
            navigation.goBack();
          })
          .catch((error) => {
            console.log("ERROR", error);
          });
        //fnRecuperarRuta(nombreArchivo);
        
      });
    });

    ///var spaceRef = storageRef.child('images/space.jpg');
  };
  abrirImagen = async () => {
    let permissionResult;
    try {
      permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    } catch (err) {
      Alert.alert("error");
    }
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },

  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgb(3, 154, 229)",
    marginTop: 20,
    alignItems: "center",
  },

  disabledBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgb(3, 154, 229)",
    marginTop: 20,
    alignItems: "center",
    opacity: 0.5,
  },

  btnTxt: {
    color: "#fff",
  },
  image: {
    minWidth: 200,
    height: 200,
    resizeMode: "contain",
  },

  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#ccc",
  },
  progressBar: {
    backgroundColor: "rgb(3, 154, 229)",
    height: 5,
    shadowColor: "#000",
  },
});
