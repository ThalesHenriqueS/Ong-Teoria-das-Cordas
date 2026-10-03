// Módulo do MODAL (diálogo): abre, prende o foco, fecha com Esc ou pelo botão
// e lembra que o aceite já foi dado.
// Quem decide QUANDO abrir é o main.js, chamando abrirSeNecessario().

export function iniciarModal({ modal, botaoFechar, chave }) {
    if (!modal || !botaoFechar) {
        return { abrir() {}, fechar() {}, abrirSeNecessario() {} };
    }

    let elementoAnterior = null;

    function jaAceito() {
        try {
            return localStorage.getItem(chave) === 'sim';
        } catch (erro) {
            return false;
        }
    }

    function registrarAceite() {
        try {
            localStorage.setItem(chave, 'sim');
        } catch (erro) {
            console.warn('Não foi possível registrar o aceite:', erro);
        }
    }

    function aoTeclar(evento) {
        if (evento.key === 'Escape') {
            fechar();
            return;
        }

        if (evento.key !== 'Tab') return;

        // Mantém o foco dentro do modal enquanto ele está aberto.
        const focaveis = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focaveis.length === 0) return;

        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        const ativo = document.activeElement;

        if (!modal.contains(ativo)) {
            evento.preventDefault();
            primeiro.focus();
        } else if (evento.shiftKey && ativo === primeiro) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && ativo === ultimo) {
            evento.preventDefault();
            primeiro.focus();
        }
    }

    function abrir() {
        if (!modal.hidden) return;

        elementoAnterior = document.activeElement;
        modal.hidden = false;
        botaoFechar.focus();
        document.addEventListener('keydown', aoTeclar);
    }

    function fechar() {
        if (modal.hidden) return;

        modal.hidden = true;
        document.removeEventListener('keydown', aoTeclar);

        // Devolve o foco a quem estava com ele antes de o modal abrir.
        if (elementoAnterior && document.contains(elementoAnterior)) {
            elementoAnterior.focus();
        }
        elementoAnterior = null;
    }

    function abrirSeNecessario() {
        if (chave && jaAceito()) return;
        abrir();
    }

    // O aceite só é registrado ao clicar em "Entendido". Fechar com Esc não conta como aceite.
    botaoFechar.addEventListener('click', () => {
        if (chave) registrarAceite();
        fechar();
    });

    return { abrir, fechar, abrirSeNecessario };
}
