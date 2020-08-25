import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, CheckBox } from 'react-native-elements';
import { recuperar } from '../../../componentes/ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertir } from '../../../utils/ConvertidorUnidades'
import * as colores from '../../../componentes/constants/Colores'
import { ServicioPedidos } from '../../../servicios/ServicioPedidos'

export class ItemPedidoCombo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.pedidoComboItem.empacado,
    };

  }

  actualizarEmpacadaCombo = (empacado) => {
    let srvPedidos = new ServicioPedidos();
    srvPedidos.actualizarEmpacadoPC(this.props.idPedido, {
      id: this.props.pedidoComboItem.id,
      empacado: empacado,
    })

  }




  render() {
    return (
      <View style={
        this.props.pedidoComboItem.id == 'yapa'? styles.filaYapa: (this.state.checked ? styles.filaSeleccionada : styles.fila )
      }>
        <View style={{ flex: 2 }} >
          <Text style={styles.textoNegrita}>
            {this.props.pedidoComboItem.nombre}
          </Text>
          
            <Text style={styles.texto}>
              {convertir(this.props.pedidoComboItem.unidad, this.props.pedidoComboItem.cantidadItem)}
            </Text>
          

        </View>
        <View style={{
          flex: 1, fontWeight: 'bold',
          fontSize: 18,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 25,
          }}>
            {this.props.pedidoComboItem.cantidad}
          </Text>
        </View>
        
        <View style={{ flex: 1, marginRight: 20 }}>
          <CheckBox
            checked={this.state.checked}
            onPress={() => {
              this.actualizarEmpacadaCombo(!this.state.checked)

              this.setState({ checked: !this.state.checked });

            }}
            checkedColor={colores.colorOscuroPrimarioTomate}
            size={22}
            uncheckedColor={colores.colorOscuroPrimario}
          ></CheckBox>
        </View>
      </View>

    )
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
    borderRadius: 15,
    marginLeft: 10
  },
  filaYapa: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor:colores.colorOscuroPrimarioVerde
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