import * as cookieHelper from '../javascript/cookieHelper.js';

const SESSION_COOKIE_NAME = 'session';

//Limite de Seesion definida de 24 horas

export function startSession(userId) {
  cookieHelper.setCookie(SESSION_COOKIE_NAME, userId, 1); 
}

export function endSession() {
  cookieHelper.deleteCookie(SESSION_COOKIE_NAME);
}

export function getSessionUserId() {
  return cookieHelper.getCookie(SESSION_COOKIE_NAME);
}

export function isSessionActive() {
  return getSessionUserId() !== null;
}
