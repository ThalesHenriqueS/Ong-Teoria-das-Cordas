// Módulo do MODAL: fecha o modal ao clicar no botão.
// Substitui o onclick="fecharModal()" do HTML, que não funciona com módulos.

export function iniciarModal({ modal, botaoFechar }) {
    if (!modal || !botaoFechar) return;

    botaoFechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
