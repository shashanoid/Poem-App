import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: Constants.statusBarHeight,
    backgroundColor: "#E6E6E6",
  },
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
  },
  sliderMenu: {
    alignItems: "flex-start",
    marginLeft: 8,
  },
  categoryContainer: {
    paddingTop: 8,
    marginLeft: 16,
    height: 180,
  },
  postTabView: {
    paddingTop: 16,
    paddingLeft: 30,
    flex: 1,
    flexDirection: "row",
  },
  postsView: {
    paddingTop: 10,
  },
  tabItem: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#40c2ec",
    paddingBottom: 4,
    alignItems: "center",
    paddingBottom: 8,
    width: 56,
  },
  tabItemDisabled: {
    alignItems: "center",
    width: 56,
  },
  tabTitle: { fontSize: 20, fontWeight: "bold" },
  diabledText: {
    color: "#989898",
    fontSize: 20,
    fontWeight: "bold",
  },
  float: {
    top: 20,
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});

export default styles;
