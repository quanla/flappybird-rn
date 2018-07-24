import React from "react";
import { StyleSheet, View, ImageBackground } from 'react-native';
import {Ground} from "./ground";
import {createWorld} from "./world";
import {FComponent} from "./common/f-component";
import {Bird} from "./bird";

export class Game extends FComponent {
    world;

    constructor(props, context) {
        super(props, context);

        this.world = createWorld();

        this.onUnmount(this.world.onUpdated(() => this.forceUpdate()));
    }

    render() {

        let {bird, ground} = extractWorldView(this.world.getView());

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} source={require("../sprites/background-day.png")}>

                    <Bird
                        {...bird}
                    />

                    <Ground
                        {...ground}
                    />
                </ImageBackground>
            </View>
        );
    }
}

function extractWorldView({distance, time, bird}) {
    return {
        bird: {
            bird,
            time,
        },
        ground: {distance},
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
});