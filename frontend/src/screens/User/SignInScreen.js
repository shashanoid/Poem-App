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
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

//Redux utils
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userService } from "../../_services";
import { signInAction } from "../../_actions/SignInAction";

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange(type, value) {
    this.setState({
      [type]: value,
    });
  }

  async handleSignIn() {
    let { email, password } = this.state;
    let signInResponse = await userService.SignIn(email, password);

    if (signInResponse.status === 422) {
      Alert.alert(
        "Sign In Error",
        signInResponse.data.error,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    let token = signInResponse.access_token;
    await this.props.signInAction(token);
    await SecureStore.setItemAsync("token", token);
    this.props.navigation.push('Profile')
  }

  render() {
    return (
      <View style={styles.signinContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backbutton}
          >
            <Icon name="ios-arrow-back" color="white" size={32} />
            <Text style={styles.headerTitle}>SignIn</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signinView}>
          <TextInput
            style={styles.userName}
            placeholder="Email"
            onChangeText={(text) => this.handleChange("email", text)}
          />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.handleChange("password", text)}
          />
          <Button title="Sign In" onPress={() => this.handleSignIn()}></Button>
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
  backbutton: {
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
    marginLeft: 24,
    fontFamily: "WorkSansRegular",
  },
  signinContainer: {
    flex: 1,
  },
  signinView: {
    flex: 1,
    padding: 20,
  },
  userName: {
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
  const { signUp, signIn } = state;
  return { signUp, signIn };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ signInAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
