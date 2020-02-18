/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import VideoPlayer from 'react-native-video';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      muted: false,
      rate: 1,
      seekingComplete: true,
      seekTime: null,
      volume: 1,
      seekTo: 0,
    }

    this.effect = this.effect.bind(this)
  }
  
  componentDidMount() {
    this.effect();
}

  componentDidUpdate() {
    this.player.state.showPoster = true
  }

  componentWillUnmount() {
    this.onEnd()
  }

  effect() {
    this.state.seekTo === 0 || this.state.seekTo && this.player && this.player.seek(this.state.seekTo)
    this.state.seekTo === 0 || this.state.seekTo && this.setState({seekingComplete: false})
  }

  onLoad = (data) => {
    this.setState({duration: data.duration ? data.duration : 1})
  }

  onEnd() {
    this.setState({
      currentTime: 0,
      seekTime: 0,
    });
  }

  onProgress = ({currentTime, seekableDuration}) => {
    if(!this.state.seekingComplete) {
        return;
    }
    this.onCurrentTimeChange(currentTime, seekableDuration)
  }

  onSeek = (data) => {
    this.setState({seekingComplete: true})
    this.onCurrentTimeChange(data.currentTime)
  }

  onCurrentTimeChange = (currentTime, duration) => {
    if(!duration) {
      this.setState({currentTime})
    } else {
      this.setState({ currentTime, duration })
    }
  }

  render() {
    const playInBackground = Platform.select({
      ios: false,
      android: true
    });
    
    const DEFAULT_CONTENT_IMAGE = 'https://assets.democracynow.org/assets/default_content_image-354f4555cc64afadc730d64243c658dd0af1f330152adcda6c4900cb4a26f082.jpg'
    
    
    const selectedTextTrack = {type: 'title', value: 'English'}
    
    const fullShowUri = 'https://publish.dvlabs.com/democracynow/audio-m4a/dn2020-0214.m4a'
    const headlinesUri = 'https://publish.dvlabs.com/democracynow/audio-m4a/dn2020-0214.m4a?start=1217&end=2540'
    const storyUri = 'https://publish.dvlabs.com/democracynow/audio-m4a/dn2020-0214.m4a?start=891&end=1217'

    return (
      <View style={styles.container}>
        <Text> (=^-ω-^=) </Text>
        <VideoPlayer
          audioOnly={true}
          ref={(ref) => {
            this.player = ref}}
          poster={DEFAULT_CONTENT_IMAGE}
          source={{uri: fullShowUri}}
          style={styles.video_player}
          textTracks={[]}
          selectedTextTrack={selectedTextTrack}
          rate={this.state.rate}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode="contain"
          onProgress={this.onProgress}
          onSeek={this.onSeek}
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          playInBackground={playInBackground}
          playWhenInactive={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  video_player: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: .1,
    backgroundColor: '#000',
  },
});