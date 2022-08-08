
const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;

export const getCars = async (page, limit = 5) => {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
    };
}

export const getCar = async (id) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body) => (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
})).json();

export const deleteCar = async (id) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id, body) => (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
})).json();

export const startEngine = async (id) => (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id) => {
    const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...base(await res.json()) }
};