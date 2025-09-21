document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        messageDiv.textContent = '';
        messageDiv.className = 'message';

        const requestBody = {
            nome: data.usuario,
            senha: data.senha,
        };

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (response.ok) {
                messageDiv.textContent = 'Login bem-sucedido! Redirecionando...';
                messageDiv.classList.add('success');
                
                localStorage.setItem('authToken', result.token);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } else {
         
                messageDiv.textContent = result.message || 'Falha no login. Verifique suas credenciais.';
                messageDiv.classList.add('error');
            }

        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            messageDiv.textContent = 'Não foi possível conectar ao servidor.';
            messageDiv.classList.add('error');
        }
    });
});