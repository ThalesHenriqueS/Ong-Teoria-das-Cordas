// Módulo da GALERIA: recebe o container e os dados por parâmetro.
// Não importa os dados diretamente, então pode ser reutilizado com qualquer lista de imagens.

function criarImagem({ src, alt }) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}

export function iniciarGaleria(container, imagens) {
    if (!container) return;

    const elementos = imagens.map(criarImagem);
    container.replaceChildren(...elementos);
}
