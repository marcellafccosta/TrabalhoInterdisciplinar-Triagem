// Importando funções do LocalStorage
import {calcularPrioridade} from '../javascript/localStorageHandler.js';

export function handleRoute(route) {

    const uri = window.location.href;

    const queryParameters = new URLSearchParams(new URL(uri).search);
    const serializedData = queryParameters.get('data');
    const objFromURI = JSON.parse(decodeURIComponent(serializedData));

    switch (route) {
        case 'sintomas-save':
            // calcularPrioridade(objFromURI);
            console.log("teste");
            break;
        default:
            content.textContent = 'Página não encontrada';
            break;
    }
}

export function navigateTo(route) {
    window.history.pushState(null, null, route);
    handleRoute(route);
}
