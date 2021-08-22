import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Base64 } from 'js-base64';

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      uName: '',
      description: '',
      passwordId: '',
    //  passWord: '',
      docId: '',
      passwordHolder: '',
      showData: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  encryptPassword = () => {
    var encode = Base64.encode(this.state.passwordHolder);
    this.setState({ showData: encode });
  };

  /*decryptPassword = () => {
    var decode = Base64.decode(this.state.showData);
    this.setState({ showData: decode });
  };*/

  addCredentials = async (uName, description, passwordHolder) => {
    var emailId = this.state.emailId;
    var passwordId = this.createUniqueId();
    var encode = Base64.encode(this.state.passwordHolder);
    console.log('im called', passwordId);
    db.collection('password_register').add({
      email_id: emailId,
      user_name: uName,
     // pass_word: passWord,
      description: description,
      passwordId: passwordId,
      passwordHolder:passwordHolder,
      encode:encode,
      //decode:decode,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.setState({
      uName: '',
      description: '',
    //  passWord: '',
      passwordHolder:'',
      showData: encode,

    });

    return Alert.alert('Credentials added successfully', '', [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('HomeScreen');
        },
      },
    ]);
  };

  functionCombined = () => {
    
    this.addCredentials(
      this.state.uName,
      this.state.description,
    //  this.state.passWord,
      this.state.passwordHolder,
      this.state.showData,
    );
    //this.encryptPassword();
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <MyHeader
            title="Add Credentials"
            navigation={this.props.navigation}
          />

          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'User Name/E-mail/Phone Number'}
              maxLength={20}
              onChangeText={(text) => {
                this.setState({
                  uName: text,
                });
              }}
              value={this.state.uName}
            />
          
            <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              maxLength={30}
              onChangeText={data => this.setState({ passwordHolder: data })}
         
              value={this.state.passwordHolder}
            />
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.formTextInput, { height: 100 }]}
              placeholder={'Description'}
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              value={this.state.description}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => {
                /* this.addCredentials(
                  this.state.uName,
                  this.state.description,
                  this.state.passWord
                );*/
                this.functionCombined();
              }}>
              <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
                Add Credentials
              </Text>
            </TouchableOpacity>
          
          </KeyboardAvoidingView>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: RFValue(1300),
    height: RFValue(1300),
  },
});

 /* <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 40 }}>
              {this.state.showData}
            </Text>
              <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              maxLength={30}
              onChangeText={(text) => {
                this.setState({
                  passWord: text,
                });
              }}
              value={this.state.passWord}
            />*/
