import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
  },
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
    color: 'white',
    textAlign: 'center',
    marginLeft: 24,
    fontFamily: 'WorkSansRegular'
  },
});

export default styles;
