import React from 'react';
import { StyleSheet, View } from 'react-native';

export default () => {

    return (
        <View style={styles.container}>
            <View style={styles.flagPole} />
            <View style={styles.flag} />
            <View style={styles.base} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        alignItems:'center'
    },
    flag: {
        height: 6,
        width: 8,
        backgroundColor:'#F22',
        marginLeft: 6,
        borderTopRightRadius: 10
    },
    flagPole: {
        position: 'absolute',
        height: 14,
        width: 2,
        backgroundColor: '#222',
    },
    base:{
        position:'absolute',
        height: 4,
        width: 10,
        marginTop: 14, 
        backgroundColor:'#222',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    }

});