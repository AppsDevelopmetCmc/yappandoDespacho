import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import { ServicioPedidos } from '../../servicios/ServicioPedidos';
import {ItemCFacturas} from '../facturas/componentes/ItemCFacturas'
import  * as colores from '../../componentes/constants/Colores'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { formatearFechaISO } from '../../utils/DateUtil';
import Cargando from '../../componentes/Cargando'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export class FormCFacturas extends Component {
   constructor(props) {
      super(props);
      let lista = [];
      this.state = {
         listaPedidosFacturas: lista,
         fecha: new Date(),
         show: false,
         mostrarCargando: false,


      }

   }

   componentDidMount() {
      console.log("Ingresa Facturas")

   }

   repintarLista = (pedidoFacturas) => {
      console.log('pedidos Facturas', pedidoFacturas)
      this.setState({
         listaPedidosFacturas: pedidoFacturas
      })
   }
   actualizarEstadoPedidoFactura=(pedido)=>
   {
      let srvPedido = new ServicioPedidos();
      srvPedido.actualizarPedidoEstadoFactura(pedido.id,{
         facturaEntregada:true
      });

   }
   consultarFechaPedidoFac = () => {
       this.setState({ mostrarCargando: true });
      let arreglo = [];
      let srvPedido = new ServicioPedidos();
      srvPedido.registrarEscuchaPedidosFac(arreglo,formatearFechaISO(this.state.fecha), this.repintarLista,this.finalizar);
    }

    finalizar=()=>{
      this.setState({ mostrarCargando: false });
   }
   onChange = (event, selectedDate) => {

      let currentDate = selectedDate || this.state.fecha;
      this.setState({ show: false })
      this.setState({ fecha: currentDate })
   };

   showDatepicker = () => {
      this.setState({ show: true })
   };


   render() {
      return (
         <View style={styles.columna}>
         <View style={styles.date}>
            <View style={styles.fila}>
               <View style={styles.datePicker}>
                  <Text style={styles.textoNegrita}>
                     {'Seleccione la Fecha'}
                  </Text>
                  <TouchableHighlight onPress={() => {
                     this.showDatepicker();
                  }}>
                     <View style={styles.contenedorFecha}>
                        <View style={styles.contenedorIcon}>
                           <Icon
                              name="calendar-month-outline"
                              size={27}
                              color="orange"
                              style={styles.icon}
                           />
                        </View>
                        <View style={styles.borderFecha}>
                           <Text style={styles.txtFecha}>
                              {formatearFechaISO(this.state.fecha)}
                           </Text>
                        </View>

                     </View>

                  </TouchableHighlight>
                  {this.state.show && (
                     <DateTimePicker
                        value={this.state.fecha}
                        mode='date'
                        display="default"
                        onChange={this.onChange}
                     />)}
                  {/*  <DatePicker

                     date={this.state.fecha}
                     mode="date"
                     placeholder="Seleccione la Fecha"
                     format="YYYY-MM-DD"
                     minDate="2016-05-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                        dateIcon: {
                           position: 'absolute',
                           left: 0,
                           top: 4,
                           marginLeft: 0
                        },
                        dateInput: {
                           marginLeft: 36
                        }

                     }}
                     onDateChange={(date) => { this.setState({ fecha: date }) }}
                  /> */}
               </View>
               <View style={styles.viewBtn}>
                  <View style={styles.btn}>
                     <Button title="Consultar" onPress={this.consultarFechaPedidoFac} />
                  </View>

               </View>
               <Cargando
                  text="Buscando Facturas..."
                  isVisible={this.state.mostrarCargando}
               ></Cargando>
            </View>
         </View>
            <View style={styles.pie}>
               <View style={styles.titulo}>
                  <Text style={styles.textoNegrita}>{'Facturas Entregadas'}</Text>
               </View>
               <View style={styles.lista}>
               <FlatList
                  data={this.state.listaPedidosFacturas}
                  renderItem={objeto => {
                     return (
                        <ItemCFacturas
                           pedido={objeto.item}
                           fnActualizar={this.actualizarEstadoPedidoFactura}
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
   pie: {
      flex: 6,
      backgroundColor: colores.colorBlanco,
      borderTopStartRadius: 30,
      marginTop: 15,
      paddingTop: 20,
   },
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
      flex: 1
   },
   btn: {
      marginTop: 10
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
   }
});
