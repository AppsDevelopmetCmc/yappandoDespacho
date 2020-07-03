import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import { Input } from 'react-native-elements';
import { ServicioPersonas } from '../servicios/ServicioPersonas';


export class Form extends Component {
    constructor(props) {
        super(props);
        this.origen = this.props.route.params.origen;
        this.persona = this.props.route.params.persona;
        if (this.persona != null) {
            this.state = {
                id: this.persona.id,
                nombre: this.persona.nombre,
                apellido: this.persona.apellido,
                telefono: this.persona.telefono
            }
        } else {
            this.state = {
                id: '',
                nombre: '',
                apellido: '',
                telefono: ''
            }
        }
    }


    render() {
        return <View>
            <Input
                value={this.state.id}
                placeholder="Correo"
                label="Correo"
                onChangeText={(text) => { this.setState({ id: text }) }}
            />
            <Input
                value={this.state.nombre}
                placeholder="Nombre"
                label="Nombre"
                onChangeText={(text) => { this.setState({ nombre: text }) }}
            />
            <Input
                value={this.state.apellido}
                placeholder="Apellido"
                label="Apellido"
                onChangeText={(text) => { this.setState({ apellido: text }) }}
            />
            <Input
                value={this.state.telefono}
                placeholder="Telefono"
                label="Telefono"
                onChangeText={(text) => { this.setState({ telefono: text }) }}
            />
            <Button
                title="Guardar"
                onPress={() => {
                    let servPersonas=new ServicioPersonas();
                    servPersonas.crear({
                        id: this.state.id,
                        nombre: this.state.nombre,
                        apellido: this.state.apellido,
                        telefono: this.state.telefono
                    });
                    this.props.navigation.goBack()
                }}
            />

            <Button
                title="Actualizar"
                onPress={() => {
                    let servPersonas=new ServicioPersonas();
                    servPersonas.actualizar({
                        id: this.state.id,
                        nombre: this.state.nombre,
                        apellido: this.state.apellido,
                        telefono: this.state.telefono
                    });
                    this.props.navigation.goBack()
                }

                }
            />
        </View>
    }
}