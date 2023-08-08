// Importando funções do LocalStorage
import {getHospital, editHospital} from '../../helper/hospitalHelper.js'

export function editHospitalInformation(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    const hospitalId = urlParams.get('id');
    const hospitalInformations = getHospital(hospitalId);

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

    const hospitalNewInformations = {};
    fields.forEach(field => {
        const value = document.getElementById(field.id).value;
        const formattedValue = field.formatter ? field.formatter(value) : value;
        hospitalNewInformations[field.target] = formattedValue;
    });

    hospitalNewInformations.id = hospitalInformations[0].id;
    editHospital(hospitalNewInformations);
    alert('Dados Salvos com sucesso!');
}
