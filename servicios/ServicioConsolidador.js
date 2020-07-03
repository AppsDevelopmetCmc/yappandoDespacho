import firebase from 'firebase';
import '@firebase/firestore';
import { ArregloUtil } from '../utils/utils';
import { Alert } from 'react-native';
import '@firebase/storage';

export class ServicioConsolidador {
   constructor() {
      if (global.firebaseRegistered != true) {
         global.firebaseConfig = {
            apiKey: 'AIzaSyCuPTN-HQyPxrLUr40Bl2nmX5PqNCUVnJg',
            authDomain: 'little-market-dev-377b6.firebaseapp.com',
            databaseURL: 'https://little-market-dev-377b6.firebaseio.com',
            projectId: 'little-market-dev-377b6',
            storageBucket: 'little-market-dev-377b6.appspot.com',
            messagingSenderId: '549900659572',
            appId: '1:549900659572:web:ce8621915b320376469a21',
         };
         firebase.initializeApp(firebaseConfig);
         global.db = firebase.firestore();
         global.firebaseRegistered = true;
         global.storage = firebase.storage();
      }
   }

   crearConsolidado = (fecha, consolidado, items) => {
      global.db
         .collection('consolidados')
         .doc(fecha)
         .set(consolidado)
         .then(function (doc) {
            Alert.alert(
               'Confirmación',
               'Ya no se podra receptar más pedidos para la Fecha: ' + fecha
            );
            for (let i = 0; i < items.length; i++) {

               if (items[i].tipo) {
                  let separdorItem = items[i];
                  separdorItem.verificado = true;
                  global.db
                     .collection('consolidados')
                     .doc(fecha)
                     .collection('productos')
                     .doc(items[i].id)
                     .set(separdorItem);
               }
               else {
                  let totalItem = {};
                  totalItem.nombre = items[i].nombre;
                  totalItem.cantidadItem = items[i].cantidad;
                  totalItem.unidad = items[i].unidad;
                  totalItem.pedidos = items[i].cantidadTotal;
                  totalItem.total = items[i].totalProducto;
                  totalItem.verificado = false;
                  totalItem.id = items[i].id;
                  totalItem.posicion = items[i].posicion;

                  global.db
                     .collection('consolidados')
                     .doc(fecha)
                     .collection('productos')
                     .doc(items[i].id)
                     .set(totalItem);
               }
            }

         })
         .catch(function (error) {
            Alert.alert('Se ha Producido un error', error);
         });
   }

   registrarEscuchaTodas = (fecha, arreglo, fnRepintar, fnFinalizar) => {
      let arregloUtil = new ArregloUtil(arreglo);
      global
         .db
         .collection("consolidados")
         .doc(fecha)
         .collection('productos')
         .orderBy('posicion')
         .onSnapshot(
            function (snapShot) {
               snapShot.docChanges().forEach(
                  function (change) {
                     if (change.type == 'added') {
                        arregloUtil.agregar(change.doc.data(), fnRepintar);
                     }
                     if (change.type == 'modified') {
                        arregloUtil.actualizar(change.doc.data(), fnRepintar);
                     }
                     if (change.type == 'removed') {
                        arregloUtil.eliminar(change.doc.data(), fnRepintar);
                     }
                  }
               )
               fnFinalizar(snapShot.docChanges().length);
            }

         );
   }

   actualizarConsolidadorVerificar = (fecha, objeto) => {
      global
         .db
         .collection("consolidados")
         .doc(fecha)
         .collection('productos')
         .doc(objeto.id)
         .update({
            verificado: objeto.verificado
         })
         .then(function (doc) {
            Alert.alert('Información', 'Producto Acualizado');
         })
         .catch(function (error) {
            Alert.alert('Se ha producido un Error', error);
         });
   }

   buscarConsolidadorFecha = async (fecha) => {
      let dataFecha=await global
         .db
         .collection('consolidados')
         .doc(fecha)
         .get()
         console.log("aqui",dataFecha)

         return dataFecha
   }
}
