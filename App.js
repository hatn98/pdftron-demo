/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  Button,
  SafeAreaView,
} from 'react-native';

import {DocumentView, RNPdftron} from 'react-native-pdftron';

const App = () => {
  const viewer = useRef(null);
  const [annotList, setAnnotList] = useState([]);

  React.useEffect(() => {
    RNPdftron.initialize('');
    RNPdftron.enableJavaScript(true);
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // this.setState({
        //   permissionGranted: true,
        // });
        console.log('Storage permission granted');
      } else {
        // this.setState({
        //   permissionGranted: false,
        // });
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed');
    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      );
    } else {
      BackHandler.exitApp();
    }
  };

  const exportWithAnnotList = async () => {
    const xfdfWithAnnotList = await viewer.current.exportAnnotations({
      annotList,
    });
    console.log('xfdfWithAnnotList', xfdfWithAnnotList);
  };

  const exportAll = async () => {
    const xfdf = await viewer.current.exportAnnotations();
    console.log('xfdf', xfdf);
  };

  const path = 'https://www.africau.edu/images/default/sample.pdf';

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Export with annotList" onPress={exportWithAnnotList} />
      <Button title="Export all" onPress={exportAll} />
      <DocumentView
        document={path}
        showLeadingNavButton={true}
        ref={viewer}
        leadingNavButtonIcon={
          Platform.OS === 'ios'
            ? 'ic_close_black_24px.png'
            : 'ic_arrow_back_white_24dp'
        }
        onLeadingNavButtonPressed={onLeadingNavButtonPressed}
        onAnnotationChanged={({action, annotations}) => {
          setAnnotList(annotList => [...annotList, ...annotations]);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
