export function getDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            users: [
                {
                    "id": "1",
                    "login": "gabriel@gmail.com",
                    "password": "1234",
                    "recoverPasswordHash": "",
                    "username": "Gabriel",
                    "address": "Rua Lobo Tavares,89",
                    "cpf": "097.299.378-23",
                    "dtNascimento": "25-01-2005",
                    "convenioId": "Unimed",
                    "numeroConvenioId": 10,
                    "prioridadeId": 1
                },
                {
                    "id": "2",
                    "login": "john.doe@example.com",
                    "password": "password123",
                    "recoverPasswordHash": "",
                    "username": "John Doe",
                    "address": "123 Main St",
                    "cpf": "123.456.789-01",
                    "dtNascimento": "10-02-1990",
                    "convenioId": "SomeInsurance",
                    "numeroConvenioId": 5,
                    "prioridadeId": 2
                },
                {
                    "id": "3",
                    "login": "jane.smith@example.com",
                    "password": "test123",
                    "recoverPasswordHash": "",
                    "username": "Jane Smith",
                    "address": "456 Elm St",
                    "cpf": "987.654.321-09",
                    "dtNascimento": "15-07-1985",
                    "convenioId": "OtherInsurance",
                    "numeroConvenioId": 3,
                    "prioridadeId": 0
                },
                {
                    "id": "4",
                    "login": "example@example.com",
                    "password": "securepass",
                    "recoverPasswordHash": "",
                    "username": "Alex Johnson",
                    "address": "789 Oak Ave",
                    "cpf": "456.789.123-45",
                    "dtNascimento": "03-12-1998",
                    "convenioId": "HealthCareInc",
                    "numeroConvenioId": 7,
                    "prioridadeId": 1
                },
                {
                    "id": "5",
                    "login": "user123@gmail.com",
                    "password": "p@ssw0rd",
                    "recoverPasswordHash": "",
                    "username": "Emma Wilson",
                    "address": "321 Pine Rd",
                    "cpf": "321.654.987-12",
                    "dtNascimento": "28-09-1992",
                    "convenioId": "Medicare",
                    "numeroConvenioId": 1,
                    "prioridadeId": 2
                }
            ],

            fila: [
                {
                    "id": "5",
                    "login": "user123@gmail.com",
                    "password": "p@ssw0rd",
                    "recoverPasswordHash": "",
                    "username": "Emma Wilson",
                    "address": "321 Pine Rd",
                    "cpf": "321.654.987-12",
                    "dtNascimento": "28-09-1992",
                    "convenioId": "Medicare",
                    "numeroConvenioId": 1,
                    "prioridadeId": 1,
                    "color": "red"
                },
                {
                    "id": "4",
                    "login": "example@example.com",
                    "password": "securepass",
                    "recoverPasswordHash": "",
                    "username": "Alex Johnson",
                    "address": "789 Oak Ave",
                    "cpf": "456.789.123-45",
                    "dtNascimento": "03-12-1998",
                    "convenioId": "HealthCareInc",
                    "numeroConvenioId": 7,
                    "prioridadeId": 0,
                    "color": "green"
                }
            ],

            hospitais: [
                {
                    name: 'Hospital A',
                    login: 'hospitala',
                    cnpj: '1234567890001',
                    tel: '1111111111',
                    cnes: '0000001',
                    cep: '12345-678',
                    rua: 'Rua Hospital A',
                    numeroHospital: '123',
                    bairro: 'Bairro A',
                    cidade: 'Cidade A',
                    uf: 'UF A'
                },
                {
                    name: 'Hospital B',
                    login: 'hospitalb',
                    cnpj: '1234567890002',
                    tel: '2222222222',
                    cnes: '0000002',
                    cep: '23456-789',
                    rua: 'Rua Hospital B',
                    numeroHospital: '456',
                    bairro: 'Bairro B',
                    cidade: 'Cidade B',
                    uf: 'UF B'
                }
            ]
        }
    }

    return objDados;
}

export function setDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

export function getUserInformation(email) {

    const data = getDados();

    return data.users.filter(u => u.login == email);
}

export function getUser(id){
    const data = getDados();

    return data.users.filter(u => u.id == id);
}

export function editUserPassword(userInformations, hash) {

    const data = getDados();

    const userIndexInArray = data.users.map(u => u.id).indexOf(userInformations[0].id);

    userInformations[0].recoverPasswordHash = hash;

    data.users[userIndexInArray] = userInformations[0];

    setDados(data);

}

export function editUser(userInformations) {

    const data = getDados();

    const userIndexInArray = data.users.map(u => u.id).indexOf(userInformations.id);

    data.users[userIndexInArray] = userInformations;

    setDados(data);

}

export function removeUser(userInformations) {

    const data = getDados();

    const userIndexInArray = data.users.map(u => u.id).indexOf(userInformations[0].id);

    if (userIndexInArray > -1) {
        data.users.splice(userIndexInArray, 1);
    }

    setDados(data);

}

export function getUserPosition(userInformations) {

    const data = getDados();

    if (data.fila.length > 0) {

        const response = data.fila.filter(u => u.email == userInformations[0].email);

        let userIndexInArray = data.fila.map(u => u.id).indexOf(response[0].email);

        return response.length == 1 ? userIndexInArray += 1 : -1

    } else {
        return 1
    }

}

export function addInQueue(userInformations) {

    const data = getDados();

    let response = data.fila.filter(u => u.login == userInformations.login);

    if (response.length == 0) {

        data.fila.push(userInformations);

        setDados(data);

        alert("Usuario adicionado a fila!");

        return window.location.href = "http://127.0.0.1:5500/src/views/index.html";

    } else {
        alert("Paciente já cadastrado!!");
    }

}

export function formatDateToShow(date) {
    var componentes = date.split("-");
    var dia = componentes[0];
    var mes = componentes[1];
    var ano = componentes[2];

    return ano + "-" + mes + "-" + dia;
}

export function formatDateToSave(date) {
    var componentes = date.split("-");
    var dia = componentes[0];
    var mes = componentes[1];
    var ano = componentes[2];
    
    return dia + "-" + mes + "-" + ano;
}

export function generateId() {

    const data = getDados();

    return data.users[data.users.length - 1].id += 1;

}

export function removeUserInQueue(userInformations) {

    const data = getDados();

    const index = data.fila.findIndex(u => u.id === userInformations[0].id);

    if (index > -1) {
        data.fila.splice(index, 1);
        setDados(data);
    }

    location.reload();

}