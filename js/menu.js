// Módulo do MENU HAMBÚRGUER: abre e fecha o menu e mantém os atributos ARIA em sincronia.
// Não sabe nada sobre navegação entre seções; expõe fechar() para quem quiser usá-lo.

export function iniciarMenu(botao, menu) {
    if (!botao || !menu) return { fechar() {} };

    function definir(aberto) {
        menu.classList.toggle('ativo', aberto);
        botao.setAttribute('aria-expanded', String(aberto));
        botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    }

    botao.addEventListener('click', () => {
        definir(!menu.classList.contains('ativo'));
    });

    return {
        fechar() {
            definir(false);
        }
    };
}
