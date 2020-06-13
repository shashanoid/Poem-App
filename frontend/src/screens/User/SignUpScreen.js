import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Constants from "expo-constants";

//Redux uMy Alert Msg"tils
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userService } from "../../_services";
import { signUpAction } from "../../_actions/SignUpAction";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
    };
  }

  handleChange(type, value) {
    this.setState({
      [type]: value,
    });
  }

  async handleSignUp() {
    let { username, email, password } = this.state;
    let signUpResponse = await userService.SignUp(username, email, password);

    if (signUpResponse.status === 422) {
      Alert.alert(
        "Sign Up Error",
        signUpResponse.data.error,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    let token = signUpResponse.access_token;
    await this.props.signUpAction(token);
    SecureStore.setItemAsync("token", token);
  }

  render() {
    return (
      <View style={styles.signupContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>SignUp</Text>
          </View>
        </View>

        <View style={styles.signUpView}>
          <TextInput
            onChangeText={(text) => this.handleChange("username", text)}
            style={styles.userName}
            placeholder="Username"
          />
          <TextInput
            onChangeText={(text) => this.handleChange("email", text)}
            style={styles.email}
            placeholder="Email"
          />
          <TextInput
            onChangeText={(text) => this.handleChange("password", text)}
            style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
          />
          <Button onPress={() => this.handleSignUp()} title="SignUp"></Button>
          <Button
            title="Already a user?"
            onPress={() => this.props.navigation.navigate("SignIn")}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Constants.statusBarHeight * 3,
    backgroundColor: "black",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: "16%",
    flex: 1,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    fontFamily: "WorkSansRegular",
  },
  signupContainer: {
    flex: 1,
  },
  signUpView: {
    flex: 1,
    padding: 20,
  },
  userName: {
    marginBottom: 20,
    height: 48,
    borderBottomWidth: 1,
  },
  email: {
    marginBottom: 20,
    height: 48,
    borderBottomWidth: 1,
  },
  password: {
    marginBottom: 20,
    height: 48,
    borderBottomWidth: 1,
  },
});

// export default SignIn;
const mapStateToProps = (state) => {
  const { signUp } = state;
  return { signUp };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ signUpAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
