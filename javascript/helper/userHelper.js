// Importando funções do LocalStorage
import * as db from './localStorageHelper.js'

export function loadUserInformations() {
    const urlParams = new URLSearchParams(window.location.search);
    const userLogin = urlParams.get('login');
    const userInformations = db.getUserInformation(userLogin);

    console.log(userInformations);

    const fields = [
        { id: 'inputEmail', value: userInformations[0].login },
        { id: 'inputPassword', value: userInformations[0].password },
        { id: 'inputName', value: userInformations[0].username },
        { id: 'inputCpf', value: userInformations[0].cpf },
        { id: 'inputDtNascimento', value: db.formatDateToShow(userInformations[0].dtNascimento) },
        { id: 'selectConvenio', value: userInformations[0].convenioId },
        { id: 'inputNumeroID', value: userInformations[0].numeroConvenioId }
    ];

    fields.forEach(field => {
        document.getElementById(field.id).value = field.value;
    });
}