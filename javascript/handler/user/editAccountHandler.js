// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js';

export function editUserInformation(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    const userLogin = urlParams.get('login');
    const userInformations = db.getUserInformation(userLogin);

    const fields = [
        { id: 'inputEmail', target: 'login' },
        { id: 'inputPassword', target: 'password' },
        { id: 'inputName', target: 'username' },
        { id: 'inputAddress', target: 'address' },
        { id: 'inputCpf', target: 'cpf' },
        { id: 'selectConvenio', target: 'convenioId' },
        { id: 'inputNumeroID', target: 'numeroConvenioId' },
        { id: 'inputDtNascimento', target: 'dtNascimento', formatter: db.formatDateToSave },
    ];

    const userNewInformations = {};
    fields.forEach(field => {
        const value = document.getElementById(field.id).value;
        const formattedValue = field.formatter ? field.formatter(value) : value;
        userNewInformations[field.target] = formattedValue;
    });

    userNewInformations.id = userInformations[0].id;
    db.editUser(userNewInformations);
    alert('Dados Salvos com sucesso!');
}
