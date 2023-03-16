const totalRegisters = document.querySelector('#totalRegisters');
const rowData = document.querySelector('#rowData');

window.onload = async () => {
    const endpoint = 'https://api.datos.gob.mx/v1/condiciones-atmosfericas';
    const dataEndpoint = await getData(endpoint);

    totalRegisters.innerHTML = 'Total de registros = ' + dataEndpoint.pagination.total;

    const results = await dataEndpoint.results;
    results.forEach(result => printData(result));
}

const getData = async (url) => {
    try {
        const request = await fetch(url);
        if (request.status === 200) {
            const requestJSON = await request.json();
            return requestJSON;
        }
    } catch (error) {
        console.error(error);
    }
}

const printData = async (row) => {
    const cage = document.createElement('tr');
    const c1 = document.createElement('td');
    const c2 = document.createElement('td');
    const c3 = document.createElement('td');
    const c4 = document.createElement('td');
    const c5 = document.createElement('td');
    const c6 = document.createElement('td');
    const c7 = document.createElement('td');
    const c8 = document.createElement('td');

    c1.classList.add('px-1', 'py-1', 'font-semibold');
    c2.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c3.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c4.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c5.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c6.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c7.classList.add('whitespace-nowrap', 'px-6', 'py-4');
    c8.classList.add('whitespace-nowrap', 'px-6', 'py-4', 'font-semibold');

    c1.innerHTML = row._id;
    c2.innerHTML = row.cityid;
    c3.innerHTML = row.name;
    c4.innerHTML = row.state;
    c5.innerHTML = row.probabilityofprecip;
    c6.innerHTML = row.relativehumidity;
    c7.innerHTML = row.lastreporttime;

    if(parseInt(row.probabilityofprecip) > 60 || parseInt(row.relativehumidity) > 50){
        c8.innerHTML = 'Llueve'
        c8.classList.add('text-blue-600');
    }else{
        c8.innerHTML = 'NO llueve'
        c8.classList.add('text-orange-600');
    }

    cage.appendChild(c1);
    cage.appendChild(c2);
    cage.appendChild(c3);
    cage.appendChild(c4);
    cage.appendChild(c5);
    cage.appendChild(c6);
    cage.appendChild(c7);
    cage.appendChild(c8);

    rowData.appendChild(cage);
}