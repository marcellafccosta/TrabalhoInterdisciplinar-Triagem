// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js';

export function removeUserAccount() {
    const urlParams = new URLSearchParams(location.search);
    const userLogin = urlParams.get('login');
    const userInformations = db.getUserInformation(userLogin);
    db.removeUser(userInformations);
    return (window.location.href = '/src/views/index.html');
} 

document.getElementById('icon-remove-user').addEventListener('click', removeUserAccount);