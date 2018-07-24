import {addRemove} from "./common/utils/collections";
import {animationLoop} from "./common/animation";
import {chain} from "./common/utils/fs";

const xSpeed = 0.01;

const createWorld = () => {

    const updateListeners = [];

    let time = 0;
    let bird = {
        position: 300,
        velocity: 0,
    };

    animationLoop((deltaTime) => {
        time += deltaTime;

        bird = chain(bird,
            (bird) => gravity(bird, deltaTime ),
            (bird) => physics(bird, deltaTime ),
        );

        updateListeners.forEach((l) => l());
    });

    return {
        getView: () => ({
            distance: time * xSpeed,
            time,
            bird,
        }),
        onUpdated: addRemove(updateListeners),
    };
};

exports.createWorld = createWorld;


const gravity = (bird, dt) => ({
    ...bird,
    velocity: bird.velocity - dt * 0.25,
});

const physics = (bird, dt) => ({
    ...bird,
    position: Math.max( 0, bird.position + dt * bird.velocity ),
});