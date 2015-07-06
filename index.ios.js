'use strict';

let React = require('react-native');
let SocketIO = require('react-native-swift-socketio');

let {
  AppRegistry,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  TouchableOpacity,
  View,
} = React;

let ReactJ5 = React.createClass({

  getInitialState() {
    return {
      socket: new SocketIO('192.168.0.3:3000', {}),
      state: {status: 'not-connected'},
      ledSwtich: false,
      value: 0
    }
  },

  componentDidMount() {
    this.state.socket.connect();
  },

  _emitEvent(action, data = {}) {
    this.state.socket.emit(action, data);
  },

  _handleLEDSwitch(value) {
    this.setState({ledSwtich: value});
    let action = !this.state.ledSwtich ? 'led:on' : 'led:off';
    this._emitEvent(action);
  },

  _handleSlider(value) {
    this.setState({value: value});
    this._emitEvent('fade', value);
  },

  _handleColorChange(color) {
    switch (color) {
      case 'red':
        this._emitEvent('colorChange', '#FF0000');
        break;
      case 'green':
        this._emitEvent('colorChange', '#00FF00');
        break;
      case 'blue':
        this._emitEvent('colorChange', '#0000FF');
        break;
    }
  },

  render() {
    return (
      <View style={styles.container}>
       <View style={[styles.controlContainer, {marginBottom: 50}]}>
          <Text style={styles.welcome}>OFF/ON</Text>
          <SwitchIOS
            onValueChange={(value) => this._handleLEDSwitch(value)}
            style={{marginBottom: 10}}
            value={this.state.ledSwtich}/>
        </View>
        <View style={styles.controlContainer}>
          <Text style={styles.welcome}>RGB LED</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this._handleColorChange('red')}>
              <View style={{width: 75, height: 75, backgroundColor: 'red', margin: 10}}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._handleColorChange('green')}>
              <View style={{width: 75, height: 75, backgroundColor: 'green', margin: 10}}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._handleColorChange('blue')}>
              <View style={{width: 75, height: 75, backgroundColor: 'blue', margin: 10}}></View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>FADER</Text>
          <SliderIOS
          style={styles.slider}
          maximumValue={100}
          value={100}
          onValueChange={(value) => this._handleSlider(value)} />
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  controlContainer: {
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  slider: {
    height: 55,
    margin: 20,
    width: 300
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactJ5', () => ReactJ5);
