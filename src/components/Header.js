import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import params from '../params'
import Flag from './Flag'

export default props => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Campo Minado</Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button
                        onPress={() => { props.onPress() }}
                        title="Novo Jogo"
                        color="#13292A"

                    />
                </View>
                <View style={styles.button} >
                    <Button
                        onPress={() => { props.configuration() }}
                        title="Configuracoes"
                        color="#13292A"

                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Flag></Flag>
                <Text style={styles.text}>  {props.flagsLeft}</Text>
            </View> 
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: params.headerRatio * params.height,
        justifyContent: 'flex-end',
        flex: 1,
        marginTop:15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2

    },
    button: {
        width: 150,
        padding: 5
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }

});