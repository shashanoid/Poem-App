import React, { Component } from "react";
import MainStackNavigator from "./src/navigations/AppNavigation";
import * as Font from "expo-font";
import LoadingScreen from "./src/screens/Loading/LoadingScreen";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      WorkSansLight: require("./assets/fonts/WorkSans-Light.ttf"),
      WorkSansRegular: require("./assets/fonts/WorkSans-Regular.ttf"),
      CaslonRegular: require("./assets/fonts/CaslonRegular.ttf"),

    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return <MainStackNavigator />;
  }
}
