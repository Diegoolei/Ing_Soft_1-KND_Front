import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgAudio from 'bigAudio'

export default class App extends React.Component {
  render() {
    return (
      <BgAudio options={audio_options}></BgAudio>
    );
  }
}
const audio_options = {
  source:{local: require('../../music/low-fideos-retolofi.mp3')}
}