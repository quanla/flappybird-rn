import React from "react";
import { StyleSheet, Image, View } from 'react-native';


export const Bird = ({bird, ground}) => {
    // console.log(bird);
    return (
        <View style={[styles.bird, {
            bottom: bird.position + ground,
            transform: [{
                rotateZ: `${-Math.atan(bird.velocity)}rad`,
                // rotateZ: `45deg`,
            }],
        }]}>
            <Image source={require("../sprites/yellowbird-midflap.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    bird: {
        position: "absolute",
        left: "22%",
    },
});