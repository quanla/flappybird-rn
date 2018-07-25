import {addRemove} from "./common/utils/collections";
import {animationLoop} from "./common/animation";
import {chain} from "./common/utils/fs";

const xSpeed = 0.18;

const createWorld = ({width, height}) => {
    const updateListeners = [];

    let time = 0;
    let pipes = [];
    let bird = {
        position: (height - 112) / 3,
        velocity: 0,
    };
    let started = null;
    let ended = null;

    const endAnimation = animationLoop((deltaTime) => {
        time += deltaTime;

        if (started) {
            bird = chain(bird,
                (bird) => gravity(bird, deltaTime ),
                (bird) => physics(bird, deltaTime ),
            );

            pipes = setPipes(pipes, time * xSpeed, width);

            // Collision

            if (collide(bird, pipes, time * xSpeed)) {
                ended = true;
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
            ended,
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

const setPipes = (pipes, distance, width) => {
    pipes = pipes.filter((p) => p.x >= distance - 52);

    for (;;) {
        const lastX = pipes.length === 0 ? null : pipes[pipes.length - 1].x;
        if (lastX == null || lastX < distance + width - 200) {
            const from = Math.random() * (180) + 100;
            const height = Math.random() * (100) + 160;
            pipes.push({
                x: lastX == null ? (distance + width) : (lastX + 200),
                range: {from, to: from + height},
            });
        } else {
            break;
        }
    }

    return pipes;
};


function collide(bird, pipes, distance) {

    if (bird.position <= 0) {
        return true;
    }

    return pipes.find((p) => {
        if (
            100 + 34 >= p.x - distance && 100 <= p.x - distance + 52
            && (bird.position <= p.range.from || bird.position + 24 >= p.range.to)
        ) {
            return true;
        }
    } )
}
