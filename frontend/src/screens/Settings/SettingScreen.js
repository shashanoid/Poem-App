// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import styles from "./styles";

// import menuslider from "../../../assets/menuslider.png";

// const SettingScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.openDrawer()}
//         style={styles.sliderMenu}
//       >
//         <Image style={{ width: 64, height: 25 }} source={menuslider} />
//       </TouchableOpacity>
//       <Text> Settings </Text>
//     </View>
//   );
// };

// export default SettingScreen;


import React, { Component } from 'react';
import Constants from "expo-constants";


import { StyleSheet, View, Alert, FlatList, Text, TouchableOpacity, Image } from 'react-native';

export default class SettingScreen extends Component {

constructor(props) {

   super(props);

  //  const ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   
  this.state = {
    dataSource: Array(50)
      .fill()
      .map((_, index) => ({ id: index })),
  };


 }

ListViewItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

 GetListViewItem (rowData) {
  
 Alert.alert(rowData);

 }

 SampleFunction=()=>{
  
  // Write your own code here, Which you want to execute on Floating Button Click Event.
  Alert.alert("Floating Button Clicked");
  
}

render() {
  
return (

<View style={styles.MainContainer}>

{/* <View style={styles.headerContainer}></View> */}

 <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={styles.sliderMenu}
        ></TouchableOpacity>
  
{/* <FlatList
          style={styles.wrapper}
          data={this.state.dataSource}
          renderItem={this._renderRow}
          keyExtractor={(item) => item.id.toString()}
          // tabRoute={this.props.route.key}
          renderItem={({ item }) => <View style={styles.item} />}
        /> */}


        <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
 
          <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
          
          style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>

</View>
           
   );
 }
}

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
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 4,
    alignItems: "center",
    paddingBottom: 8,
  },
  tabItemDisabled: {
    alignItems: "center",
  },
  diabledText: {
    color: "#989898"
  },
  item: {
    height: 150,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderRadius: 4,
  },

 MainContainer :{
 
   justifyContent: 'center',
   flex:1,
   margin: 10
 },

 rowViewContainer: 
 {

   fontSize: 18,
   paddingRight: 10,
   paddingTop: 10,
   paddingBottom: 10,

 },

 TouchableOpacityStyle:{
  
     position: 'absolute',
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',
     right: 30,
     bottom: 30,
   },
  
   FloatingButtonStyle: {
  
     resizeMode: 'contain',
     width: 50,
     height: 50,
   }
});