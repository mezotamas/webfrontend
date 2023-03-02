import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View,  TouchableOpacity, TextInput, Button, Menu } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import 'moment/locale/hu'  
moment.locale('hu')
const IP=require("./Ipcim")
export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        szo:"",
        bevitel1:"",
        szam:"",
        bevitelvelemenyid:"",
        valaszto2:2,
        dataSource:[],
        dataSource2:[]
    }
  }

  
  componentDidMount(){
    fetch(IP.ipcim+"velemenyek")
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
      fetch(IP.ipcim+"idezet")
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


  keres=()=>{
      //alert("Hello")
      if(this.state.bevitel1=="" )
    alert("Nem maradhet üresen!")
    else{
      var bemenet={
        bevitel1:this.state.szo
      }
  
    fetch(IP.ipcim+"keresvelemeny", {
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
      
      );}
  
  }
  torles=(szam)=>{
    alert(szam)
    var bemenet={
      bevitel1:szam
     
    }
  
fetch(IP.ipcim+"torles_velemeny", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
    alert(y)

  });
  
    
    

}
  velemeny=()=>{
    if(this.state.bevitel1=="" || this.state.bevitel2==""||this.state.bevitel3=="")
    alert("Nem maradhat üresen!")
    else{

    var bemenet={
      bevitel1:this.state.bevitel1,
      bevitelvelemenyid:this.state.valaszto2
      
    }
    fetch(IP.ipcim+"velemeny", {
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
  }}
  
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



{/*-----------------------------------------------------------------------------Felvital */}

<Text style={{marginLeft:10, marginRight:10, marginTop:10}}>Mit üzen neked? Ide írhatod.</Text>
           <TextInput style={{height: 40,marginLeft:10, marginRight:10, marginTop:10,borderBottomWidth:2,backgroundColor:"white",borderBottomColor: 'blue',}}
           placeholder="Üzenet szövege..."
           
           onChangeText={(beirtszoveg)=>this.setState({bevitel1:beirtszoveg})}
           value={this.state.bevitel1}
           ></TextInput>
          
          

      <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.valaszto2}
                onValueChange={(ertek) => 
this.setState({valaszto2:ertek})


              }>
                  {this.state.dataSource2.map(item=>

                <Picker.Item label={item.idezet_szoveg} value={item.idezet_id} />
          )}

              </Picker>
              <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.velemeny()}
      >
        <Text style={{color:"white", fontWeight:"bold",fontSize:15}}  >Küldés</Text>
      </TouchableOpacity>
        {/*---------------------------------------------------kereses */}
        <Text style={{marginLeft:10, marginTop:10, marginRight:10, marginBottom:10, fontSize:20}}>Add meg a keresendő szót:</Text>
        <TextInput
        style={{height: 40,marginLeft:10,marginRight:10, borderBottomColor:'blue', borderBottomWidth:2}}
        placeholder="Szó megadása"
        onChangeText={(beirtszoveg)=>this.setState({szo:beirtszoveg})}
        value={this.state.szo}
      />
        <TouchableOpacity style={{marginTop:10}}
        
        onPress={()=>this.keres()}
      >
        <Text style={{textAlign:"center",color:"white",fontWeight:"bold",fontSize:15,marginLeft:10,marginRight:10, backgroundColor:"blue"}}  >Keresés</Text>
      </TouchableOpacity>

        {/*---------------------------------------------------talalatok */}
        <FlatList
        
          data={this.state.dataSource}

          renderItem={({item}) => 
          
          <View style={{borderWidth:2,borderColor:"blue", borderRadius:7, marginLeft:10, marginRight:10, marginTop:10}}>
                 <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.velemeny_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
                 
                 <Text style={{marginRight:"auto",marginLeft:"auto",color:"blue", fontSize:20,textAlign:"center",marginLeft:10, marginRight:10, marginTop:10}}   >Sorszám: #{item.velemeny_id}</Text>
  
                 <Text style={{marginRight:"auto",marginLeft:"auto",color:"green",fontStyle:"italic", fontSize:20,textAlign:"center",marginLeft:10, marginRight:10, marginTop:10}}   >Felhasználó véleménye:</Text>
  
             <Text style={{marginRight:"auto",marginLeft:"auto",color:"green",fontStyle:"italic", fontSize:20,textAlign:"center",marginLeft:10, marginRight:10, marginTop:10}}   >{item.velemeny_szoveg} </Text>
         
          <Text style={{marginRight:"auto",marginLeft:"auto",color:"blue",fontSize:20,textAlign:"center",marginLeft:10, marginRight:10, marginTop:10}}   >{item.idezet_szoveg} </Text>
          <Text style={{fontStyle:"italic", fontSize:20,textAlign:"left",marginLeft:10, marginRight:10, marginTop:10}}   >{item.idezet_konyv} {item.idezet_fejezet_vers}  </Text>
         
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Időpont: {moment(item.idezet_datum).format('YYYY MMMM DD, H:mm:ss')}  </Text>
          
         
          
          <Text style={{marginLeft:10, marginRight:10, marginTop:10,color:"blue",fontSize:20,textAlign:"left",marginTop:15,marginBottom:5}}   >Kategória: {item.kategoria_nev}   </Text>
          
          </View> 
        
        }

        
          keyExtractor={({velemeny_id}, index) => velemeny_id}
        />
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