import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import { ServicioProductos } from '../servicios/ServicioProductos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { recuperar } from '../componentes/ServicioImagen';
import ActionButton from 'react-native-action-button';
import { ServicioPedidos } from '../servicios/ServicioPedidos';
import { ItemTotalPedido } from '../componentes/ItemTotalPedido'
import { Calendar } from 'react-native-calendars'
import DatePicker from 'react-native-datepicker'
import { formatearFechaISO } from '../utils/DateUtil'
import * as colores from '../componentes/constants/Colores'
import { ServicioConsolidador } from '../servicios/ServicioConsolidador'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Cargando from '../componentes/Cargando'


export class FormTotales extends Component {
   constructor(props) {
      super(props);
      let lista = [];
      this.state = {
         fecha: '',
         listaTotalesPedidos: lista,
         listaConsolidadoFecha: lista,
         validarFecha: '',
         date: new Date(),
         show: false,
         mostrarCargando: false,
         cargandoNombre: 'Cargando Productos...'
      }

   }

   componentDidMount() {
      console.log("Ingresa")
   }

   consultarPedidoFecha = async() => {
      let srvConsolidado = new ServicioConsolidador();
      let srvPedido = new ServicioPedidos();
      this.setState({ mostrarCargando: true, listaTotalesPedidos: [] });
      
      let dataFecha = await srvConsolidado.buscarConsolidadorFecha(formatearFechaISO(this.state.date))
      if (!dataFecha.data()) {
         console.log('calcula')
         await srvPedido.obtenerPedidoFechaTotal(formatearFechaISO(this.state.date), this.calcularTotales);
      } else {
         console.log('consulta')
         srvConsolidado.registrarEscuchaTodas(formatearFechaISO(this.state.date), [], this.pintarLista, this.finalizarCargando);
      }

   }
   pintarLista = (data) => {
     
      this.setState({
         listaTotalesPedidos: data
      })
   }
   finalizarCargando = (numeroCambios) => {
      console.log('Finalizando ');
      if (numeroCambios == 0) {
         Alert.alert("Información", 'No existen Pedidos para la fecha solicitada')
         this.setState({ listaTotalesPedidos: [] });
      }
      this.setState({ mostrarCargando: false });
   };

   calcularTotales = async (pedido) => {
      let srvConsolidado = new ServicioConsolidador();
      let productosTotales = [];
      if (pedido.length > 0) {
         let srvPedido = new ServicioPedidos();
         let productos = await srvPedido.obtenerProductos()
        
         for (let i = 0; i < productos.length; i++) {
            let productosItem = productos[i];
            let totalProducto = 0;
            let cantidadTotal = 0;
            let listaIdsPedidos = [];
            for (let j = 0; j < pedido.length; j++) {
                  for (let k = 0; k < pedido[j].listaCombos.length; k++) {
                     if ( pedido[j].listaCombos[k].id=='yapa' && productos[i].estado =='Y'){
                        if (productos[i].nombre == pedido[j].listaCombos[k].nombre) {
                           totalProducto = parseInt(totalProducto) + parseInt(pedido[j].listaCombos[k].cantidadItem * pedido[j].listaCombos[k].cantidad);
                           cantidadTotal = parseInt(cantidadTotal) + parseInt(pedido[j].listaCombos[k].cantidad);
                           listaIdsPedidos.push({orden: pedido[j].orden, cliente: pedido[j].nombreCliente})
                        }
                     } else{
                        if (productos[i].id == pedido[j].listaCombos[k].id) {
                           totalProducto = parseInt(totalProducto) + parseInt(pedido[j].listaCombos[k].cantidadItem * pedido[j].listaCombos[k].cantidad);
                           cantidadTotal = parseInt(cantidadTotal) + parseInt(pedido[j].listaCombos[k].cantidad);
                           listaIdsPedidos.push({orden: pedido[j].orden, cliente: pedido[j].nombreCliente})
                        }
                     }    
               }
            }
            if(productos[i].estado =='Y'){
               productosItem.nombre = 'YAPA '+ productosItem.nombre;
            }
            productosItem.totalConsolidado = parseInt(totalProducto);
            productosItem.totalDespachado = 0 ;
            productosItem.cantidadPedidos = parseInt(cantidadTotal);
            productosItem.listaIdsPedidos = listaIdsPedidos;
            productosTotales.push(productosItem);
         }  
         this.setState({
            listaConsolidadoFecha: productosTotales,
            listaTotalesPedidos: productosTotales
         })
      } else {
         Alert.alert("No Existen Pedidos para la Fecha");
      }
      this.setState({
         mostrarCargando: false
      })
      console.log("termina totalizar")
     /* srvConsolidado.crearConsolidado(formatearFechaISO(this.state.date), {actual: true},
      this.state.listaConsolidadoFecha); */
   }

   crearConsolidador = async () => {
      let srvConsolidado = new ServicioConsolidador();
      let srvPedido = new ServicioPedidos();
      console.log('fecha a buscar', formatearFechaISO(this.state.date));
      this.setState({ mostrarCargando: true, cargandoNombre: 'Totalizando Productos...' });
      
      await srvPedido.obtenerPedidoFechaTotal(formatearFechaISO(this.state.date), this.calcularTotales);

      if (this.state.listaConsolidadoFecha.length > 0) {
         console.log("crea consolidado")
         srvConsolidado.crearConsolidado(formatearFechaISO(this.state.date), {actual: true},
            this.state.listaConsolidadoFecha);
      } else if (this.state.listaConsolidadoFecha.length == 0) {
         Alert.alert("Información", "No existen Pedidos para la fecha solicitada")
      } 


   }

   onChange = (event, selectedDate) => {

      let currentDate = selectedDate || this.state.date;
      this.setState({ show: false })
      this.setState({ date: currentDate })
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
                                 {formatearFechaISO(this.state.date)}
                              </Text>
                           </View>

                        </View>

                     </TouchableHighlight>
                     {this.state.show && (
                        <DateTimePicker
                           value={this.state.date}
                           mode='date'
                           display="default"
                           onChange={this.onChange}
                        />)}   
                  </View>
                  <View style={styles.viewBtn}>
                     <View style={styles.btn}>
                        <Button title='Consultar' onPress={this.consultarPedidoFecha} ></Button>
                     </View>
                     <View style={styles.btn}>
                        <Button title='Cerrar Pedido' onPress={async() => {
                           let srvConsolidado = new ServicioConsolidador();
                           let dataFecha = await srvConsolidado.buscarConsolidadorFecha(formatearFechaISO(this.state.date))
                           if (!dataFecha.data()) {
                              console.log('no hay datos')
                                 Alert.alert(
                                    'Confirmación',
                                    'Ya no se receptaran más pedidos para la fecha: ' + formatearFechaISO(this.state.date),
                                    [
                                       {
                                          text: "Cancelar",
                                          onPress: () => { console.log("Cancel Pressed") },
                                          style: "cancel"
                                       },
                                       {
                                          text: 'Aceptar',
                                          onPress: () => {
                                             this.crearConsolidador()
                                          },
                                       },
                                    ],
                                    { cancelable: false }
                                 );
                           } else {
                              console.log('si hay datos')
                              Alert.alert("No se puede realizar el cierre",
                                 "Ya existe un cierre para la Fecha:" + formatearFechaISO(this.state.date))
                           }
                        }}></Button>
                     </View>
                  </View>
                  <Cargando
                     text={this.state.cargandoNombre}
                     isVisible={this.state.mostrarCargando}
                  ></Cargando>
               </View>
            </View>
            <View style={styles.pie}>
               <View style={styles.titulo}>
                  <Text style={styles.textoNegrita}>{'Consolidador De Pedidos'}</Text>
               </View>
               <View style={styles.lista}>
               <FlatList
                  data={this.state.listaTotalesPedidos}
                  renderItem={objeto => {
                     return (
                        <ItemTotalPedido
                           pedido={objeto.item}
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
