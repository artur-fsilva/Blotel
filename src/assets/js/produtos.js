document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('produtos')
    const cards = document.querySelectorAll('#produtos .card');
    const vermais = document.getElementById('verMais');

    card.innerHTML = ``

    const endercoApi = "http://localhost:5500"

    fetch(`${endercoApi}/src/produtos.json`)
    .then(res => res.json())
    .then(data => {
        const produtos = data;
        for (let i = 0; i < produtos.length; i++) {
            let produto = produtos[i];
          
            let primeiraImagem = Array.isArray(produto.imagem) ? produto.imagem[0] : produto.imagem;
            let strTexto = `
                <a href="produto.html?id=${produto.id}" class="card">
                <img class="card-img-top" src="../${primeiraImagem}">
                <div class="card-body">
                    <p class="card-text">${produto.nome}</p>
                </div>
            </a>
            `;
            card.innerHTML += strTexto;
        }

        mostrarCards();
    });




    let cardVisivel = 8;

    function mostrarCards(animar = false) {
        const cards = document.querySelectorAll('#produtos .card');
        cards.forEach((card, idx) => {
            if (idx < cardVisivel) {
                card.style.display = 'block';
                if (animar && idx >= cardVisivel - 8) {
                    card.classList.add('fade-in');
                    setTimeout(() => card.classList.remove('fade-in'), 500);
                }
            } else {
                card.style.display = 'none';
            }
        });
        if (cardVisivel >= cards.length) {
            vermais.style.display = 'none';
        }
    }


    vermais.addEventListener('click', function() {
        cardVisivel += 8;
        mostrarCards(true);
    });
});