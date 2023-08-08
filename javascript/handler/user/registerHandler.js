// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js'

export function register(event) {
    event.preventDefault();

    const objDados = db.getDados();

    const fields = [
        { id: 'inputEmail', target: 'login' },
        { id: 'inputPassword', target: 'password' },
        { id: 'inputName', target: 'username' },
        { id: 'inputCep', target: 'address' },
        { id: 'inputRua', target: 'rua' },
        { id: 'inputNumeroCasa', target: 'numeroCasa' },
        { id: 'inputBairro', target: 'bairro' },
        { id: 'inputCidade', target: 'cidade' },
        { id: 'inputEstado', target: 'uf' },
        { id: 'inputCpf', target: 'cpf' },
        { id: 'inputDtNascimento', target: 'dtNascimento' },
        { id: 'selectConvenio', target: 'convenioId' },
        { id: 'inputNumeroID', target: 'numeroConvenio' },
    ];

    const userInformation = {};
    fields.forEach(field => {
        userInformation[field.target] = document.getElementById(field.id).value;
    });

    userInformation.id = db.generateId();
    userInformation.prioridadeId = 0;

    const response = objDados.users.filter(u => u.login === userInformation.login);

    if (response.length === 0) {
        objDados.users.push(userInformation);
        db.setDados(objDados);
        alert('Usuário criado com sucesso!');
        return (window.location.href = 'index.html');
    }

    return alert('Usuário já foi cadastrado com esses dados!');
}
