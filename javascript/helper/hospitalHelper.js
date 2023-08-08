// Importando funções do LocalStorage
import * as db from '../helper/localStorageHelper.js'

export function getHospital(hospitalId) {
    if (hospitalId) {
        const data = db.getDados();
        const hospital = data.hospitais.find(h => h.id === hospitalId);
    
        return hospital ? [hospital] : [];
    }
}

export function editHospital(hospitalInformation) {
    if (!hospitalInformation) {
        throw new Error('Hospital Information is empty');
    }

    const data = db.getDados();
    const hospitalIndex = data.hospitais.findIndex(h => h.id === hospitalInformation.id);

    if (hospitalIndex > -1) {
        data.hospitais[hospitalIndex] = hospitalInformation;
        db.setDados(data);
    }
}

export function removeHospital(id) {

    if (!id) {
        throw new Error('Hospital Identifier is empty');
    }

    const data = db.getDados();
    const hospital = getHospital(id);

    if (!hospital[0]) throw new Error('Hospital não encontrado!');

    const hospitalIndex = data.hospitais.findIndex(h => h.id === id);

    if (hospitalIndex > -1) {
        data.hospitais.splice(hospitalIndex, 1);
        db.setDados(data);
    }
}

export function generateHospitalId() {

    const data = db.getDados();

    return data.users[data.hospitais.length - 1].id += 1;

}

export function loadHospitalInformations() {

    const data = db.getDados();
    const hospitais = data.hospitais

    const urlParams = new URLSearchParams(window.location.search);
    const hospitalIdArray = urlParams.getAll('id');
    const hospitalId = hospitalIdArray.length > 0 ? hospitalIdArray[0] : null;

    const index = hospitais.findIndex(h => h.id === hospitalId);

    if(hospitalId && index > -1){
        const fields = [
            { id: 'inputName', value: hospitais[index].name },
            { id: 'inputEmail', value: hospitais[index].login },
            { id: 'inputCNPJ', value: hospitais[index].cnpj },
            { id: 'inputTel', value: hospitais[index].tel },
            { id: 'inputCNES', value: hospitais[index].cnes },
            { id: 'inputCep', value: hospitais[index].cep },
            { id: 'inputRua', value: hospitais[index].rua },
            { id: 'inputNumero', value: hospitais[index].numeroHospital },
            { id: 'inputBairro', value: hospitais[index].bairro },
            { id: 'inputCidade', value: hospitais[index].cidade },
            { id: 'inputEstado', value: hospitais[index].uf }
        ];
    
        fields.forEach(field => {
            document.getElementById(field.id).value = field.value;
        });
    }

}
