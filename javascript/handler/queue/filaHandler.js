// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js'

export function renderUserInformationsInQueue() {

    const data = db.getDados();
    const urlParams = new URLSearchParams(location.search);
    const userLogin = urlParams.get('login');

    if (userLogin) {
        const userInformations = db.getUserInformation(userLogin);

        let response;

        switch (userInformations[0].prioridadeId) {
        case 1:
            response = "red";
            break;

        case 2:
            response = "orange";
            break;

        default:
            response = "green";
            break;
        }

        userInformations[0].color = response;
        let userIndex =  data.users.findIndex(u => u.id ===  userInformations[0].id);
        data.users[userIndex] = userInformations[0];

        db.setDados(data);

        const posicaoAtualElement = document.getElementById('posicao_atual');
        posicaoAtualElement.style.backgroundColor = response;

        const posicaoElement = document.getElementById('posicao');
        posicaoElement.innerHTML = db.getUserPosition(userInformations) + '°';

    } else {
        
        const posicaoAtualElement = document.getElementById('posicao_atual');
        posicaoAtualElement.style.backgroundColor = 'white';

        const posicaoElement = document.getElementById('posicao');
        posicaoElement.innerHTML = 'Usuário não cadastrado em fila!';
        posicaoElement.style.fontSize = '20px';
        posicaoElement.style.color = 'black';
    }
}
