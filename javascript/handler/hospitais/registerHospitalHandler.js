// Importando funções do LocalStorage
import * as localStorage from '../../helper/localStorageHelper.js'
import * as db from '../../helper/hospitalHelper.js'

export function registerHospital(event) {
    event.preventDefault();

    const objDados = localStorage.getDados();

    const fields = [
        { id: 'inputName', target: 'name' },
        { id: 'inputEmail', target: 'login' },
        { id: 'inputCNPJ', target: 'cnpj' },
        { id: 'inputTel', target: 'tel' },
        { id: 'inputCNES', target: 'cnes' },
        { id: 'inputCep', target: 'cep' },
        { id: 'inputRua', target: 'rua' },
        { id: 'inputNumero', target: 'numeroHospital' },
        { id: 'inputBairro', target: 'bairro' },
        { id: 'inputCidade', target: 'cidade' },
        { id: 'inputEstado', target: 'uf' }
    ];

    const hospitalInformation = {};
    fields.forEach(field => {
        hospitalInformation[field.target] = document.getElementById(field.id).value;
    });

    hospitalInformation.id = db.generateHospitalId();

    const response = objDados.hospitais.filter(h => h.cnpj === hospitalInformation.cnpj);

    if (response.length === 0) {
        objDados.hospitais.push(hospitalInformation);
        localStorage.setDados(objDados);
        alert('Hospital criado com sucesso!');
        return (window.location.href = 'listagem.html');
    }

    return alert('Hospital já cadastrado!');
}
