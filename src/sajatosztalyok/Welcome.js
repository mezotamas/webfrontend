import React, {Component} from 'react';
import {Alert, Text, StyleSheet, View} from 'react-native';

export default class ButtonBasics extends Component {
  

  render() {
    return (
      <View style={styles.container}>
       <Text style={{textAlign:"center"}}>Üdvözöllek az alkalmazásban aminek a témája Bibliai igékkel kapcsolatos. Ebben az alkalmazásban elmondhatja, hogy mit üzen az adott Ige.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});