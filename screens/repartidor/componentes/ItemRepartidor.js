import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertir } from '../../../utils/ConvertidorUnidades'
import * as colores from '../../../componentes/constants/Colores'
import { ServicioConsolidador } from '../../../servicios/ServicioConsolidador'

export class ItemRepartidor extends Component {

  render() {
    return <View style={styles.fila}>
      <View style={styles.touch}>
        <TouchableHighlight onPress={() => { this.props.fnActualizarRepartidor(this.props.repartidor) }}>
          <View style={styles.contenedorDescripcion}>
            <View style={styles.contenedorPedido}>
              <View style={styles.subContenido}>
                <View >
                  <Text style={styles.textoNegrita}>
                    {'Nombre:'}
                  </Text>
                </View>
                <View >
                  <Text style={styles.texto}>
                    {this.props.repartidor.nombre}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View >
                  <Text style={styles.textoNegrita}>
                    {'correo:'}
                  </Text>
                </View>
                <View >
                  <Text style={styles.texto}>
                    {this.props.repartidor.correo}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View >
                  <Text style={styles.textoNegrita}>
                    {'telefono:'}
                  </Text>
                </View>
                <View >
                  <Text style={styles.texto}>
                    {this.props.repartidor.telefono}
                  </Text>
                </View>
              </View>
            </View>
            {/*           <View style={styles.contenedorRepartidor}>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'telefono:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.repartidor.telefono}
                </Text>
              </View>
            </View>
          </View> */}
          </View>
          {/*         <View style={{ flex: 1, marginBottom: 5, flexDirection: 'row' }}>
          {
            this.props.pedido.estado == 'TA' ? false : true && (
              <View style={{ marginRight: 10 }}>
                <Button
                  style={{ marginRight: 10 }}
                  title='Tranferencia Recibida'
                  onPress={() => { this.props.fnActualizar(this.props.pedido) }}
                />
              </View>
            )
          }
          <View style={{ marginLeft: 10 }}>
            <Button
              title='Asignar Repartidor'
              onPress={() => { Alert.alert("Aqui") }}
            />
          </View>

        </View> */}
        </TouchableHighlight>
      </View>
    </View>


  }
}

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    //backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  fila: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,

  },
  touch: {
    flex: 2,
  },
  contenedorPedido: {
    flex: 2,
  },
  contenedorRepartidor: {
    flex: 3,
  },

  contenedorDescripcion: {
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15
  },
  subContenido: {
    marginTop: 5,
    flexDirection: 'row',

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
  filaSeleccionada: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,

  },

});