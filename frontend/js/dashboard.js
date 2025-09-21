document.addEventListener('DOMContentLoaded', () => {

    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
       
        window.location.href = 'index.html';
        return; 
    }

    const userNameSpan = document.getElementById('user-name');
    userNameSpan.textContent = 'Nome do Usuário'; 
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });
});


function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}
