document.addEventListener('DOMContentLoaded', () => {
    let atendimentos = {
        realizados: new Set(),
        agendados: new Set(),
        cancelados: new Set()
    };

    function adicionarAtendimentos(tipo, protocolos) {
        const protocolosArray = protocolos.split('/').map(p => p.trim()); // Divide por barras e remove espaços
        protocolosArray.forEach(protocolo => {
            if (protocolo) { // Verifica se não está vazio
                if (tipo === 'realizado') {
                    atendimentos.realizados.add(protocolo);
                } else if (tipo === 'agendado') {
                    atendimentos.agendados.add(protocolo);
                } else if (tipo === 'cancelado') {
                    atendimentos.cancelados.add(protocolo);
                }
            }
        });
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

        if (atendimentos.cancelados.has(protocolo)) {
            status.push('cancelado');
        }

        if (atendimentos.realizados.has(protocolo)) {
            status.push('realizado');
        }

        if (atendimentos.agendados.has(protocolo)) {
            status.push('agendado');
        }

        if (status.length > 0) {
            mensagens.push(`O atendimento com o protocolo ${protocolo} está ${status.join(' e ')}.`);
        }

        if (atendimentos.realizados.has(protocolo) && !atendimentos.agendados.has(protocolo)) {
            mensagens.push(`O atendimento com o protocolo ${protocolo} foi realizado sem agendamento.`);
        }

        if (status.length === 0) {
            mensagens.push(`O atendimento com o protocolo ${protocolo} não foi encontrado.`);
        }

        mostrarNotificacao(mensagens.join(' '));
    }

    // Event listeners para botões
    document.getElementById('adicionarRealizado').addEventListener('click', () => {
        const protocolos = document.getElementById('protocoloRealizado').value;
        if (protocolos) {
            adicionarAtendimentos('realizado', protocolos);
            mostrarNotificacao(`Atendimentos realizados adicionados: ${protocolos}`);
        }
    });

    document.getElementById('adicionarAgendado').addEventListener('click', () => {
        const protocolos = document.getElementById('protocoloAgendado').value;
        if (protocolos) {
            adicionarAtendimentos('agendado', protocolos);
            mostrarNotificacao(`Atendimentos agendados adicionados: ${protocolos}`);
        }
    });

    document.getElementById('adicionarCancelado').addEventListener('click', () => {
        const protocolos = document.getElementById('protocoloCancelado').value;
        if (protocolos) {
            adicionarAtendimentos('cancelado', protocolos);
            mostrarNotificacao(`Atendimentos cancelados adicionados: ${protocolos}`);
        }
    });

    document.getElementById('verificar').addEventListener('click', () => {
        const protocolo = document.getElementById('protocolo').value;
        verificarCancelado(protocolo);
    });

    document.getElementById('limpar').addEventListener('click', () => {
        atendimentos = {
            realizados: new Set(),
            agendados: new Set(),
            cancelados: new Set()
        };
        mostrarNotificacao('Todos os atendimentos foram limpos.');
    });

    document.getElementById('listar').addEventListener('click', () => {
        const listaDiv = document.getElementById('listaAtendimentos');
        
        const realizados = Array.from(atendimentos.realizados);
        const agendados = Array.from(atendimentos.agendados);
        const cancelados = Array.from(atendimentos.cancelados);

        const realizadosSemAgendamento = realizados.filter(protocolo => 
            !atendimentos.agendados.has(protocolo)
        );

        listaDiv.innerHTML = `
            <h3>Atendimentos Realizados:</h3>
            <ul>${realizados.length ? realizados.map(protocolo => `<li>${protocolo}</li>`).join('') : '<li>Nenhum</li>'}</ul>
            
            <h3>Atendimentos Agendados:</h3>
            <ul>${agendados.length ? agendados.map(protocolo => `<li>${protocolo}</li>`).join('') : '<li>Nenhum</li>'}</ul>
            
            <h3>Atendimentos Cancelados:</h3>
            <ul>${cancelados.length ? cancelados.map(protocolo => `<li>${protocolo}</li>`).join('') : '<li>Nenhum</li>'}</ul>
            
            <h3>Atendimentos Realizados sem Agendamento:</h3>
            <ul>${realizadosSemAgendamento.length ? realizadosSemAgendamento.map(protocolo => `<li>${protocolo}</li>`).join('') : '<li>Nenhum</li>'}</ul>
        `;
    });
});
