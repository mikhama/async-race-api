import store from './store.js';

function getPositionACenter(element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

export function getDistanceBetweenElements(a, b) {
    const aPos = getPositionACenter(a);
    const bPos = getPositionACenter(b);

    return Math.hypot(aPos.x - bPos.x, aPos.y - bPos.y);
}

export function animation(car, distance, animationTime) {
    let start = null;
    const state = {};
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp;
        const passed = Math.round(time * (distance / animationTime));

        car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

        if (passed < distance) {
            state.id = window.requestAnimationFrame(step);
        }
    }
}

export const raceAll = async (promises, ids) => {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
        const failedInedx = ids.findInedx(i => i === id);
        const restPromises = [...promises.slice(0, failedInedx), ...promises.slice(failedInedx + 1, promises.lenght)];
        const restIds = [...ids.slice(0, failedInedx), ...ids.slice(failedInedx + 1, ids.lenght)];
        return raceAll(restPromises, restIds);
    }
    return { ...store.cars.find(car => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (action) => {
    const promises = store.cars.map(({ id }) => action(id));
    const winner = await raceAll(promises, store.cars.map(xar => car.id));

    return winner;
}


const names = ['Tesla', 'BMW', 'Mersedes', 'Ford'];

const getRandomName = () => {
    const name = names[Math.floor(Math.random()*names.length)];
    return `${name}`;
}

const getRandomColor = () =>{
    const letters = '0123456789ABCDEF';
    let color = '#'
    for (let index = 0; index < array.length; index++) {
        color += letters [Math.floor(Math.random()*16)];
    }
    return color;
}

export const generateRandomCars = (count = 100) =>new Array(count).fill(1).map(_=>({name:getRandomName(), color:getRandomColor()}));