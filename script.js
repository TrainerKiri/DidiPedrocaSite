let atendimentos = {
    realizados: new Set(),
    agendados: new Set(),
    cancelados: new Set()
};

function adicionarAtendimento(tipo, protocolo) {
    if (tipo === 'realizado') {
        atendimentos.realizados.add(protocolo);
    } else if (tipo === 'agendado') {
        atendimentos.agendados.add(protocolo);
    } else if (tipo === 'cancelado') {
        atendimentos.cancelados.add(protocolo);
    }
}

function mostrarNotificacao(mensagem) {
    const notificacaoDiv = document.getElementById('notificacao');
    notificacaoDiv.innerText = mensagem;
    notificacaoDiv.style.opacity = '1'; // Torna visível

    // Após 3 segundos, faça a notificação desaparecer
    setTimeout(() => {
        notificacaoDiv.style.opacity = '0'; // Torna invisível
    }, 3000);
}

function verificarCancelado(protocolo) {
    let mensagens = [];
    let status = [];

    // Verifica se o protocolo está cancelado
    if (atendimentos.cancelados.has(protocolo)) {
        status.push('cancelado');
    }

    // Verifica se o protocolo foi realizado
    if (atendimentos.realizados.has(protocolo)) {
        status.push('realizado');
    }

    // Verifica se o protocolo está agendado
    if (atendimentos.agendados.has(protocolo)) {
        status.push('agendado');
    }

    // Cria a mensagem de status combinando os estados
    if (status.length > 0) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} está ${status.join(' e ')}.`);
    }

    // Verifica se foi realizado sem estar agendado
    if (atendimentos.realizados.has(protocolo) && !atendimentos.agendados.has(protocolo)) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} foi realizado sem agendamento.`);
    }

    // Se não estiver em nenhuma lista
    if (status.length === 0) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} não foi encontrado.`);
    }

    // Exibe todas as mensagens em uma única notificação
    mostrarNotificacao(mensagens.join(' '));
}

// Event listeners para botões
document.getElementById('adicionarRealizado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloRealizado').value;
    if (protocolo) {
        adicionarAtendimento('realizado', protocolo);
        mostrarNotificacao(`Atendimento realizado adicionado: ${protocolo}`);
    }
});

document.getElementById('adicionarAgendado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloAgendado').value;
    if (protocolo) {
        adicionarAtendimento('agendado', protocolo);
        mostrarNotificacao(`Atendimento agendado adicionado: ${protocolo}`);
    }
});

document.getElementById('adicionarCancelado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloCancelado').value;
    if (protocolo) {
        adicionarAtendimento('cancelado', protocolo);
        mostrarNotificacao(`Atendimento cancelado adicionado: ${protocolo}`);
    }
});

document.getElementById('verificar').addEventListener('click', () => {
    const protocolo = document.getElementById('protocolo').value;
    verificarCancelado(protocolo);
});

// Função para limpar atendimentos
document.getElementById('limpar').addEventListener('click', () => {
    atendimentos = {
        realizados: new Set(),
        agendados: new Set(),
        cancelados: new Set()
    };
    mostrarNotificacao('Todos os atendimentos foram limpos.');
});

// Função para listar atendimentos
document.getElementById('listar').addEventListener('click', () => {
    const listaDiv = document.getElementById('listaAtendimentos');
    const realizados = Array.from(atendimentos.realizados).join(', ') || 'Nenhum';
    const agendados = Array.from(atendimentos.agendados).join(', ') || 'Nenhum';
    const cancelados = Array.from(atendimentos.cancelados).join(', ') || 'Nenhum';

    // Lista os realizados sem agendamento
    const realizadosSemAgendamento = Array.from(atendimentos.realizados).filter(protocolo => 
        !atendimentos.agendados.has(protocolo)
    ).join(', ') || 'Nenhum';

    listaDiv.innerHTML = `
        <h3>Atendimentos Realizados:</h3> ${realizados}
        <h3>Atendimentos Agendados:</h3> ${agendados}
        <h3>Atendimentos Cancelados:</h3> ${cancelados}
        <h3>Atendimentos Realizados sem Agendamento:</h3> ${realizadosSemAgendamento}
    `;
});
