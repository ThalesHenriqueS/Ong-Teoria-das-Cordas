// Módulo de NAVEGAÇÃO (SPA): mostra uma seção e esconde as outras.
// Além de alternar a visibilidade, cuida da acessibilidade da troca de "página":
// atualiza o título do documento, marca o link atual (aria-current) e move o foco.
// Não importa outros módulos: quem quiser reagir à navegação passa o callback aoNavegar.

export function iniciarNavegacao({ links, linksPrincipais = [], secoes, aoNavegar, sufixoTitulo = '' }) {
    function marcarLinkAtual(id) {
        linksPrincipais.forEach(link => {
            if (link.dataset.target === id) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function atualizarTitulo(secao) {
        const titulo = secao.dataset.titulo;
        if (!titulo) return;
        document.title = sufixoTitulo ? `${titulo} | ${sufixoTitulo}` : titulo;
    }

    function moverFoco(alvo) {
        if (!alvo) return;
        if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
        alvo.focus();
    }

    function mostrarSecao(id, destino) {
        const secaoAtiva = document.getElementById(id);
        if (!secaoAtiva) return;

        secoes.forEach(secao => {
            secao.style.display = 'none';
        });
        secaoAtiva.style.display = 'block';

        marcarLinkAtual(id);
        atualizarTitulo(secaoAtiva);

        // Foco no destino pedido pelo link (ex.: #acoes) ou, na falta dele, no título da seção.
        const alvo = destino && secaoAtiva.contains(destino)
            ? destino
            : secaoAtiva.querySelector('h1, h2');
        moverFoco(alvo);
    }

    links.forEach(link => {
        link.addEventListener('click', (evento) => {
            evento.preventDefault();

            const destino = link.hash ? document.getElementById(link.hash.slice(1)) : null;
            mostrarSecao(link.dataset.target, destino);

            if (typeof aoNavegar === 'function') {
                aoNavegar(link.dataset.target);
            }
        });
    });

    return { mostrarSecao };
}
