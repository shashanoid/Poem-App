import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#E6E6E6",
  },
  sliderMenu: {
    alignItems: "flex-start",
    marginLeft: 8,
  },
});

export default styles;
