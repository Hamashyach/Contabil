document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000'; // Verifique se a porta está correta
    const authToken = localStorage.getItem('authToken');

    // --- Seletores de Elementos ---
    const reportTypeSelect = document.getElementById('report-type');
    const btnGerar = document.getElementById('btn-gerar-relatorio');
    
    // Containers dos Relatórios
    const balanceteContainer = document.getElementById('balancete-container');
    const razaoContainer = document.getElementById('razao-container');
    const dreContainer = document.getElementById('dre-container');
    const bpContainer = document.getElementById('bp-container');
    
    // Elementos do Balancete
    const balanceteTbody = document.getElementById('balancete-tbody');
    const periodoBalancete = document.getElementById('periodo-relatorio');

    // Elementos do Livro Razão
    const razaoContaSelect = document.getElementById('razao-conta-select');
    const razaoTbody = document.getElementById('razao-tbody');

    // --- Funções de Formatação ---
    function formatValue(value) {
        const num = parseFloat(value);
        if (num === 0) return '';
        return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    function formatTotal(value) {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- Controle de Exibição dos Relatórios ---
    function controlarExibicaoRelatorios() {
        const selectedReport = reportTypeSelect.value;
        balanceteContainer.style.display = selectedReport === 'balancete' ? 'block' : 'none';
        razaoContainer.style.display = selectedReport === 'razao' ? 'block' : 'none';
        dreContainer.style.display = selectedReport === 'dre' ? 'block' : 'none';
        bpContainer.style.display = selectedReport === 'bp' ? 'block' : 'none';
    }

    // --- LÓGICA DO BALANCETE ---
    async function gerarBalancete() {
        const dateStart = '2023-01-01'; // Exemplo
        const dateEnd = '2023-12-31';   // Exemplo

        try {
            const response = await fetch(`${API_URL}/relatorios/balancete?de=${dateStart}&ate=${dateEnd}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!response.ok) throw new Error('Falha ao buscar dados do balancete.');
            
            const data = await response.json();
            balanceteTbody.innerHTML = '';
            let totais = { inicialD: 0, inicialC: 0, finalD: 0, finalC: 0 };

            data.forEach(item => {
                if (item.saldoInicial === 0 && item.saldoFinal === 0) return;
                let inicialD = 0, inicialC = 0, finalD = 0, finalC = 0;
                if (item.saldoInicial !== 0) { item.natureza === 1 ? inicialD = item.saldoInicial : inicialC = item.saldoInicial; }
                if (item.saldoFinal !== 0) { item.natureza === 1 ? finalD = item.saldoFinal : finalC = item.saldoFinal; }
                const row = `<tr><td>${item.codigo}</td><td>${item.conta}</td><td class="text-right">${formatValue(inicialD)}</td><td class="text-right">${formatValue(inicialC)}</td><td class="text-right">${formatValue(finalD)}</td><td class="text-right">${formatValue(finalC)}</td></tr>`;
                balanceteTbody.innerHTML += row;
                totais.inicialD += inicialD; totais.inicialC += inicialC; totais.finalD += finalD; totais.finalC += finalC;
            });
            
            document.getElementById('total-inicial-debito').textContent = formatTotal(totais.inicialD);
            document.getElementById('total-inicial-credito').textContent = formatTotal(totais.inicialC);
            document.getElementById('total-final-debito').textContent = formatTotal(totais.finalD);
            document.getElementById('total-final-credito').textContent = formatTotal(totais.finalC);
            periodoBalancete.textContent = `Período: ${new Date(dateStart).toLocaleDateString('pt-BR')} a ${new Date(dateEnd).toLocaleDateString('pt-BR')}`;
        } catch (error) {
            console.error('Erro ao gerar balancete:', error);
            balanceteTbody.innerHTML = `<tr><td colspan="6" class="text-center" style="color:red;">${error.message}</td></tr>`;
        }
    }

    // --- LÓGICA DO LIVRO RAZÃO ---
    async function carregarContasParaRazao() {
        try {
            const contas = await fetch(`${API_URL}/setup`, { headers: { 'Authorization': `Bearer ${authToken}` } }).then(res => res.json());
            razaoContaSelect.innerHTML = '<option value="">Selecione uma conta...</option>';
            contas.forEach(conta => {
                razaoContaSelect.innerHTML += `<option value="${conta.id}">${conta.codigo} - ${conta.nome_conta}</option>`;
            });
        } catch (error) {
            console.error('Erro ao carregar contas:', error);
        }
    }

    async function gerarLivroRazao() {
        const contaId = razaoContaSelect.value;
        if (!contaId) {
            razaoTbody.innerHTML = '';
            return;
        }
        const dateStart = '2023-01-01', dateEnd = '2023-12-31';

        try {
            const response = await fetch(`${API_URL}/relatorios/razao/${contaId}?de=${dateStart}&ate=${dateEnd}`, { headers: { 'Authorization': `Bearer ${authToken}` } });
            if (!response.ok) throw new Error('Falha ao buscar dados do Livro Razão.');
            
            const data = await response.json();
            razaoTbody.innerHTML = '';
            let saldoCorrente = data.saldoAnterior;

            razaoTbody.innerHTML += `<tr class="saldo-anterior-row"><td colspan="4"><strong>Saldo Anterior</strong></td><td class="text-right"><strong>${formatTotal(saldoCorrente)}</strong></td></tr>`;

            data.movimentos.forEach(mov => {
                const debito = parseFloat(mov.debito) || 0, credito = parseFloat(mov.credito) || 0;
                saldoCorrente += debito - credito;
                const row = `<tr><td>${new Date(mov.data).toLocaleDateString('pt-BR')}</td><td>${mov.descricao}</td><td class="text-right">${formatValue(debito)}</td><td class="text-right">${formatValue(credito)}</td><td class="text-right">${formatTotal(saldoCorrente)}</td></tr>`;
                razaoTbody.innerHTML += row;
            });
        } catch (error) {
            console.error('Erro ao gerar Livro Razão:', error);
            razaoTbody.innerHTML = `<tr><td colspan="5" class="text-center" style="color:red;">${error.message}</td></tr>`;
        }
    }
    
    // --- LÓGICA DA DRE ---
    async function gerarDRE() {
        const dateStart = '2023-01-01', dateEnd = '2023-12-31';

        try {
            const response = await fetch(`${API_URL}/relatorios/dre?de=${dateStart}&ate=${dateEnd}`, { headers: { 'Authorization': `Bearer ${authToken}` } });
            if (!response.ok) throw new Error('Falha ao buscar dados da DRE.');
            
            const dreData = await response.json();
            document.getElementById('dre-receita-bruta').textContent = formatTotal(dreData.receitaBruta);
            document.getElementById('dre-deducoes').textContent = formatTotal(dreData.deducoes);
            document.getElementById('dre-receita-liquida').textContent = formatTotal(dreData.receitaLiquida);
            document.getElementById('dre-cmv').textContent = formatTotal(dreData.cmv);
            document.getElementById('dre-lucro-bruto').textContent = formatTotal(dreData.lucroBruto);
            document.getElementById('dre-despesas-vendas').textContent = formatTotal(dreData.despesasVendas);
            document.getElementById('dre-despesas-admin').textContent = formatTotal(dreData.despesasAdmin);
            document.getElementById('dre-lucro-operacional').textContent = formatTotal(dreData.lucroOperacional);
            document.getElementById('dre-lucro-liquido').textContent = formatTotal(dreData.lucroLiquido);
            document.getElementById('periodo-dre').textContent = `Período: ${new Date(dateStart).toLocaleDateString('pt-BR')} a ${new Date(dateEnd).toLocaleDateString('pt-BR')}`;
        } catch (error) {
            console.error('Erro ao gerar DRE:', error);
            alert(error.message);
        }
    }

    // --- LÓGICA DO BALANÇO PATRIMONIAL ---
    async function gerarBP() {
        const dateEnd = '2023-12-31';

        try {
            const response = await fetch(`${API_URL}/relatorios/bp?ate=${dateEnd}`, { headers: { 'Authorization': `Bearer ${authToken}` } });
            if (!response.ok) throw new Error('Falha ao buscar dados do Balanço Patrimonial.');
            
            const bpData = await response.json();
            
            // Função auxiliar para renderizar um grupo de contas (ex: Ativo Circulante)
            const renderGroup = (groupData) => {
                let groupHtml = `<div class="bp-group">${groupData.grupo}</div>`;
                groupData.contas.forEach(conta => {
                    groupHtml += `<div class="bp-account"><span>${conta.conta}</span><span>${formatTotal(conta.saldo)}</span></div>`;
                });
                groupHtml += `<div class="bp-group-total"><span>Total ${groupData.grupo}</span><span>${formatTotal(groupData.total)}</span></div>`;
                return groupHtml;
            };

            const ativoDiv = document.getElementById('bp-ativo');
            ativoDiv.innerHTML = '';
            bpData.ativo.forEach(group => ativoDiv.innerHTML += renderGroup(group));
            document.getElementById('bp-total-ativo').textContent = formatTotal(bpData.totalAtivo);
            
            const passivoPlDiv = document.getElementById('bp-passivo-pl');
            passivoPlDiv.innerHTML = '';
            bpData.passivoPL.forEach(group => passivoPlDiv.innerHTML += renderGroup(group));
            document.getElementById('bp-total-passivo-pl').textContent = formatTotal(bpData.totalPassivoPL);

            document.getElementById('periodo-bp').textContent = `Em ${new Date(dateEnd).toLocaleDateString('pt-BR')}`;
        } catch (error) {
            console.error('Erro ao gerar BP:', error);
            alert(error.message);
        }
    }

    // --- Event Listeners e Inicialização ---
    reportTypeSelect.addEventListener('change', controlarExibicaoRelatorios);
    
    btnGerar.addEventListener('click', () => {
        const selectedReport = reportTypeSelect.value;
        if (selectedReport === 'balancete') gerarBalancete();
        if (selectedReport === 'razao') gerarLivroRazao();
        if (selectedReport === 'dre') gerarDRE();
        if (selectedReport === 'bp') gerarBP();
    });

    razaoContaSelect.addEventListener('change', gerarLivroRazao);

    // Inicialização da Página
    controlarExibicaoRelatorios();
    gerarBalancete(); // Gera o balancete como padrão ao carregar a página
    carregarContasParaRazao(); // Carrega as contas para o select do Livro Razão
});