import React from "react";
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Ground} from "./ground";
import {createWorld} from "./world";
import {FComponent} from "./common/f-component";
import {Bird} from "./bird";
import {Pipes} from "./pipes";

export class Game extends FComponent {
    world;

    constructor(props, context) {
        super(props, context);

        this.world = createWorld();

        this.onUnmount(this.world.onUpdated(() => this.forceUpdate()));
    }

    render() {

        let {bird, ground, pipes} = extractWorldView(this.world.getView());

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => this.world.flap()}
                    style={styles.touchable}
                >
                    <ImageBackground style={styles.background} source={require("../sprites/background-day.png")}>

                        <Bird
                            {...bird}
                            ground={112}
                        />

                        <Pipes
                            {...pipes}
                            ground={112}
                        />
                        <Ground
                            {...ground}
                        />
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

function extractWorldView({distance, time, bird, pipes}) {
    return {
        bird: {
            bird,
            time,
        },
        ground: {distance},
        pipes: {
            pipes,
            distance,
        },
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchable: {
        backgroundColor: "black",
    },
    flyZone: {
        flex: 1,
    },
    groundZone: {
        flex: 0,
        height: 112,
    },
    background: {
        flex: 1,
    },
});