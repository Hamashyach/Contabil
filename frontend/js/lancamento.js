document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000'; 
    const authToken = localStorage.getItem('authToken');

    const formPanel = document.getElementById('form-panel');
    const btnNovoLancamento = document.getElementById('btn-novo-lancamento');
    const btnCancelar = document.getElementById('btn-cancelar');
    const lancamentoForm = document.getElementById('lancamento-form');
    
    const selectDebito = document.getElementById('conta_debito');
    const selectCredito = document.getElementById('conta_credito');
    const tabelaCorpo = document.querySelector('#livro-diario-table tbody');

    async function apiRequest(endpoint, method = 'GET', body = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro na requisição');
        }
        return response.json();
    }

 
    async function carregarPlanoDeContas() {
        try {
            const contas = await apiRequest('/setup'); 
            selectDebito.innerHTML = '<option value="">Selecione...</option>';
            selectCredito.innerHTML = '<option value="">Selecione...</option>';
            
            contas.forEach(conta => {
                const option = `<option value="${conta.id}">${conta.codigo} - ${conta.nome_conta}</option>`;
                selectDebito.innerHTML += option;
                selectCredito.innerHTML += option;
            });
        } catch (error) {
            console.error('Erro ao carregar plano de contas:', error);
            alert('Não foi possível carregar o plano de contas.');
        }
    }

   
    async function carregarLivroDiario() {
        try {
            const lancamentos = await apiRequest('/livro-diario'); 
            tabelaCorpo.innerHTML = ''; 

            lancamentos.forEach(l => {
                const row = `
                    <tr>
                        <td>${new Date(l.data).toLocaleDateString('pt-BR')}</td>
                        <td>${l.descricao}</td>
                        <td class="text-right">${parseFloat(l.valor).toFixed(2)}</td>
                        <td>${l.conta_debito_nome}</td> 
                        <td>${l.conta_credito_nome}</td>
                    </tr>
                `;
               
                tabelaCorpo.innerHTML += row;
            });
        } catch (error) {
            console.error('Erro ao carregar livro diário:', error);
        }
    }
    
   
    btnNovoLancamento.addEventListener('click', () => formPanel.style.display = 'block');
    btnCancelar.addEventListener('click', () => formPanel.style.display = 'none');

    lancamentoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const novoLancamento = {
            descricao: document.getElementById('descricao').value,
            data: document.getElementById('data').value,
            valor: parseFloat(document.getElementById('valor').value),
            id_conta_debito: parseInt(document.getElementById('conta_debito').value),
            id_conta_credito: parseInt(document.getElementById('conta_credito').value)
        };

        try {
            await apiRequest('/livro-diario', 'POST', novoLancamento);
            alert('Lançamento salvo com sucesso!');
            lancamentoForm.reset();
            formPanel.style.display = 'none';
            carregarLivroDiario(); 
        } catch (error) {
            console.error('Erro ao salvar lançamento:', error);
            alert(`Falha ao salvar: ${error.message}`);
        }
    });

  
    carregarPlanoDeContas();
    carregarLivroDiario();
});