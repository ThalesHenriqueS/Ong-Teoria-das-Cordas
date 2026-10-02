// Módulo do MENU HAMBÚRGUER: só abre e fecha o menu.
// Não sabe nada sobre navegação entre seções; expõe fechar() para quem quiser usá-lo.

export function iniciarMenu(botao, menu) {
    if (!botao || !menu) return { fechar() {} };

    botao.addEventListener('click', () => {
        menu.classList.toggle('ativo');
    });

    return {
        fechar() {
            menu.classList.remove('ativo');
        }
    };
}
