import React, {Fragment} from "react";
import {Image, StyleSheet, Text, View} from 'react-native';

export class Pipes extends React.Component {

    render() {
        const {pipes, distance} = this.props;

        return (
            <Fragment>
                {pipes.map(({x, range}) => (
                    <Fragment
                        key={x}
                    >
                        <Image
                            style={[styles.pipe, {left: x - distance, bottom: - 320 + range.from}]}
                            source={require("../sprites/pipe-green.png")}
                        />
                        <Image
                            style={[styles.pipe, styles.pipeUp,
                                {left: x - distance, bottom: range.to},
                            ]}
                            source={require("../sprites/pipe-green.png")}
                        />

                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
    },
    pipeUp: {
        transform: [{rotateX: "180deg"}],
    },
});