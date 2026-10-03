// Módulo do SUBMENU (dropdown): abre por mouse e por teclado, fecha com Esc
// e mantém aria-expanded em sincronia com o estado visual.

export function iniciarSubmenu(dropdown) {
    const gatilho = dropdown ? dropdown.querySelector(':scope > a') : null;
    const submenu = dropdown ? dropdown.querySelector('.submenu') : null;

    if (!gatilho || !submenu) return { fechar() {} };

    let suprimirAbertura = false;

    function definir(aberto) {
        dropdown.classList.toggle('aberto', aberto);
        gatilho.setAttribute('aria-expanded', String(aberto));
    }

    dropdown.addEventListener('mouseenter', () => definir(true));
    dropdown.addEventListener('mouseleave', () => definir(false));

    dropdown.addEventListener('focusin', () => {
        if (!suprimirAbertura) definir(true);
    });

    dropdown.addEventListener('focusout', (evento) => {
        if (!dropdown.contains(evento.relatedTarget)) definir(false);
    });

    dropdown.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && dropdown.classList.contains('aberto')) {
            // Fecha e devolve o foco ao gatilho sem reabrir o submenu.
            suprimirAbertura = true;
            definir(false);
            gatilho.focus();
            suprimirAbertura = false;
        }

        if (evento.key === 'ArrowDown' && evento.target === gatilho) {
            evento.preventDefault();
            definir(true);
            const primeiro = submenu.querySelector('a');
            if (primeiro) primeiro.focus();
        }
    });

    return {
        fechar() {
            definir(false);
        }
    };
}
