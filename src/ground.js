import React from "react";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export class Ground extends React.Component {

    render() {

        return (
            <ImageBackground style={styles.ground} source={require("../sprites/base.png")}/>
        );
    }
}

const styles = StyleSheet.create({
    ground: {
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: 0,
        height: 112,
    },
});