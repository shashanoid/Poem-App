import * as React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../screens/Home/HomeScreen";
import CreateScreen from "../screens/Create/CreateScreen";
import SettingScreen from "../screens/Settings/SettingScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import SignInScreen from "../screens/User/SignInScreen";
import SignUpScreen from "../screens/User/SignUpScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../_reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// const store = createStore(rootReducer);

const store = createStore(rootReducer);

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        style: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Icon color="white" name="list" size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="pencil-square-o" color="white" size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" color="white" size={16} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={{ width: "70%" }}>
          <Drawer.Screen name={"HomeTabs"} component={HomeTabs} />
          <Drawer.Screen name={"Home"} component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MyDrawer;

console.disableYellowBox = true;
