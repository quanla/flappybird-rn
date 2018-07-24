import React from "react";
import { StyleSheet, Image, View } from 'react-native';


export const Bird = ({bird}) => (
    <View style={[styles.bird, {top: bird.position}]}>
        <Image source={require("../sprites/yellowbird-midflap.png")}/>

    </View>
);

const styles = StyleSheet.create({
    bird: {
        position: "absolute",
        left: 100,
    },
});