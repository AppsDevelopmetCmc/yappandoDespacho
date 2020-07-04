import firebase from 'firebase';
import '@firebase/firestore';
import { ArregloUtil } from '../utils/utils';
import { Alert } from 'react-native';
import '@firebase/storage';

export class ServicioRepartidores {
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

   
   registrarEscuchaTodas = ( arreglo, fnRepintar) => {
      let arregloUtil = new ArregloUtil(arreglo);
      global
         .db
         .collection('repartidores')
         .onSnapshot(function (snapShot) {
            snapShot.docChanges().forEach(
               function (change) {
                     let repartidor = change.doc.data();
                     repartidor.id = change.doc.id;
                     if (change.type == 'added') {
                        arregloUtil.agregar(repartidor, fnRepintar);
                     }
                     if (change.type == 'modified') {
                        arregloUtil.actualizar(repartidor, fnRepintar);
                     }
                     if (change.type == 'removed') {
                        arregloUtil.eliminar(repartidor, fnRepintar);
                     }
               }
            );
         }
         );
   };
   actualizarRepartidorPedido=(idPedido,objeto)=>
   {
         global.db
            .collection('pedidos')
            .doc(idPedido)
            .update({
               asociado: objeto.asociado,
               nombreAsociado:objeto.nombreAsociado,
               telefonoAsociado:objeto.telefonoAsociado
            })
            .then(function() {
               Alert.alert('Información','Datos del asociado asignados correctamente');
            })
            .catch(function(error) {
               Alert.alert('error' + error);
            });
   }

  
}
