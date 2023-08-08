
export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
}

export function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') { // Encontra o Cookie removendo os espaços em branco
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) === 0) { // Resgata o valor do Cookie
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }

    return;
}

// expires=Thu, 01 Jan 1970 00:00:00 UTC; -> Default Value to Reset a Cookie
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
