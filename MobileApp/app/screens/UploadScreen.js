import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../config/colors';
import ActivityIndicator from '../components/ActivityIndicator';

// function UploadScreen({progress = 0, visible = false}) {
function UploadScreen({visible = false}) {
  return (
    <Modal visible={visible} transparent={true}>
        <View style={styles.modalBackground}>
            <View style={styles.container}>
                <ActivityIndicator visible={visible} width={200} height={200} speed={5}/>
            </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
      alignItems:'center',
      justifyContent: 'space-around',
      backgroundColor: '#00000040',
      height: 250,
      width: 250,
      borderRadius: 50,
      display: 'flex',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
});

export default UploadScreen;