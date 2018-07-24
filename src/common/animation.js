const animationLoop = (fn) => {
    let stopped = false;
    let lastRun = null;

    const recursiveRun = () => {
        if (stopped) {
            return;
        }

        requestAnimationFrame(() => {
            let now = new Date().getTime();
            let deltaTime = lastRun === null ? 0 : now - lastRun;
            fn(deltaTime);
            lastRun = now;

            recursiveRun();
        });
    };

    recursiveRun();

    return () => stopped = true;
};

exports.animationLoop = animationLoop;