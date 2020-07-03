import firebase from 'firebase';
import '@firebase/firestore';
import { ArregloUtil } from '../utils/utils';
import { Alert } from 'react-native';
import '@firebase/storage';

export class ServicioItemProductos {
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
   crear = item => {
      global.db
         .collection('items')
         .add(item)
         .then(function() {
            Alert.alert('Item creado');
         })
         .catch(function(error) {
            Alert.alert('error' + error);
         });
   };
   eliminar = id => {
      global.db
         .collection('items')
         .doc(id)
         .delete()
         .then(function() {
            Alert.alert('Item eliminado');
         })
         .catch(function(error) {
            Alert.alert('Error al Eliminar'+ error);
         });
   };
   actualizar = objeto => {
      global.db
         .collection('items')
         .doc(objeto.id)
         .update({
            cantidad: objeto.cantidad,
            estado:objeto.estado,
            imagen:objeto.imagen,
            nombre:objeto.nombre,
            posicion:objeto.posicion,
            precio:objeto.precio,
            unidad:objeto.unidad,
         })
         .then(function() {
            Alert.alert('Item actualizado');
         })
         .catch(function(error) {
            Alert.alert('error' + error);
         });
   };
   registrarEscuchaTodas = (arreglo, fnRepintar) => {
      let arregloUtil = new ArregloUtil(arreglo);
      global.db.collection('items').onSnapshot(function(snapShot) {
         snapShot.docChanges().forEach(function(change) {
            let item = change.doc.data();
            item.id =  change.doc.id;
            if (change.type == 'added') {
               arregloUtil.agregar(item, fnRepintar);
            }
            if (change.type == 'modified') {
               arregloUtil.actualizar(item, fnRepintar);
            }
            if (change.type == 'removed') {
               arregloUtil.eliminar(item, fnRepintar);
            }
         });
      });
   };
}
