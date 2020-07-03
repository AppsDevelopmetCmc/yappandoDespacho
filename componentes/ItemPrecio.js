import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button} from 'react-native';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';


export class ItemPrecio extends Component{

  
    render(){
    return  <View style={{flex: 1, flexDirection:'row', backgroundColor:'green',alignItems: 'stretch'} }>
        <View style={{flex:7,alignItems:'stretch',backgroundColor:'blue'}}>

        <TouchableHighlight onPress={()=>{this.props.fnActualizar(this.props.precio)}}>
            
        <View style={{flex:1, flexDirection:'row', backgroundColor:'pink',justifyContent:'center'}}>
                <Text > {this.props.precio.cantidad}</Text>
                <Text > {this.props.precio.unidad }</Text>
                <Text > $ {this.props.precio.precio }</Text>
        </View>
        </TouchableHighlight>
        </View>
        <View style={{flex:1}}>
            <Button                   
                  title ="x"                  
                  onPress={()=>{this.props.fnEliminarPrecio(this.props.precio.id)}}
                 //Alert.alert("Eliminado")
                
                  
            />
        </View>    
       </View>          
    }
}