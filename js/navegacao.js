// Módulo de NAVEGAÇÃO (SPA): mostra uma seção e esconde as outras.
// Não importa o menu. Quem quiser reagir à navegação passa um callback (aoNavegar).

export function iniciarNavegacao({ links, secoes, aoNavegar }) {
    function mostrarSecao(id) {
        const secaoAtiva = document.getElementById(id);
        if (!secaoAtiva) return;

        secoes.forEach(secao => {
            secao.style.display = 'none';
        });
        secaoAtiva.style.display = 'block';
    }

    links.forEach(link => {
        link.addEventListener('click', (evento) => {
            evento.preventDefault();

            mostrarSecao(link.dataset.target);

            if (typeof aoNavegar === 'function') {
                aoNavegar();
            }
        });
    });

    return { mostrarSecao };
}
