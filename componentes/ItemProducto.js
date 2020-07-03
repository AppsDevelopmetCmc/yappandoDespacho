import React, { Component } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import {recuperar} from '../componentes/ServicioImagen'

export class ItemProducto extends Component{

  

    render(){
    return  <View style={{flex: 8, flexDirection:'row', backgroundColor:'skyblue'} }>

            <TouchableHighlight onPress={()=>{this.props.fnActualizar(this.props.producto)}}>
              <View style={{flex:1, flexDirection:'row', backgroundColor:'pink'}}>
                  <Avatar rounded source={{uri:this.props.producto.imagen}}/>
             </View>
             </TouchableHighlight>
             <View style={{flex:6, flexDirection:'row'}}>
                <Text style={styles.container}> 
                  {this.props.producto.id }
                </Text>                
             </View>
             
             <View style={{flex:1, flexDirection:'row', backgroundColor:'pink'}}>
             <Button 
                  style={styles.button_item} //no pinta
                  title ="x"                  
                  onPress={()=>{this.props.fnEliminar(this.props.producto)}}>   
                            
              </Button>
             </View>

           </View>

           
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'skyblue',
      //backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding:10,
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
    fontSize: 10,
    alignItems: 'stretch',
    margin: 2,
    backgroundColor: 'yellow',
  },
});