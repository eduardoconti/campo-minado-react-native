import React from 'react';
import { StyleSheet, View, Modal, Button } from 'react-native';

export default props => {

    const LevelButton = levelButton => {
        return (
            <View style={styles.button}>
                <Button
                    onPress={() => { props.onLevelSelect(levelButton.level) }}
                    title={levelButton.title}
                    color="#988780" />

            </View>
        )
    }

    return (
        <Modal onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType={'slide'}
            transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <LevelButton level={0.1} title={'FACIL'} />
                    <LevelButton level={0.2} title={'MEDIO'} />
                    <LevelButton level={0.3} title={'DIFICIL'} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#E7DED9',
        padding: 50,
    },
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    button: {
        width: 200,
        padding: 10
    }
});