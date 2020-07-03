import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertir } from '../../../utils/ConvertidorUnidades'
import * as colores from '../../../componentes/constants/Colores'
import { ServicioConsolidador } from '../../../servicios/ServicioConsolidador'

export class ItemDisponibilidadPedido extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.pedido.verificado,
      /*checkedProps: this.props.combo.checked,*/
    };
    console.log('--------CHECKED', this.props.pedido.verificado);
  }

  actualizarVerificarProducto = (estadoVerificado) => {
    let srvConsolidador = new ServicioConsolidador();
    srvConsolidador.actualizarConsolidadorVerificar(
      this.props.fecha,
      {
        id: this.props.pedido.id,
        verificado:estadoVerificado
      }
    );

  }

  render() {
    return <View >
      {this.props.pedido.tipo == 'S' ? (
        <View
          style={{
            backgroundColor: colores.colorPrimarioTomate,
            alignItems: 'center',
            paddingVertical: 15,
            borderTopStartRadius: 30,

            //marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {this.props.pedido.nombre}
          </Text>
        </View>
      ) : (
          <View style={
            this.state.checked ? styles.filaSeleccionada : styles.fila
          }>
            <View style={{ flex: 2 }}>
              <Text style={styles.textoNegrita}>
                {this.props.pedido.nombre}
              </Text>
              <Text style={styles.texto}>
                {convertir(this.props.pedido.unidad, this.props.pedido.cantidadItem)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textoNegrita}>
                {"Pedidos "}
              </Text>
              <Text style={styles.texto}>
                {this.props.pedido.pedidos}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <CheckBox
                checked={this.state.checked}
                onPress={() => {
                    if(!this.state.checked)
                    {
                    this.actualizarVerificarProducto(true)
                    }else{
                      this.actualizarVerificarProducto(false)
                    }


                  this.setState({ checked: !this.state.checked });
                }}
                checkedColor={colores.colorOscuroPrimarioTomate}
                size={22}
                uncheckedColor={colores.colorOscuroPrimario}
              ></CheckBox>
            </View>
          </View>
        )}
    </View>


  }
}

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: '100%',
  },
  subContenido: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    //backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button_item: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginVertical: 5,
    marginRight: 2,
  },
  fila: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  touch: {
    flex: 3,
  },
  contenedorDescripcion: { flex: 1 },
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
  contenedorEliminar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  estiloBotonEliminar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginVertical: 5,
    marginRight: 2,
  },
  filaSeleccionada: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    marginTop: 2,
    marginLeft: 15,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
});