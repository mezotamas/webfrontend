import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View,  TouchableOpacity, TextInput, Button, Menu } from 'react-native';

const IP=require("./Ipcim")
export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        
        dataSource:[],
        dataSource2:[],
        dataSource3:[]
    }
  }

  
  

  componentDidMount(){
     fetch(IP.ipcim+"statisztika1" )
    
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
      
      fetch(IP.ipcim+"statisztika2" )
    
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
      fetch(IP.ipcim+"statisztika3" )
    
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource3: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
      
      
  }
  frissit=()=>{
    
    
    
    fetch(IP.ipcim+"statisztika1" )
    
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
    
    fetch(IP.ipcim+"statisztika2" )
  
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource2: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
    
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

      <View style={{ paddingBottom:20 , paddingTop:20,borderWidth:2,borderColor:"blue", borderRadius:7, marginLeft:10, marginRight:10, marginTop:1}}>
        {/*---------------------------------------------------kereses */}
        <TouchableOpacity
           style={styles.kekgomb}
           onPress={async ()=>this.frissit()}
         >
           <Text style={{color:"white", fontWeight:"bold",fontSize:15}}  >Frissítés</Text>
         </TouchableOpacity>
        <FlatList
        
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
           <Text style={{marginLeft:10, marginTop:10, marginRight:10, marginBottom:10, fontSize:20}}>Összes idézet: {item.idezetek_szama}</Text>
  
          </View> 
        
        }

          keyExtractor={({film_id}, index) => film_id}
        />
           <FlatList
        
        data={this.state.dataSource2}
        renderItem={({item}) => 

        <View >
                   <Text style={{marginLeft:10, marginTop:10, marginRight:10, marginBottom:10, fontSize:20}}>Összes vélemény: {item.velemenyek_szama}</Text>

        </View> 
           
      
      }

      
        keyExtractor={({film_id}, index) => film_id}
      />
      <FlatList
        
        data={this.state.dataSource3}
        renderItem={({item}) => 

        <View >
         <Text style={{marginLeft:10, marginTop:10, marginRight:10, marginBottom:10, fontSize:20}}>Felhasználók száma: {item.userscount}</Text>

        </View> 
      
      }

        keyExtractor={({film_id}, index) => film_id}
      />
      

       
       
       

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