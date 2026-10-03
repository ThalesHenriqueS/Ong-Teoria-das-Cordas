
export function iniciarModal({ modal, botaoFechar }) {
    if (!modal || !botaoFechar) return;

    botaoFechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
