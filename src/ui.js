import { getCar, getCars, createCar, deleteCar, updateCar, startEngine, stopEngine, drive } from "./api";
import store from "./store";
import { animation, getDistanceBetweenElements, race, generateRandomCars } from "./utils";

let selectedCar = null;
const getCarImage = (color) => `
    <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 612.001 612.001" style="enable-background:new 0 0 612. 612.001; fill:${color}" xml:space="preserve">
<g>
	<path d="M589.333,276.033c-11.234-3.756-89.378-20.834-89.378-20.834s-144.86-82.375-162.245-82.375s-136.639,0.053-136.639,0.053
		c-29.137,0-53.487,22.203-81.68,47.909c-13.287,12.112-27.953,25.442-44.13,37.299l-60.249,8.011
		C6.306,268.872,0,277.018,0,286.643v69.03c0,11.913,9.656,21.571,21.57,21.571h41.401c3.007,34.65,32.153,61.932,67.57,61.932
		c35.415,0,64.563-27.283,67.57-61.931h197.687c3.007,34.65,32.153,61.931,67.57,61.931s64.563-27.283,67.57-61.931h34.013
		c26.95,0,40.119-11.64,43.426-22.566C616.739,327.03,610.724,283.185,589.333,276.033z M130.541,406.48
		c-19.38,0-35.148-15.766-35.148-35.146s15.766-35.148,35.148-35.148c19.38,0,35.146,15.766,35.146,35.148
		C165.688,390.714,149.921,406.48,130.541,406.48z M261.008,255.201H143.134c8.526-6.736,16.409-13.886,23.671-20.505
		c19.086-17.402,35.57-32.432,55.294-32.432c0,0,17.85-0.008,38.91-0.017V255.201z M289.711,202.236
		c14.588-0.005,27.592-0.009,34.116-0.009c16.245,0,82.135,38.264,106.864,52.975h-140.98L289.711,202.236L289.711,202.236z
		 M463.367,406.48c-19.38,0-35.146-15.766-35.146-35.146s15.766-35.148,35.146-35.148c19.38,0,35.148,15.766,35.148,35.148
		C498.515,390.714,482.747,406.48,463.367,406.48z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`;
const renderCar = ({ id, name, color, isEngineStarted }) => `

<div class="cars">
    <div class="box-btn">
        <button class="btn btn-select" id="select-car-${id}">Select</button>
        <button class="btn btn-remove" id="remove-car-${id}">Remove</button>
        <span class="name-car">${name}</span>
    </div>
    <div class="box-car">
        <button class="btn-cars btnA" id="start-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}>A</button>
        <button class="btn-cars btnB" id="stop-engine-car-${id}" ${!isEngineStarted ? 'disabled' : ''}>B</button>
        <div class="car" id="car-${id}">
            ${getCarImage(color)}
        </div>
    </div>
</div>
<div class="finish" id="finish-${id}">
    <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/FA5252/external-finish-line-achievements-flaticons-flat-flat-icons.png" />
</div>

`;

const renderGarage = () => `

<h1>Garege (${store.carsCount})</h1>
<h3>Page #((${store.carsPage})</h3>
<div class="cars-bloks">
    ${store.cars.map((car) => renderCar(car)).join('')}
</div>
`;

export const render = async () => {
    const html = `
        <div class="wrapper">
        <div class="header-btn-blocks">
            <div class="btn-boxs">
                <button class="btn-to-garage btn" id="to_garage">to garage</button>
            </div>
            <div class="btn-boxs">
                <button class="btn-to-winners btn" id="to_winners">to winners</button>
            </div>
        </div>
        <div class="color-blocks">
            <div class="create-cl-box" id="create>
                <input type="text" name="name" id="create-name">
                <input type="color" class="color" id="create-color"></input>
                <button class="btn-create">create</button>
            </div>
            <div class="update-cl-box" id="update>
                <input type="text" name="name" id="update-name" disabled>
                <input type="color" class="color" id="update-color" disabled></input>
                <button class="btn-update btn">update</button>
            </div>
        </div>
        <div class="btn-blocks">
            <button class="btn btn-race" id="race>Race</button>
            <button class="btn btn-reset" id="reset>Reset</button>
            <button class="btn generator" id="generator>Generate Cars</button>
        </div>
        <div class="main-page" id="garage">
            ${renderGarage()}
        </div>
            <div class="navigation">
                <div class="prev-item">
                    <button class="btn btn-prev" disabled id="prev">Prev</button>
                </div>
                <div class="next-item">
                    <button class="btn btn-next" disabled id="next">Next</button>
                </div>
            </div>
        </div>
    </div>
    `;

    const root = document.createElement('div');
    root.innerHTML = html;
    document.body.appendChild(root);
};

export const updateStateGarage = async () => {
    const { item, count } = await getCars(store.carsPage);
    store.cars = items;
    store.carsCount = count;

    if (store.carsPage * 5 < store.carsCount) {
        document.getElementById('next').disabled = false;
    }
    else {
        document.getElementById('next').disabled = true;
    }
    if (store.carsPage > 1) {
        document.getElementById('prev').disabled = false;
    }
    else {
        document.getElementById('prev').disabled = true;
    }
}

const startDriving = async (id) => {
    const startButton = document.getElementById(`start-engine-car-${id}`);
    startButton.disabled = true;
    startButton.classList.toggle('enabling', true);

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);

    startButton.classList.toggle('enabling', false);
    document.getElementById(`stop-engine-car-${id}`).disabled = false;

    const car = document.getElementById(`car-${id}`);
    const finsh = document.getElementById(`finish-${id}`);
    const htmlDistance = Math.floor(getDistanceBetweenElements(car, finsh)) + 100;
    store.animation[id] = animation(car, htmlDistance, time);

    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(store.animation[id].id);

    return { success, id, time };
};

const stopDriving = async (id) => {
    const stopButton = document.getElementById(`stop-engine-car-${id}`);
    stopButton.disabled = true;
    stopButton.classList.toggle('enabling', true);
    await stopEngine(id);
    stopButton.classList.toggle('enabling', false);
    document.getElementById(`start-engine-car-${id}`).disabled = false;

    const car = document.getElementById(`car-${id}`);
    car.style.transform = `tarnslateX(0)`;
    if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};
// export const listen = () => {
//     document.body.addEventListener('click', async (event) => {
//         if (event.target.classList.contains('start-engine-button')) {
//             const id = +event.target.id.split('start-engine-car-'[1]);
//             startDriving(id);

//         }

//         if (event.target.classList.contains('stop-engine-button')) {
//             const id = +event.target.id.split('stop-engine-car-'[1]);
//             stopDriving(id);

//         }

//         if (event.target.classList.contains('btn-select')) {

//             selectedCar = await getCar(event.target.id.split('select-car-')[1]);
//             document.getElementById('update-color').value = selectedCar.color;
//             document.getElementById('update-name').value = selectedCar.name;
//             document.getElementById('update-name').disabled = false;
//             document.getElementById('update-color').disabled = false; 
//             document.getElementById('update-submit').disabled = false;

//             if (event.target.classList.contains('btn-remove')) {
//                 const id = +event.target.id.split('remove-car-'[1]);
//                 await deleteCar(id);
//                 await updateStateGarage();
//                 document.getElementById('garage').innerHTML = renderGarage();
//             }
//             if (event.target.classList.contains('generator')) {
//                 event.target.disabled = true;
//                 const cars = generateRandomCars();
//                 await Promise.all(car.map(async c =>await createCar(c)));
//                 await updateStateGarage();
//                 document.getElementById('garge').innerHTML = renderGarage();
//                 event.target.disabled = false;
//             }
//         }
//     }
// });
