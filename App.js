/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {Alert, BackHandler, PermissionsAndroid, Platform} from 'react-native';

import {DocumentView, RNPdftron} from 'react-native-pdftron';

const App = () => {
  const viewer = useRef(null);

  React.useEffect(() => {
    RNPdftron.initialize('');
    RNPdftron.enableJavaScript(true);
  }, []);

  // const path =
  //   'https://wwwimages2.adobe.com/content/dam/acom/en/feature-details/acrobat/axi/pdfs/create-forms-sample.pdf';
  const path =
    'https://drive.google.com/uc?id=1v2XpLCamAP0FV132WwD30tDZPgEqpV7E&export=download';
  // const path =
  //   'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/axf-form-field-1.pdf';

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

  return (
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
    />
  );
};

export default App;
