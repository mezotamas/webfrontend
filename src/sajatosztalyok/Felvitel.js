import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View,  TouchableOpacity, TextInput, Button, Menu} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const IP=require("./Ipcim")

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        bevitel1:"",
        bevitel2:"",
        bevitel3:"",
        bevitel4:"",
        valaszto:1,
        dataSource:[]
    }
    
  }

  
  componentDidMount(){
    return fetch(IP.ipcim+"kategoria")
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  felvitel=()=>{
      //alert("Hello")
      var bemenet={
        bevitel1:this.state.bevitel1,
        bevitel2:this.state.bevitel2,
        bevitel3:this.state.bevitel3,
        bevitel4:this.state.valaszto
      }
      

  
    fetch(IP.ipcim+"felvitel", {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    
    )
    .then(x => x.json())
    .then(y => {
      (JSON.stringify (y))
      this.setState({dataSource: y})
    }
      
      );
  
  }
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }


    return(
      <View style={{flex: 1, paddingTop:20}}>
        {/*---------------------------------------------------kereses */}
        <Text style={{marginLeft:10, marginTop:10, marginRight:10, marginBottom:10, fontSize:20}}>Bibliai ige:</Text>
        <TextInput
        style={{height: 40,marginLeft:10,marginRight:10}}
        placeholder="Ige szövege"
        onChangeText={(beirtszoveg)=>this.setState({bevitel1:beirtszoveg})}
        value={this.state.bevitel1}
      />
       
       <TextInput
        style={{height: 40,marginLeft:10,marginRight:10}}
        placeholder="Könyv"
        onChangeText={(beirtszoveg)=>this.setState({bevitel2:beirtszoveg})}
        value={this.state.bevitel2}
      />
       <TextInput
        style={{height: 40,marginLeft:10,marginRight:10}}
        placeholder="Fejezet és vers"
        onChangeText={(beirtszoveg)=>this.setState({bevitel3:beirtszoveg})}
        value={this.state.bevitel3}
      />
      <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.valaszto}
                onValueChange={(ertek) => 
this.setState({valaszto:ertek})


              }>
                  {this.state.dataSource.map(item=>

                <Picker.Item label={item.kategoria_nev} value={item.kategoria_id} />
          )}

              </Picker>
    
        <TouchableOpacity style={{marginTop:10}}
        
        onPress={()=>this.felvitel()}
      >
        <Text style={{textAlign:"center",color:"white",fontWeight:"bold",fontSize:15,marginLeft:10,marginRight:10, backgroundColor:"blue"}}  >Felvitel</Text>
      </TouchableOpacity>

        {/*---------------------------------------------------talalatok */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
     marginTop:10
  }
});