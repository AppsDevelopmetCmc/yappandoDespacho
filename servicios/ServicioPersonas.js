
import firebase from 'firebase'
import '@firebase/firestore';
import { ArregloUtil } from '../utils/utils';
import {Alert} from 'react-native';
import "@firebase/storage";


export class ServicioPersonas{
    constructor(){
        if (global.firebaseRegistrado != true) {
            firebase.initializeApp(global.firebaseConfig);
            global.db = firebase.firestore();
            global.firebaseRegistrado=true;
            global.storage = firebase.storage();

        }
    }
    crear=(persona)=>{
            global.db.collection("personas").
            doc(persona.id).
            set(persona).then(function () {
                Alert.alert("agregado")
            }).catch(function (error) {
                Alert.alert("error" + error)
            })
    }
    eliminar = (id) => {
        global.db.collection("personas").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
    actualizar=(objeto)=>{
        global.db.collection("personas").doc(objeto.id).update(
            {
                nombre: objeto.nombre,
                apellido: objeto.apellido,
                telefono: objeto.telefono
            }
        ).then(function () {
            Alert.alert("actualizado")
        }
        ).catch(function (error) {
            Alert.alert("error" + error)
        }
        );
    }
    registrarEscuchaTodas = (arreglo, fnRepintar) => {
        let arregloUtil=new ArregloUtil(arreglo);
        global.db.collection("personas").onSnapshot(
            function (snapShot) {
                snapShot.docChanges().forEach(
                    function (change) {
                        if (change.type == 'added') {
                            arregloUtil.agregar(change.doc.data(),fnRepintar);
                        }
                        if (change.type == 'modified') {
                            arregloUtil.actualizar(change.doc.data(),fnRepintar);
                        }
                        if (change.type == 'removed') {
                            arregloUtil.eliminar(change.doc.data(),fnRepintar);
                        }
                    }
                )

            }
        );
    }

}