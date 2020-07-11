import firebase from 'firebase';
import '@firebase/firestore';
import { ArregloUtil } from '../utils/utils';
import { Alert } from 'react-native';
import '@firebase/storage';

export class ServicioRepartidores {
   constructor() {
      if (global.firebaseRegistrado != true) {
         firebase.initializeApp(global.firebaseConfig);
         global.db = firebase.firestore();
         global.firebaseRegistrado = true;
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
               telefonoAsociado:objeto.telefonoAsociado,
               estado: objeto.estado
            })
            .then(function() {
               Alert.alert('Información','Datos del asociado asignados correctamente');
            })
            .catch(function(error) {
               Alert.alert('error' + error);
            });
   }

  
}
