// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js';

export function calcularPrioridade(pontuacao) {

  const urlParams = new URLSearchParams(location.search);
  const userLogin = urlParams.get('login');

  const userInformations = db.getUserInformation(userLogin);

  console.log(userInformations);

  if (pontuacao <= 7) {
    userInformations.prioridadeId = 0;
  } else if (pontuacao >= 8 && pontuacao <= 14) {
    userInformations.prioridadeId = 1;
  } else {
    userInformations.prioridadeId = 2;
  }

  db.editUser(userInformations);

  db.addInQueue(userInformations);

  return (window.location.href = "posicao.html?login=" + userInformations.login);
}