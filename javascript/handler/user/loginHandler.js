// Importando funções do LocalStorage
import * as localStorageHelper from '../../helper/localStorageHelper.js';

export function login(event) {
  event.preventDefault(); 

  const requestLogin = document.getElementById('login').value;
  const requestPassword = document.getElementById('password').value;

  const objDados = localStorageHelper.getDados();

  const response = objDados.users.filter(u => u.login === requestLogin && u.password === requestPassword);

  if (response.length) {
    window.location.href = '/src/views/posicao.html';
  } else {
    alert('Dados inválidos');
  }
}
