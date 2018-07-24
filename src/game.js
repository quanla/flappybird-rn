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

        this.initWorld();
    }

    initWorld() {
        this.world = createWorld();

        this.onUnmount(this.world.onUpdated(() => this.forceUpdate()));
    }

    render() {

        let {bird, ground, pipes, ended} = extractWorldView(this.world.getView());

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} source={require("../sprites/background-day.png")}>

                    <View style={styles.flyZone}>
                        <Bird
                            {...bird}
                        />

                        <Pipes
                            {...pipes}
                        />
                    </View>
                    <View style={styles.groundZone}>
                        <Ground
                            {...ground}
                        />
                    </View>
                </ImageBackground>

                <TouchableWithoutFeedback
                    onPressIn={() => ended ? this.initWorld() : this.world.flap()}
                >
                    <View
                        style={styles.touchable}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

function extractWorldView({distance, time, bird, pipes, ended}) {
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
        ended,
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchable: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
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