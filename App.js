import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import MineField from './src/components/MineField'
import {
  cloneBoard,
  hasExplosion,
  wonGame,
  showMines,
  openField,
  invertFlag,
  flagsUsed,
  minesAmount,
  createState
} from './src/functions'
import Header from './src/components/Header'
import Configuration from './src/screens/Configuration'
import params from './src/params';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = createState()
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)
    const disableBoard = (lost || won)

    if (lost) {
      showMines(board)
      Alert.alert('perdeu')
    }

    if (won) {
      Alert.alert('Ganhou')
    }

    this.setState({ board, lost, won, disableBoard })
  }

  newGame = () => {
    this.setState(createState())
  }

  configuration = () => {
    this.setState({showConfiguration:true})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)
    const disableBoard = (won)
    this.setState({ board, won, disableBoard })
  }

  onLevelSelect = level => {
    params.dificultLevel = level
    console.log(level)
    this.newGame()
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>

        <Configuration isVisible={this.state.showConfiguration}
          onLevelSelect={ this.onLevelSelect}
          onCancel={ ()=>{ this.setState({showConfiguration:false})} }/>

        <Header onPress={this.newGame}
          configuration={this.configuration}
          flagsLeft={minesAmount() - flagsUsed(this.state.board)} />

        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}
            disabled={this.state.disableBoard}
            onSelectField={this.onSelectField}
          />
        </View>
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7DED9',
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
