// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js'

function upPacienteInQueue(pacienteId) {
    const data = db.getDados();
    const queue = data.fila;

    const index = queue.findIndex(p => p.id === pacienteId);

    if (index >= 1) {
        [queue[index - 1], queue[index]] = [queue[index], queue[index - 1]];
    }

    data.fila = queue;
    
    db.setDados(data);

    location.reload();
}

function downPacienteInQueue(pacienteId) {
    const data = db.getDados();
    const queue = data.fila;

    const index = queue.findIndex(p => p.id === pacienteId);

    if (index > -1 && index < queue.length - 1) {
        [queue[index + 1], queue[index]] = [queue[index], queue[index + 1]];
    }

    data.fila = queue;
    
    db.setDados(data);

    location.reload();
}

function removeUserInQueueHandler(userId) {
    const userInformations = db.getUser(userId);
    db.removeUserInQueue(userInformations);
} 

export function loadPacientesInQueue() {

    const content = document.getElementById("main-container");

    const data = db.getDados();
    const pacientes = data.fila;

    pacientes.forEach(paciente => {
        content.innerHTML += `
            <div class="pacienteUm">
                <a class="paciente1">${paciente.username}</a>
                <a class="xizinho fa-solid fa-times" id=${paciente.id} style="cursor:pointer"></a>
                <a class="ciminha fa-solid fa-chevron-up" id=${paciente.id} style="cursor:pointer"></a>
                <i class="baixinho fa-solid fa-chevron-down" id=${paciente.id} style="cursor:pointer"></i>
            </div>
        `;
    });

    const arrayRemovePacientesInQueueButtons = document.querySelectorAll('.xizinho');

    Array.from(arrayRemovePacientesInQueueButtons).forEach(button => {
        button.addEventListener('click', async (event) => {
            const pacienteId = event.target.getAttribute('id');
            removeUserInQueueHandler(pacienteId);
        });
    });

    const arrayUpPacientesInQueueButtons = document.querySelectorAll('.ciminha');

    Array.from(arrayUpPacientesInQueueButtons).forEach(button => {
        button.addEventListener('click', async (event) => {
            const pacienteId = event.target.getAttribute('id');
            upPacienteInQueue(pacienteId);
        });
    });

    const arrayDownPacientesInQueueButtons = document.querySelectorAll('.baixinho');

    Array.from(arrayDownPacientesInQueueButtons).forEach(button => {
        button.addEventListener('click', async (event) => {
            const pacienteId = event.target.getAttribute('id');
            downPacienteInQueue(pacienteId);
        });
    });
}


