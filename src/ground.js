import React, {Fragment} from "react";
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export class Ground extends React.Component {

    render() {
        const {distance} = this.props;

        const images = () => {

            return (
                <Fragment>
                    <Image style={[styles.img, {left: 0}]} source={require("../sprites/base.png")}/>
                    <Image style={[styles.img, {left: screenWidth - 1}]} source={require("../sprites/base.png")}/>
                </Fragment>
            );
        };

        return (
            <View style={[styles.ground, {left: `${-distance % 100}%`}]} onLayout={(e) => {
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
        width: screenWidth * 2 - 1,
        bottom: 0,
        // height: "100%",
        height: 112,
        flexDirection: "row",
    },
    img: {
        width: screenWidth,
        position: "absolute",
        top: 0,
    },
});