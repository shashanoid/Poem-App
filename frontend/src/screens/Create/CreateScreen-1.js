import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  TextInput,
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import RNDraftView from "react-native-draftjs-editor";
import Constants from "expo-constants";

import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const ControlButton = ({ text, action, isActive }) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButtonContainer,
        isActive ? { backgroundColor: "gold" } : {},
      ]}
      onPress={action}
    >
      <Text style={{ color: "white" }}>{text}</Text>
    </TouchableOpacity>
  );
};

const EditorToolBar = ({
  activeStyles,
  blockType,
  toggleStyle,
  toggleBlockType,
}) => {
  return (
    <View style={styles.toolbarContainer}>
      <ControlButton
        text={"B"}
        isActive={activeStyles.includes("BOLD")}
        action={() => toggleStyle("BOLD")}
      />
      <ControlButton
        text={"I"}
        isActive={activeStyles.includes("ITALIC")}
        action={() => toggleStyle("ITALIC")}
      />
      <ControlButton
        text={"H"}
        isActive={blockType === "header-one"}
        action={() => toggleBlockType("header-one")}
      />
      <ControlButton
        text={"--"}
        isActive={activeStyles.includes("STRIKETHROUGH")}
        action={() => toggleStyle("STRIKETHROUGH")}
      />
      <ControlButton
        text={"un"}
        isActive={activeStyles.includes("UNDERLINE")}
        action={() => toggleStyle("UNDERLINE")}
      />
      <ControlButton text={"Next"} action={() => alert("Haha")} />
    </View>
  );
};

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
  CURS: { fontFamily: "cursive", wordWrap: "break-word" },
  FAN: { fontFamily: "fantasy", wordWrap: "break-word" },
  MON: { fontFamily: "monospace", wordWrap: "break-word" },
};

const initHTML = `<br/>
<center><b>Pell.js Rich Editor</b></center>
<center>React Native</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
</br></br>
`;

const CreateScreen = () => {
  const richText = React.createRef();
  const _draftRef = React.createRef();
  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState("unstyled");
  const [editorState, setEditorState] = useState("");
  const [value, onChangeText] = React.useState("Useless Placeholder");

  const defaultValue = "";

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
  };

  const toggleStyle = (style) => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = (blockType) => {
    _draftRef.current && _draftRef.current.setBlockType(blockType);
  };

  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : "");
  }, [_draftRef]);
  console.log(editorState);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TextInput
            style={{
              height: "100%",
              fontFamily: "WorkSansLight",
              fontSize: 30,
            }}
            onChangeText={(text) => onChangeText(text)}
            placeholder={"Title: "}
          />
        </View>

        <EditorToolBar
          activeStyles={activeStyles}
          blockType={blockType}
          toggleStyle={toggleStyle}
          toggleBlockType={toggleBlockType}
        />
      </View>


      <SafeAreaView style={styles.containerStyle}>
        <RNDraftView
          defaultValue={defaultValue}
          onEditorReady={editorLoaded}
          style={{ flex: 1, marginTop: 10, backgroundColor: 'black' }}
          placeholder={"Write here..."}
          ref={_draftRef}
          onStyleChanged={setActiveStyles}
          onBlockTypeChanged={setActiveBlockType}
          styleMap={styleMap}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  rich: {
    minHeight: 300,
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    color: 'black'

  },
  toolbarContainer: {
    height: 56,
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    top: Constants.statusBarHeight * 0.2,
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    height: Constants.statusBarHeight * 4,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  titleContainer: {
    height: 56,
    backgroundColor: "silver",
    display: "flex",
    marginBottom: 1,
    // borderWidth: 5,
    borderRadius: 4,
  },
});

export default CreateScreen;
