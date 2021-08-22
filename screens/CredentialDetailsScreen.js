import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../config.js';
import { Base64 } from 'js-base64';

export default class CredentialDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,

      fetcherId: this.props.navigation.getParam('details')['email_id'],
      passwordId: this.props.navigation.getParam('details')['passwordId'],
      uName: this.props.navigation.getParam('details')['user_name'],
      description: this.props.navigation.getParam('details')['description'],
      passWord: this.props.navigation.getParam('details')['pass_word'],
      fetcherName: '',
      fetcherRequestDocId: '',
      decode: this.props.navigation.getParam('details')['encode'],
      showData: this.props.navigation.getParam('details')['encode'],
    };
  }

  getFetcherDetails() {
    
    db.collection('User')
      .where('email_id', '==', this.state.fetcherId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            fetcherName: doc.data().first_name,
            fetcherContact: doc.data().mobile_number,
            fetcherAddress: doc.data().address,
           // decode: doc.data().encode,
           // showData: doc.data().encode,
          });
        });
      });
var decode = Base64.decode(this.state.showData);
    db.collection('password_register')
     
      .where('passwordId', '==', this.state.passwordId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          
          this.setState({ fetcherRequestDocId: doc.id ,
        /*  showData: decode*/ });
        });
      });
  }
  decryptPassword = () => {
    var decode = Base64.decode(this.state.showData);
    this.setState({ showData: decode });
  };
  componentDidMount() {
    this.getFetcherDetails();
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  type="feather"
                  color="#696969"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              centerComponent={{
                text: 'Credentials',
                style: { color: '#90A5A9', fontSize: 20, fontWeight: 'bold' },
              }}
              backgroundColor="#eaf8fe"
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Card
              title={'Credentials Information'}
              titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  User Name : {this.state.uName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Account Description : {this.state.description}
                </Text>
              </Card>
         

              <Card>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.decryptPassword}>
                  <Text style={styles.text}>Click to Decode Password</Text>
                </TouchableOpacity>
              </Card>
              <Card>
                <Text
                  style={{ fontWeight: 'bold' }}>
                  Encrypted Password: {this.state.showData}
                </Text>
              </Card>
            </Card>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
   /*  <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Password: {this.state.passWord}
                </Text>
              </Card>*/
