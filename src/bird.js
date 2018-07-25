import React from "react";
import {StyleSheet, Image, View} from 'react-native';

export const Bird = ({bird, time}) => {
    let flapRound = 500;
    const flap = Math.floor((time % flapRound) / flapRound * 4);
    return (
        <View style={[styles.bird, {
            bottom: bird.position,
        }]}>
            <Image
                style={{
                    transform: [{
                        rotateZ: `${-Math.atan(bird.velocity)}rad`,
                    }]
                }}

                source={
                    flap === 1                 ?    require("../sprites/yellowbird-upflap.png") :
                    (flap === 0 || flap === 2) ?    require("../sprites/yellowbird-midflap.png") :
                                                    require("../sprites/yellowbird-downflap.png")
                }/>
        </View>
    );
};

const styles = StyleSheet.create({
    bird: {
        position: "absolute",
        left: 100,
    },
});