// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js'
import { showAlert } from '../../service/sweetalert2.all.min.js'

export function loadHospitaisInformations() {

    const content = document.querySelector("#main-conteiner");

    const data = db.getDados();
    const hospitais = data.hospitais;

    hospitais.forEach(hospital => {
        content.innerHTML += `
            <div class="hospitalUm">
                <a class="hospital1">${hospital.name}</a>
                <a class="xizinho fa-solid fa-x" id="${hospital.id}" href="#"></a>
                <a class="exclamacaozinha fa-solid fa-pencil" href="/src/views/editarHospital.html?id=${hospital.id}"></a>
            </div>
        `;
    });

    const arrayRemoveHospitaisButtons = document.querySelectorAll('.xizinho');

    Array.from(arrayRemoveHospitaisButtons).forEach(button => {
        button.addEventListener('click', async(event) => {
            const id = event.target.getAttribute('id');
            showAlert(id);
            
        });
    });
}
