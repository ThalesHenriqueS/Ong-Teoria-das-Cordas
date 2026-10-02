// Módulo do FORMULÁRIO: valida e mostra o aviso de sucesso.
// Não conhece o rascunho. Quem quiser agir após um envio válido passa aoEnviarComSucesso.

export function iniciarFormulario({ formulario, aviso, aoEnviarComSucesso }) {
    if (!formulario) return;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (formulario.checkValidity()) {
            if (aviso) aviso.style.display = 'block';

            // Chamado ANTES do reset, caso alguém precise ler os dados do formulário.
            if (typeof aoEnviarComSucesso === 'function') {
                aoEnviarComSucesso();
            }

            formulario.reset();
        } else {
            if (aviso) aviso.style.display = 'none';
            formulario.reportValidity();
        }
    });
}
