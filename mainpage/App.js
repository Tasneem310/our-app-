import React from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text , ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDJnCL7oPa1idRwLG26uDcY02QchIdRVQ4',
  authDomain: 'group-k-40d.firebaseapp.com',
  databaseURL: 'https://group-k-40d.firebaseio.com',
  projectId: 'group-k-40d',
  storageBucket: 'group-k-40d.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button
          title="BUY NEW COURSE"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'First Details',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
    const users = [
  {
    name: "developer",
    cost: 1000,
    trainer: "s.t.s",
    discription: "this course is about ...."
  },
  {
    name: "explorer",
    cost: 50,
    trainer: "s.t.s",
    discription: "this course is about ...."
  },
  {
    name: "hacker",
    cost: 100,
    trainer: "s.t.s",
    discription: "this course is about ...."
  },
  {
    name: "devopser",
    cost: 1,
    trainer: "s.s.s",
    discription: "this course is about ...."
  }
];
    return (
    <ScrollView>
    {
    users.map((u, i) => {
      return (
        <Card title={u.name}>
        <View key={i} style={styles.user}>
          <Text style={styles.name}>TRAINER : {u.trainer} </Text>
          <Text style={styles.name}>COST : {u.cost} $</Text>
          <Text style={styles.name}>DISCRIPTION : {u.discription} </Text>
          <Button
            title={'buy'}
            style={styles.input}
            // onPress={}
          />
        </View>
        </Card>
      );
    })
  }
  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Auth: null,
      email: '',
      password: '',
    };
  }

  onLogin = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .than(function(user) {
          console.log(user);
          this.setState({ Auth: firebase.auth().currentUser });
        });
    } catch (error) {
      console.log(error.toString());
      var user = firebase.auth().currentUser;
      var uid;
      uid = user.uid;
      this.setState({ Auth: uid });
      Alert.alert('Credentials', `${this.state.Auth}`);
    }
  };
  render() {
    if (!this.state.Auth) {
      return (
        <View style={styles.container}>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder={'email'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />

          <Button
            title={'LogIn'}
            style={styles.input}
            onPress={() => this.onLogin(this.state.email,         this.state.password)}
          />
        </View>
      );
    } else {
      return <RootStack />;
    }
  }
}