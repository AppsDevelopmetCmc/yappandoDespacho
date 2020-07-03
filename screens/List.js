import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import firebase from 'firebase'
import '@firebase/firestore';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import { ServicioPersonas } from '../servicios/ServicioPersonas';



let dbh = null;
export class List extends Component {
    constructor() {
        super();
        let personas=[];
        this.state = {
            listPersonas: personas
        }
        let srvPersonas = new ServicioPersonas(); 
        srvPersonas.registrarEscuchaTodas(personas, this.repintarLista);
    }

    
    repintarLista = (obj) => {
        this.setState({
            listPersonas: obj
        })
    }
    
    render() {
        return <View style={styles.container}>
            <Text>LISTA DE PERSONAS</Text>
            <FlatList
                data={this.state.listPersonas}
                renderItem={({ item }) => {
                    return <View>
                    <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate("FormScreen",
                            {
                                origen: "actualizar",
                                persona: {
                                    nombre: item.nombre,
                                    apellido: item.apellido,
                                    telefono: item.telefono,
                                    id: item.id
                                }
                            })
                    }}>
                        <View>
                            <Text>{item.nombre} {item.apellido}</Text>
                            <Text>{item.telefono}</Text>
                            </View>
                    </TouchableHighlight>
                            <Button
                                title="Eliminar"
                                onPress={() => {
                                    let servPersonas=new ServicioPersonas();
                                    servPersonas.eliminar(item.id);
                                }}
                            />
                     </View>

                }}
            />
            <ActionButton
                onPress={() => { this.props.navigation.navigate("FormScreen", { origen: "nuevo" }) }}
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
});
