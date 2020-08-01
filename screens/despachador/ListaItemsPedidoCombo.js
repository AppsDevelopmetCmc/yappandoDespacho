import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import { ServicioPedidos } from '../../servicios/ServicioPedidos';
import { ItemPedidoCombo } from './componentes/ItemPedidoCombo'
import * as colores from '../../componentes/constants/Colores';


export class ListaItemsPedidoCombo extends Component {
   constructor(props) {
      super(props);
      this.pedidoCombo = this.props.route.params.pedidoCombo;
      let lista = [];
      this.state = {
         fecha: '',
         listaItemsPedidos: lista,

      }
   }

   componentDidMount() {
      console.log("Ingresa")
      let pedidoCombos = [];
      let srvPedido = new ServicioPedidos();
      srvPedido.registrarEscuchaPedidoCombo(this.pedidoCombo.id, pedidoCombos, this.repintarLista)
   }

   repintarLista = (combos) => {
      console.log("ListaPedido", combos)
      this.setState({
         listaItemsPedidos: combos
      })
      this.despachando(combos);
   }

   despachando = (lista) => {
      let srvPedidos = new ServicioPedidos();
      let despacha = false;
      for (var i = 0; i < lista.length; i++) {
         if (lista[i].empacado == true) {
            despacha = true;
            break;
         }
      }
      srvPedidos.actualizarDespachando(this.pedidoCombo.id, despacha)

   }


   render() {
      return (
         <View style={{ flex: 1 }}>
            <View style={styles.cabecera}>
               <Text style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 10,
                  marginTop: 5,
                  alignSelf: 'center'
               }}>Detalle del Pedido</Text>
               <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.textoNegrita}>{'Pedido: '}</Text>
                  <Text>{this.pedidoCombo.orden.slice(-5)}</Text>
               </View>
               <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.textoNegrita}>{'Cliente: '}</Text>
                  <Text>{this.pedidoCombo.nombreCliente}</Text>
               </View>
               <View style={{ flexDirection: 'row', width:'72%'}}>
                  <Text style={styles.textoNegrita}>{'Observación: '}</Text>
                  <Text>{this.pedidoCombo.observacion}</Text>
               </View>
            </View>
            <View style={{ flex: 4 }}>


               <FlatList
                  style={{ height: '85%' }}
                  data={this.state.listaItemsPedidos}
                  renderItem={objeto => {
                     return (
                        <ItemPedidoCombo
                           pedidoComboItem={objeto.item}
                           idPedido={this.pedidoCombo.id}
                           empacadoPedido={this.pedidoCombo.empacado}

                           esYapa={false}
                        />
                     );
                  }}
                  keyExtractor={pedidoComboItem => {
                     return pedidoComboItem.id;
                  }}
                  ItemSeparatorComponent={flatListItemSeparator}
               />

            </View>

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
   container: {
      flex: 1,
      //backgroundColor: '#fff',
      backgroundColor: 'skyblue',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   headline: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 0,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
   },
   icon: {
      marginRight: 10,
   },
   texto: {
      fontSize: 13,
      textAlign: 'left',
      //fontWeight: 'bold',
      marginLeft: 10
   },
   textoNegrita: {
      fontSize: 15,
      textAlign: 'left',
      fontWeight: 'bold',
      marginLeft: 10
   },
   cabecera: {

      flex: 1,
      backgroundColor: colores.colorClaroPrimarioTomate,
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      marginLeft: 5,
      marginRight: 5
   },
});
