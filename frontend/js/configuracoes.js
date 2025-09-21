document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';
    const authToken = localStorage.getItem('authToken');


    const formPanel = document.getElementById('form-panel-conta');
    const contaForm = document.getElementById('conta-form');
    const formTitle = document.getElementById('form-title');
    const contaIdInput = document.getElementById('conta-id');
    const btnSalvar = document.getElementById('btn-salvar-conta');
    
  
    const btnNovaConta = document.getElementById('btn-nova-conta');
    const btnCancelar = document.getElementById('btn-cancelar-conta');
    

    const tbody = document.getElementById('plano-contas-tbody');

   
    const formatCurrency = (value) => parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  
    async function apiRequest(endpoint, method = 'GET', body = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        };
        if (body) options.body = JSON.stringify(body);
        
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Erro na requisição ${method}`);
        }
        
        return response.status !== 204 ? response.json() : null;
    }

 
    async function carregarPlanoDeContas() {
        try {
            const contas = await apiRequest('/setup');
            tbody.innerHTML = ''; 

            contas.forEach(conta => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${conta.codigo}</td>
                    <td>${conta.nome_conta}</td>
                    <td>${conta.grupo_contabil}</td>
                    <td class="text-right">${formatCurrency(conta.saldo_inicial || 0)}</td>
                    <td class="text-center action-buttons">
                        <button class="btn-action btn-edit" data-id="${conta.id}"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-action btn-delete" data-id="${conta.id}"><i class="fas fa-trash-alt"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro:', error);
            tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="color:red;">${error.message}</td></tr>`;
        }
    }

    
    function resetForm() {
        formPanel.style.display = 'none';
        contaForm.reset();
        contaIdInput.value = '';
        formTitle.textContent = 'Adicionar Nova Conta';
        btnSalvar.textContent = 'Salvar Conta';
    }

   
    async function prepararEdicao(id) {
        try {
            const conta = await apiRequest(`/setup/${id}`);
            contaIdInput.value = conta.id;
            document.getElementById('codigo').value = conta.codigo;
            document.getElementById('nome_conta').value = conta.nome_conta;
            document.getElementById('grupo_contabil').value = conta.grupo_contabil;
            document.getElementById('saldo_inicial').value = conta.saldo_inicial;
            
            formTitle.textContent = 'Editar Conta';
            btnSalvar.textContent = 'Atualizar';
            formPanel.style.display = 'block';
        } catch (error) {
            alert('Não foi possível carregar os dados da conta para edição.');
        }
    }
    

    async function deletarConta(id) {
        if (confirm('Tem certeza que deseja excluir esta conta?')) {
            try {
                await apiRequest(`/setup/${id}`, 'DELETE');
                alert('Conta excluída com sucesso!');
                carregarPlanoDeContas();
            } catch (error) {
                alert(`Falha ao excluir: ${error.message}`);
            }
        }
    }

 
    btnNovaConta.addEventListener('click', () => {
        resetForm();
        formPanel.style.display = 'block';
    });
    
    btnCancelar.addEventListener('click', resetForm);

    tbody.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const id = button.dataset.id;
        if (button.classList.contains('btn-edit')) {
            prepararEdicao(id);
        }
        if (button.classList.contains('btn-delete')) {
            deletarConta(id);
        }
    });

    contaForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = contaIdInput.value;
        const isEditing = !!id;

        const contaData = {
            codigo: parseInt(document.getElementById('codigo').value),
            nome_conta: document.getElementById('nome_conta').value,
            grupo_contabil: document.getElementById('grupo_contabil').value,
            saldo_inicial: parseFloat(document.getElementById('saldo_inicial').value)
        };

        try {
            if (isEditing) {
                await apiRequest(`/setup/${id}`, 'PUT', contaData);
                alert('Conta atualizada com sucesso!');
            } else {
                await apiRequest('/setup', 'POST', contaData);
                alert('Conta salva com sucesso!');
            }
            resetForm();
            carregarPlanoDeContas();
        } catch (error) {
            alert(`Falha ao salvar: ${error.message}`);
        }
    });


    carregarPlanoDeContas();
});