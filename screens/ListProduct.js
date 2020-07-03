import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { ServicioProductos } from '../servicios/ServicioProductos';
import {ItemProducto} from '../componentes/ItemProducto';
import ActionButton from 'react-native-action-button';


export class ListProduct extends Component{
    
    constructor(){
    super();
    let productos=[];
  this.state={
      listProductos: productos
  }
  let srvProductos=new ServicioProductos();
        srvProductos.registrarEscuchaTodas(productos, this.repintarLista);
    }


    repintarLista = (productos) => {
        this.setState({
            listProductos: productos
        })
    }

    eliminar=(producto)=>{
        let servProductos = new ServicioProductos();
                    servProductos.eliminar(
                         producto.id
                    );

    }
    actualizar=(producto1)=>{
        this.props.navigation.navigate("ProductosScreen",
                            {
                                origen: "actualizar",
                                producto: {
                                    id: producto1.id,
                                    imagen: producto1.imagen

                                }
                            })
    }

    render(){
        return <View style={styles.container}> 
            <Text style={styles.headline} >Lista de Productos </Text>
            <FlatList
                
                data = {this.state.listProductos}
                renderItem = {(objeto)=>{return <ItemProducto producto={objeto.item}
                                                              fnEliminar={this.eliminar}
                                                              fnActualizar={this.actualizar}
                />}}
                keyExtractor = {(objetoProducto)=>{return objetoProducto.id}}
            />
        <ActionButton
            onPress={() => { this.props.navigation.navigate("ProductosScreen",{ origen: "nuevo" }) }}
          />
        </View> 

        
    }

   

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
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
});