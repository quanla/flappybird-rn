import React from "react";
import {StyleSheet, Image, View, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const Bird = ({bird}) => {
    // console.log(bird);
    return (
        <View style={[styles.bird, {
            bottom: bird.position,
        }]}>
            {/*<View style={{*/}
                {/*position: "absolute",*/}
                {/*left: screenWidth * .08 - 2,*/}
                {/*bottom: 2,*/}
                {/*width: 4,*/}
                {/*height: 4,*/}
                {/*backgroundColor: "red",*/}
            {/*}}/>*/}
            <Image
                style={{
                    transform: [{
                        rotateZ: `${-Math.atan(bird.velocity)}rad`,
                        // rotateZ: `45deg`,
                    }]
                }}

                source={require("../sprites/yellowbird-midflap.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    bird: {
        position: "absolute",
        left: "22%",
    },
});