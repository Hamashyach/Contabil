document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

  
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

       
        messageDiv.textContent = '';
        messageDiv.className = 'message';

     
        const requestBody = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            cnpj: data.cnpj
        };
        
        
        try {
           
            const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (response.ok) {
                
                messageDiv.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
                messageDiv.classList.add('success');
                
                form.reset();

                
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 2000);

            } else {
             
                messageDiv.textContent = result.message || 'Ocorreu um erro no cadastro.';
                messageDiv.classList.add('error');
            }

        } catch (error) {
            
            console.error('Erro ao cadastrar:', error);
            messageDiv.textContent = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
            messageDiv.classList.add('error');
        }
    });
});