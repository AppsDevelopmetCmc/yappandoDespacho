import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import * as colores from '../../componentes/constants/Colores'
import DatePicker from 'react-native-datepicker';
import { formatearFechaISO } from '../../utils/DateUtil';
import { ServicioConsolidador } from '../../servicios/ServicioConsolidador'
import { ItemDisponibilidadPedido } from '../disponibilidad/componentes/ItemDisponibilidadPedido'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cargando from '../../componentes/Cargando'
import { ItemRepartidor } from './componentes/ItemRepartidor'
import { ServicioRepartidores } from '../../servicios/ServicioRepartidores'


export class ListaRepartidores extends Component {
   constructor(props) {
      super(props);
      this.pedido = this.props.route.params.pedido;
      let lista = [];
      this.state = {
         listaRepartidores: lista,

      }

   }

   componentDidMount() {
      console.log("Ingresa a lista repartidores")
      let listaRepartidor = [];
      let srvRepartidor = new ServicioRepartidores();
      srvRepartidor.registrarEscuchaTodas(
         listaRepartidor, this.repintarLista);


   }


   repintarLista = (repartidores) => {
      console.log("ListaRepartidor", repartidores)
      this.setState({
         listaRepartidores: repartidores
      })
   }

   actualizarRepartidorPedido = (repartidor) => {
      console.log('idPedido',this.pedido.id)
      console.log('repartidor',repartidor)
       let srvRepartidor = new ServicioRepartidores();
      srvRepartidor.actualizarRepartidorPedido(this.pedido.id,
         {
            asociado: repartidor.correo,
            nombreAsociado: repartidor.nombre,
            telefonoAsociado: repartidor.telefono
         });

         this.props.navigation.goBack();
   }



   render() {
      return (
         <View style={styles.columna}>
            <View style={styles.date}>
            <View style={styles.subContenido}>
                <View >
                  <Text style={styles.textoNegrita}>
                    {'Nombre:'}
                  </Text>
                </View>
                <View >
                  <Text style={styles.texto}>
                    {this.pedido.nombreCliente}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View >
                  <Text style={styles.textoNegrita}>
                    {'Factura:'}
                  </Text>
                </View>
                <View >
                  <Text style={styles.texto}>
                    {this.pedido.orden}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.pie}>
               <View style={styles.titulo}>
                  <Text style={styles.textoNegrita}>{'Lista Repartidores'}</Text>
               </View>
               <View style={styles.lista}>
                  <FlatList
                     data={this.state.listaRepartidores}
                     renderItem={objeto => {
                        return (
                           <ItemRepartidor
                              repartidor={objeto.item}
                              fnActualizarRepartidor={this.actualizarRepartidorPedido}
                           />
                        );
                     }}
                     keyExtractor={objetoPedido => {
                        return objetoPedido.id;
                     }}
                     ItemSeparatorComponent={flatListItemSeparator}
                  />
               </View>

            </View >
         </View>
      );
   }
}

const flatListItemSeparator = () => {
   return (
      <View
         style={{
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
         }}
      >
         <View
            style={{
               height: 0.5,
               width: '100%',
               backgroundColor: colores.colorOscuroTexto,

               alignItems: 'center',
               justifyContent: 'center',
               alignContent: 'center',
            }}
         ></View>
      </View>
   );
};

const styles = StyleSheet.create({
   titulo: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: colores.colorClaroPrimarioTomate,
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      marginLeft: 5,
      marginRight: 5
   },
   container: {
      flex: 1,
      //backgroundColor: '#fff',
      backgroundColor: 'skyblue',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   columna: {
      flex: 1,
      backgroundColor: colores.colorBlanco,
      marginTop: 30,
      borderRadius: 15,
   },
   fila: {
      flexDirection: 'row'
   },
   date: {
      flex: 1

   },
   datePicker: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center'

   },
   lista: {
      flex: 12,
      paddingVertical: 15,
      marginLeft: 10,
      borderTopStartRadius: 30,
   },
   viewBtn: {
      flex: 1,
      justifyContent: 'center'
   },
   btn: {
      marginTop: 10,

   },

   textoNegrita: {
      marginTop: 0,
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 17,
   },
   texto: {
      fontSize: 15,
      marginTop: 0,
      marginLeft: 10,
   },
   textoNegritaSubrayado: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 0,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
   pie: {
      flex: 6,
      backgroundColor: colores.colorBlanco,
      borderTopStartRadius: 30,
      marginTop: 15,
      paddingTop: 20,
   },

   icon: {
      marginRight: 10,
   },
   contenedorFecha: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"

   },
   borderFecha: {
      flex: 3,
      borderWidth: 1,
      alignItems: 'center'
   },
   txtFecha: {
      marginTop: 5,
      marginBottom: 5
   },
   contenedorIcon: {
      flex: 1
   },
   subContenido: {
      marginTop: 5,
      flexDirection: 'row',
  
    },
   
});

