import React, {Fragment} from "react";
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export class Ground extends React.Component {

    render() {
        const {distance} = this.props;

        const images = () => {
            let count = Math.ceil(screenWidth / (336-1)) + 1;

            return (
                <Fragment>
                    {new Array(count).fill(0).map((_, i) => (
                        <Image key={i} style={[styles.img, {left: i*(336-1)}]} source={require("../sprites/base.png")}/>
                    ))}
                </Fragment>
            );
        };

        return (
            <View style={[styles.ground, {left: -distance % 336}]} onLayout={(e) => {
                // console.log(e.nativeEvent.layout)
            }}>
                {images()}
            </View>
        );
    }
}
// console.log(screenWidth)
const styles = StyleSheet.create({
    ground: {
        position: "absolute",
        // left provided in render
        bottom: 0,
        width: screenWidth * 2 - 1,
        height: 112,
        flexDirection: "row",
    },
    img: {
        width: 336,
        position: "absolute",
        top: 0,
    },
});