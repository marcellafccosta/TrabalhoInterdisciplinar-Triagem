// Importando funções do LocalStorage
import * as db from '../../helper/localStorageHelper.js'

export function validatePasswordCodeReset(event) {
  event.preventDefault();

  const requestRecoverPassword = document.getElementById('inputCode');

  const data = db.getDados();

  if (requestRecoverPassword.value !== '') {
    const response = data.users.filter(
      (u) => u.recoverPasswordHash === requestRecoverPassword.value
    );

    if (response.length === 1) {
      alert('Código Correto!');
      const userInformations = db.getUserInformation(response[0].login);
      const url = `/src/views/mudarsenha.html?login=${userInformations[0].login}`;
      window.location.href = url;
      return;
    }

    alert('Código Inválido');
    return;
  }

  alert('Código Inválido');
}

export function arrayBufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (byte) => ('00' + byte.toString(16)).slice(-2))
    .join('');
}

async function generateRandomHash() {
  const randomValue = Math.random().toString();
  const encoder = new TextEncoder();
  const data = encoder.encode(randomValue);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(buffer);
}

export async function sendEmailToRecoverPassword(userInformations) {

  emailjs.init('XzwQxq6cJ7BeL9je8');

  const hash = await generateRandomHash().catch((error) => console.error(error));

  const emailParams = {
    from_name: 'healthytracktiaw@gmail.com',
    user_name: userInformations.username,
    user_email: userInformations.login,
    message: hash,
  };

  const serviceID = 'service_1wcj8cp';
  const templateID = 'template_0nr6dgw';

  emailjs
    .send(serviceID, templateID, emailParams)
    .then((res) => alert('Email enviado com sucesso!!'))
    .catch((err) => console.log(err));

  return hash;
}

export async function recoverPassword(event) {
  event.preventDefault();

  const requestEmail = document.getElementById('inputEmail');

  const userInformations = db.getUserInformation(requestEmail.value);

  if (userInformations.length) {
    const hash = await sendEmailToRecoverPassword(userInformations[0]);
    db.editUserPassword(userInformations, hash);
    document.getElementById('inputEmail').value = '';
  } else {
    alert('Email não encontrado!!');
    document.getElementById('inputEmail').value = '';
  }
}

export function changeUserPassword(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const userLogin = urlParams.get('login');

  const userInformations = db.getUserInformation(userLogin);

  const senha = document.getElementById('password-code').value;
  const senhaConfirm = document.getElementById('password-code-confirm').value;

  if (senha === senhaConfirm && senha !== '' && senhaConfirm !== '') {
    userInformations[0].password = senha;
    db.editUser(userInformations[0]);
    alert('Senha Alterada com sucesso!');
    window.location.href = '/src/views/index.html';
  } else {
    alert('Senhas não são válidas!');
  }
}

// document.getElementById('form-ckeck-recover-password-code').addEventListener('submit', (event) => changeUserPassword(event));
