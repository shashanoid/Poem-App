import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerContainer: {
    height: Constants.statusBarHeight * 2,
    backgroundColor: "black",
    flexDirection: 'row',
  },
  nextButton: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginBottom: 8,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  cancelButton:{
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end'
  },
  titleContainer: {
    height: 48,
    backgroundColor: "#fcfcff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
    fontFamily: "CaslonRegular",
  },
  root: {
    flex: 1,
    backgroundColor: "#eee",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  main: {
    paddingTop: 4,
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    paddingBottom: 1,
    alignItems: "stretch",
  },
  editor: {
    backgroundColor: "#fcfcff",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    fontFamily: "CaslonRegular",
  },
  toolbarContainer: {
    minHeight: 35,
  },
  menuOptionText: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  divider: {
    marginVertical: 0,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

export default styles;
