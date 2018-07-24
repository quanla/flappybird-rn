import React from "react";
import { StyleSheet, View, ImageBackground } from 'react-native';
import {Ground} from "./ground";

export class Game extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} source={require("../sprites/background-day.png")}>

                    <Ground/>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
});