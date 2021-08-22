

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyHeader from "../components/MyHeader";

export default class CredentialScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      credentialList: [],
    };
    this.requestRef = null;
  }

  getCredentialList = () => {
    this.requestRef = db
      .collection("password_register")
      .onSnapshot((snapshot) => {
        var credentialList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          credentialList: credentialList,
        });
      });
  };

  componentDidMount() {
    this.getCredentialList();
  }

  componentWillUnmount() {
  this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
       <SafeAreaProvider>
      <ListItem
        key={i}
        title={item.user_name}
        subtitle={item.description}
        titleStyle={{ color: "black", fontWeight: "bold" }}
      
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("CredentialDetails", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
       </SafeAreaProvider>
    );
  };

  render() {
    return (
      <View style={styles.view}>
       <SafeAreaProvider>
        <MyHeader title="View Credentials" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.credentialList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of Saved Credentials</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.credentialList}
              renderItem={this.renderItem}
            />
          )}
        </View>
         </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view:{
    flex: 1,
    backgroundColor: "#fff"
  }
});
