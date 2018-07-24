import {addRemove} from "./common/utils/collections";
import {animationLoop} from "./common/animation";
import {chain} from "./common/utils/fs";

const xSpeed = 0.03;

function collide(bird, pipes, distance) {

    if (bird.position <= 0) {
        return true;
    }

    return pipes.find((p) => {
        if (
            30 >= p.x - distance && 30 <= p.x + 20 - distance
            && (bird.position <= p.range.from || bird.position >= p.range.to)
        ) {
            return true;
        }
    } )
}

const createWorld = () => {

    const updateListeners = [];

    let time = 0;
    let pipes = [];
    let bird = {
        position: 300,
        velocity: 0,
    };
    let started = null;

    const endAnimation = animationLoop((deltaTime) => {
        time += deltaTime;

        if (started) {
            bird = chain(bird,
                (bird) => gravity(bird, deltaTime ),
                (bird) => physics(bird, deltaTime ),
            );

            pipes = setPipes(pipes, time * xSpeed);

            // Collision

            if (collide(bird, pipes, time * xSpeed)) {
                endAnimation();
            }

        }
        updateListeners.forEach((l) => l());
    });

    return {
        getView: () => ({
            distance: time * xSpeed,
            time,
            bird,
            pipes,
        }),
        flap: () => {
            if (!started) {
                started = {
                    time,
                };
            }
            bird = {
                ...bird,
                velocity: 0.6,
            };
        },
        onUpdated: addRemove(updateListeners),
    };
};

exports.createWorld = createWorld;

const gravity = (bird, dt) => ({
    ...bird,
    velocity: bird.velocity - dt * 0.0015,
});

const physics = (bird, dt) => ({
    ...bird,
    position: Math.max( 0, bird.position + dt * bird.velocity ),
});

const setPipes = (pipes, distance) => {
    pipes = pipes.filter((p) => p.x >= distance - 50);

    for (;;) {
        const lastX = pipes.length === 0 ? distance + 30 : pipes[pipes.length - 1].x;
        if (lastX < distance + 200) {
            const from = Math.random() * (180) + 100;
            const height = Math.random() * (100) + 100;
            pipes.push({
                x: lastX + 80,
                range: {from, to: from + height},
            });
        } else {
            break;
        }
    }

    // console.log(pipes[0].x);

    return pipes;
};