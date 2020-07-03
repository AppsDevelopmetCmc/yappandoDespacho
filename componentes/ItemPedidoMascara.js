import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ServicioPedidos } from '../servicios/ServicioPedidos'

export class ItemPedidoMascara extends Component {
  constructor(props) {
    super(props);
    this.pintarBoton = true;
    this.state = {
      repintar:'',

   };
      
  }

  componentDidMount() {
    console.log("Ingresa")
  }

  actualizarConfirmacionTrans = () => {
     let srvPedidos = new ServicioPedidos();
     srvPedidos.actualizarConfirmacionTrans(this.props.cobrosPedido.id,
       {
         asociado: 'zantycb89@gmail.com',
         estado: 'CT'
 
       },this.repintar)


  }
  repintar=(objeto)=>
  {
    console.log('objeto',objeto)
    this.props.cobrosPedido.estado='CT'
    this.setState({repintar:''});
  }


  render() {

    this.pintarBoton = (this.props.cobrosPedido.estado !== 'CT')?true:false;
    console.log("NombreCliente",this.props.cobrosPedido.nombreCliente)
    console.log("estado",this.props.cobrosPedido.estado)
    console.log("pintarBoton",this.pintarBoton)
    return <View style={styles.fila}>

      <View style={{ flex: 1 }}>
        <Text style={styles.textoNegrita}>
          {this.props.cobrosPedido.nombreCliente}
        </Text>
        <Text style={styles.texto}>
          {this.props.cobrosPedido.formaPago}
        </Text>
        <Text style={styles.texto}>
          {this.props.cobrosPedido.orden}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textoNegrita}>
            {'Total:'}
          </Text>
          <Text style={styles.texto}>
            {parseFloat(this.props.cobrosPedido.total - this.props.cobrosPedido.descuento).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.textoNegrita}>
          {(this.pintarBoton) ? "NO CONFIRMADO" : "CONFIRMADO"}
          
        </Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.textoNegrita}>
          {'Telf: '}
        </Text>
        <Text style={styles.texto}>
          {this.props.cobrosPedido.telefono}
        </Text>
        </View>
        {this.pintarBoton && (
          <Button
            type="clear"
            icon={
              <Icon
                name="check-circle"
                size={35}
                color="white"
              />
            }
            onPress={this.actualizarConfirmacionTrans}

          />
        )}
      </View>

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
    backgroundColor: 'orange',
    marginTop: 5,
    borderRadius: 15,
    marginLeft: 10
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
});