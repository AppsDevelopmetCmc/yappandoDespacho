import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { ServicioItemProductos } from '../servicios/ServicioItemProductos';
import { ItemListaProducto } from '../componentes/ItemListaProducto';
import ActionButton from 'react-native-action-button';


export class ListaItemProduct extends Component {

    constructor() {
        super();
        let itemProductos = [];
        this.state = {
            listaItemProductos: itemProductos
        }
        let srvItemProductos = new ServicioItemProductos();
        srvItemProductos.registrarEscuchaTodas(itemProductos, this.repintarLista);
    }


    repintarLista = (itemProductos) => {
        this.setState({
            listaItemProductos: itemProductos
        })
    }

    eliminar = (itemProducto) => {
        let srvItemProductos = new ServicioItemProductos();
        srvItemProductos.eliminar(
            itemProducto.id
        );

    }
    actualizar = (itemProducto) => {
        this.props.navigation.navigate("FormItemProductoScreen",
            {
                origen: "actualizar",
                itemProducto: itemProducto
            }

        )

    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.headline} >Lista de Productos </Text>
            <FlatList

                data={this.state.listaItemProductos}
                renderItem={(objeto) => {
                    return <ItemListaProducto ItemProducto={objeto.item}
                        fnEliminar={this.eliminar}
                        fnActualizar={this.actualizar}
                    />
                }}
                keyExtractor={(objetoItemProducto) => { return objetoItemProducto.id }}
            />
            <ActionButton
                onPress={() => { this.props.navigation.navigate("FormItemProductoScreen", { origen: "nuevo" }) }}
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
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});