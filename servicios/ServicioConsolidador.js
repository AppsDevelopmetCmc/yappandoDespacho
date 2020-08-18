import firebase from "firebase";
import "@firebase/firestore";
import { ArregloUtil } from "../utils/utils";
import { Alert } from "react-native";
import "@firebase/storage";

export class ServicioConsolidador {
  constructor() {
    if (global.firebaseRegistrado != true) {
      firebase.initializeApp(global.firebaseConfig);
      global.db = firebase.firestore();
      global.firebaseRegistrado = true;
      global.storage = firebase.storage();
    }
  }

  crearConsolidado = (fecha, consolidado, items) => {
    Alert.alert(
      "Confirmación",
      "Ya no se podrá receptar más pedidos para la Fecha: " + fecha
    );
    global.db
      .collection("consolidados")
      .doc(fecha)
      .set(consolidado)
      .then(() => {
        for (let i = 0; i < items.length; i++) {
          const itemConsolidado = {
            id: items[i].id,
            nombre: items[i].nombre,
            totalConsolidado: items[i].totalConsolidado,
            totalDespachado: items[i].totalDespachado,
            cantidadPedidos: items[i].cantidadPedidos,
            cantidad: items[i].cantidad,
            unidad: items[i].unidad,
          };
          const listaIds = items[i].listaIdsPedidos;

          global.db
            .collection("consolidados")
            .doc(fecha)
            .collection("productos")
            .doc(items[i].id)
            .set(itemConsolidado)
            .then(function () {
              listaIds.forEach((element) => {
                global.db
                  .collection("consolidados")
                  .doc(fecha)
                  .collection("productos")
                  .doc(items[i].id)
                  .collection("pedidos")
                  .doc(element.orden)
                  .set(element);
              });
            })
            .catch(function (error) {
              Alert.alert("Se ha Producido un error", error);
            });
        }
      });
  };

  registrarEscuchaTodas = (fecha, arreglo, fnRepintar, fnFinalizar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("consolidados")
      .doc(fecha)
      .collection("productos")
      .orderBy("nombre")
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          if (change.type == "added") {
            arregloUtil.agregar(change.doc.data(), fnRepintar);
          }
          if (change.type == "modified") {
            arregloUtil.actualizar(change.doc.data(), fnRepintar);
          }
          if (change.type == "removed") {
            arregloUtil.eliminar(change.doc.data(), fnRepintar);
          }
        });
        fnFinalizar(snapShot.docChanges().length);
      });
  };

  actualizarConsolidadorVerificar = (fecha, objeto) => {
    global.db
      .collection("consolidados")
      .doc(fecha)
      .collection("productos")
      .doc(objeto.id)
      .update({
        verificado: objeto.verificado,
      })
      .then(function (doc) {
        Alert.alert("Información", "Producto Acualizado");
      })
      .catch(function (error) {
        Alert.alert("Se ha producido un Error", error);
      });
  };

  buscarConsolidadorFecha = async (fecha) => {
    let dataFecha = await global.db.collection("consolidados").doc(fecha).get();
    return dataFecha;
  };
}
