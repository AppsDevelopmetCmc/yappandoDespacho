import firebase from "firebase";
import "@firebase/firestore";
import { ArregloUtil } from "../utils/utils";
import { Alert } from "react-native";
import "@firebase/storage";

export class ServicioPedidos {
  constructor() {
    if (global.firebaseRegistered != true) {
      global.firebaseConfig = {
        apiKey: "AIzaSyCuPTN-HQyPxrLUr40Bl2nmX5PqNCUVnJg",
        authDomain: "little-market-dev-377b6.firebaseapp.com",
        databaseURL: "https://little-market-dev-377b6.firebaseio.com",
        projectId: "little-market-dev-377b6",
        storageBucket: "little-market-dev-377b6.appspot.com",
        messagingSenderId: "549900659572",
        appId: "1:549900659572:web:ce8621915b320376469a21",
      };
      firebase.initializeApp(firebaseConfig);
      global.db = firebase.firestore();
      global.firebaseRegistered = true;
      global.storage = firebase.storage();
    }
  }

  obtenerPedidoFechaTotal = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          let pedidoItem = documentos[i].data();
          pedidoItem.id = documentos[i].id;
          pedidos.push(pedidoItem);
          let coleccionCombos = await global.db
            .collection("pedidos")
            .doc(documentos[i].id)
            .collection("combos")
            .get();
          let combos = coleccionCombos.docs;
          let listaCombos = [];
          for (let j = 0; j < combos.length; j++) {
            listaCombos.push(combos[j].data());
          }
          pedidos[i].listaCombos = listaCombos;
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoFecha = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          if (documentos[i].data().estado !== "CA") {
            let pedidoItem = documentos[i].data();
            pedidoItem.id = documentos[i].id;
            pedidos.push(pedidoItem);
          }
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoFechaTrans = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .where("formaPago", "==", "TRANSFERENCIA")
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          if (documentos[i].data().estado !== "CA") {
            let pedidoItem = documentos[i].data();
            pedidoItem.id = documentos[i].id;
            pedidos.push(pedidoItem);
          }
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoCombo = async (idPedido, fnRepintar) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidosCombo = [];
        for (let i = 0; i < documentos.length; i++) {
          let pedidoComboItem = documentos[i].data();
          pedidoComboItem.id = documentos[i].id;
          pedidosCombo.push(pedidoComboItem);
        }
        fnRepintar(pedidosCombo);
      });
  };

  obtenerProductos = async () => {
    let documentos = await global.db
      .collection("items")
      .where("estado", "==", "V")
      .orderBy("posicion")
      .get();
    let items = [];
    for (let i = 0; i < documentos.docs.length; i++) {
      let productoItem = documentos.docs[i].data();
      productoItem.id = documentos.docs[i].id;
      items.push(productoItem);
    }
    return items;
  };

  confirmarTransferencia = (idPedido, objeto, fnRepintar) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .update({
        asociado: objeto.asociado,
        estado: objeto.estado,
      })
      .then(function (coleccion) {
        console.log("coleccion", coleccion);
        fnRepintar(coleccion);
        Alert.alert("Información", "Cobro de Transferencia Confirmada");
      })
      .catch(function (error) {
        Alert.alert("Se ha Producido un Error", error);
      });
  };

  registrarEscuchaTodasFecha = (fecha, arreglo, fnRepintar, fnFinalizar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          if (change.doc.data().estado !== "CA") {
            let pedido = change.doc.data();
            pedido.id = change.doc.id;
            if (change.type == "added") {
              arregloUtil.agregar(pedido, fnRepintar);
            }
            if (change.type == "modified") {
              arregloUtil.actualizar(pedido, fnRepintar);
            }
            if (change.type == "removed") {
              arregloUtil.eliminar(pedido, fnRepintar);
            }
          }
        });
        fnFinalizar(snapShot.docChanges().length);
      });
  };

  registrarEscuchaPedidoCombo = (idPedido, arreglo, fnRepintar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          let pedidoItems = change.doc.data();
          pedidoItems.id = change.doc.id;
          if (change.type == "added") {
            arregloUtil.agregar(pedidoItems, fnRepintar);
          }
          if (change.type == "modified") {
            arregloUtil.actualizar(pedidoItems, fnRepintar);
          }
          if (change.type == "removed") {
            arregloUtil.eliminar(pedidoItems, fnRepintar);
          }
        });
      });
  };

  actualizarEmpacadoPC = (idPedido, objeto) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .doc(objeto.id)
      .update({
        empacado: objeto.empacado,
      })
      .then(function () {
        global.db
          .collection("pedidos")
          .doc(idPedido)
          .collection("combos")
          .where("empacado", "==", false)
          .get()
          .then(function (coleccion) {
            if (coleccion.docs.length == 0) {
              global.db
                .collection("pedidos")
                .doc(idPedido)
                .update({
                  empacado: true,
                })
                .then(function () {
                  Alert.alert(
                    "Información",
                    "Se ha empacado todos los productos para el Pedido"
                  );
                })
                .catch(function (error) {
                  Alert.alert("Se ha producido un Error", error);
                });
            } else {
              global.db
                .collection("pedidos")
                .doc(idPedido)
                .update({
                  empacado: false,
                })
                .then(function () {
                  console.log("Se actualizo a false el empcado del pedido");
                })
                .catch(function (error) {
                  Alert.alert("Se ha producido un Error", error);
                });
            }
          });
      })
      .catch(function (error) {
        Alert.alert("Se ha producido un Error", error);
      });
  };

  actualizarEmpacadoP = (idPedido) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .where("empacado", "==", false)
      .get()
      .then(function (coleccion) {
        if (coleccion.docs.length == 0) {
          global.db
            .collection("pedidos")
            .doc(idPedido)
            .update({
              empacado: true,
            })
            .then(function () {
              Alert.alert(
                "Información",
                "Se ha empacado todos los productos para el Pedido"
              );
            })
            .catch(function (error) {
              Alert.alert("Se ha producido un Error", error);
            });
        }
      });
  };

  registrarEscuchaPedidosTransf = (arreglo, fecha, fnRepintar, fnFinalizar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      // .where("formaPago", "==", "TRANSFERENCIA")
      .where("fechaEntrega", "==", fecha)
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          if (change.doc.data().estado !== "CA") {
            let pedido = change.doc.data();
            pedido.id = change.doc.id;
            if (change.type == "added") {
              arregloUtil.agregar(pedido, fnRepintar);
            }
            if (change.type == "modified") {
              arregloUtil.actualizar(pedido, fnRepintar);
            }
            if (change.type == "removed") {
              arregloUtil.eliminar(pedido, fnRepintar);
            }
          }
        });
        fnFinalizar();
      });
  };

  actualizarPedidoEstadoTransferencia = (idPedido, objeto) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .update({
        estado: objeto.estado,
      })
      .then(function () {
        Alert.alert(
          "Información",
          "Estado del Pedido Actualizado Exitosamente"
        );
      })
      .catch(function (error) {
        Alert.alert("error" + error);
      });
  };

  registrarEscuchaPedidosFac = (arreglo, fecha, fnRepintar, fnFinalizar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .where("factura", "==", true)
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          if (change.doc.data().estado !== "CA") {
            let pedido = change.doc.data();
            pedido.id = change.doc.id;
            if (change.type == "added") {
              arregloUtil.agregar(pedido, fnRepintar);
            }
            if (change.type == "modified") {
              arregloUtil.actualizar(pedido, fnRepintar);
            }
            if (change.type == "removed") {
              arregloUtil.eliminar(pedido, fnRepintar);
            }
          }
        });
        fnFinalizar();
      });
  };

  actualizarPedidoEstadoFactura = (idPedido, objeto) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .update({
        facturaEntregada: objeto.facturaEntregada,
      })
      .then(function () {
        Alert.alert(
          "Información",
          "Estado del Pedido Actualizado Exitosamente"
        );
      })
      .catch(function (error) {
        Alert.alert("error" + error);
      });
  };
}
