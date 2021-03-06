import React from "react";
import { connect } from 'react-redux'
import { TextInput, StyleSheet, Linking, View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

import SignIn from "../components/SignIn";
import { Body, Button, Content, Container, Form, Icon, Input, Item, Header, Label, Left, Right, Text, Title } from "native-base";

import { updateUser, updateToken } from '../actions/userInfo';
import initStore from '../store/initStore';
import { Alert } from "react-native";

/**
 * SignInScreen asks for username and password to login
 * There's 1 button to login
 * Alerts are made if the login credentials are incorrect
 * There's 1 button to sign up if you don't have an account
 * The sign up button begins by calling the backend for a URL for Microsoft Graph API login to display on WebView
 * This redirects to your organization's webpage - OKTA
 */
class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggingIn: false
      //0:  WELCOME to INFRIDGE!!! Sign up or login????
      //1:  SIGN UP PART 1:
      //      need to authenticate with Microsoft Graph API. Are they a real student?
      //      open WEBVIEW: call school.corg.network/create-user
      //      once they login to GRAPH, save the KEY in the DB and create a temporary user
      //      onNavigationStateChange to get the KEY in the frontend
      //2:  SIGN UP PART 2
      //      create a new account with InFridge!
      //      send new username, password, and key to backend to verify the keys -> FEED SCREEN
      //3:  Login
      //      send username, password to backend -> FEED SCREEN
    }
    this.LINKTOAUTH = "";
    this.gotToken = false;
    this.count = 0;
  }

  // async componentDidMount(){
  //   try{
  //     const a = await axios.post("https://school.corg.network:3000/authenticate-user");
  //     console.log("HEEELLLLLLLOOOOOOOOOOOO_----------------------------------------------------------------------------------------------");
  //     console.log(a);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  /**
   * onSignIn is an async function that calls the backend to display the webview URL
   */
  onSignIn = async () => {

    console.log("\t\t\t\t\t\t\t\t\t\t---------------------------WENT INTO THE GOOGLE METHODDDDDDDDDDDDDDDDDDDDDDDDDDDD");

    try {
      const res = await axios.post("https://school.corg.network:3002/authenticate-user");
      //this.LINKTOAUTH = await axios.post("http://localhost:3000/authenticate-user");

      console.log(res)
      console.log("printing authURL:")
      console.log(res.data.authURL)
      this.LINKTOAUTH = res.data.authURL;
      console.log(this.LINKTOAUTH);
      this.startLogin();
    } catch (err) {
      console.log("HIIIIIIIIIIIIIIIIIIIIIIIII THEREEEEEEEEEEEEEEEE");
      console.log(err);
    }

  }

  /**
   * onNavigationStateChange is an async function that reads every time the URL in the WebView component changes
   * When it reads "https://school.corg.network:3002/graph-response?" there should be an authentication token that is at the end of this URL
   * When is parses the authentication token, it calls the backend to verify the access token
   * Once the backend succesfully verifies the access token, the frontend navigates to the application - giving the user access to their account
   */
  _onNavigationStateChange = async function (webViewState) {
    this.count++;
    console.log("here is the url:");
    console.log(webViewState.url);
    console.log(typeof webViewState.url);
    let url = webViewState.url;
    if (typeof url == "string" && url.indexOf("https://school.corg.network:3002/graph-response?") > -1) {
      let code = url.match(/code=[a-zA-Z0-9-_]+/gi)[0].substring(5);
      console.log("HEEEEEEEEEEEEELLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      try {
        if (!this.gotToken) {
          this.gotToken = true;
          console.log("COUNT=");
          console.log(this.count);
          let res = await axios.post("https://school.corg.network:3002/verify-token", {
            code
          })
          console.log("RES!!!!!!");
          console.log(res);
          if (res.status == 200) {
            //GO TO SIGN UP SCREEN
            this.props.navigation.navigate('SignUp');
            this.completeLogin();
          }
          else {
            //add "wrong password or something and go back to completelogin"
            //GO TO ORIGINAL THING
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * startLogin is a function that sets the this.state.loggingIn variable to true
   */
  startLogin = () => {
    this.setState({ loggingIn: true });
  }
  
  /**
   * completeLogin is a function that sets the this.state.loggingIn variable to false
   */
  completeLogin = () => {
    this.setState({ loggingIn: false });
  }

  /**
   * loginInFridge is an async functino that checks the user's credentials with the database in the backend
   */
  loginInFridge = async () => {
    console.log("BUTTON PRESSED!!!!!!!!!!");
    if (this.validateCred()) {
      try {
        console.log("RESSSSSSSSSSSSSS!!!!!");
        let res = await axios.post("https://school.corg.network:3002/login-user", {
          username: this.state.username,
          password: this.state.password
        });
        if (res.status == 201) {
          //LOGIN WORKS

          const { userId, username, token } = res.data;
          console.log("LOGGGGGEEEEDDDDDD INNNNNNNNNNNNNNNNNNN");
          this.props.dispatch(updateUser(userId, username));
          this.props.dispatch(updateToken(token));

          await initStore(this.props.dispatch);
          console.log('in');
          this.props.navigation.navigate('AppRouter');
          console.log('out');
        }
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Incorrect Username or Password',
          'Username or password is incorrect',
          [
            {text: 'Dismiss', onPress: () => console.log('Dismiss login Pressed')},
          ],
          {cancelable: false},
        );
      }
    }
    else{
      Alert.alert(
        'Incorrect Username or Password',
        'Username or password is incorrect',
        [
          {text: 'Dismiss', onPress: () => console.log('Dismiss login Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  /**
   * This validates the length of the user's username and password
   */
  validateCred = () => {
    if (this.state.username.length > 0) {
      if (this.state.password.length > 0) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <View style={{flex:1}}>
        
        {
          this.state.loggingIn &&
            <WebView
              style={{ flex: 1 }}
              source={{ uri: this.LINKTOAUTH }}
              /*source={{uri: "https://google.com"}}*/
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
        }

        {
          !this.state.loggingIn &&
          
          <Content style={styles.container}>
            <Form>
              <Item stackedLabel>
                <Label>username</Label>
                <Input
                  rowSpan={1}
                  bordered
                  placeholder=""
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                />
              </Item>
              <Item stackedLabel last>
                <Label>password</Label>
                <Input
                  secureTextEntry={true}
                  rowSpan={1}
                  bordered
                  placeholder=""
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </Item>
            </Form>

            <View style={styles.button}>
              <Button
                block
                onPress={this.loginInFridge}
                style={{ backgroundColor: '#34495e' }}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </Button>
            </View>

            <View style={styles.button}>
              <Button
                block
                onPress={this.onSignIn}
                style={{ backgroundColor: '#34495e' }}
              /*onPress={() => this.setState({ signInState: 1 })}*/
              >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </Button>
            </View>
          </Content>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#3498db',
    padding: 50
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#3498db',
    padding: 5
  },
  buttonContainer: {
    backgroundColor: '#16a085',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  welcome: {
    fontSize: 50,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(SignInScreen);