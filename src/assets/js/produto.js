document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    const carrosseu = document.getElementById('carroseu');
    if (!carrosseu) return;
    const endercoApi = "http://localhost:5500";
    fetch(`${endercoApi}/src/produtos.json`)
    .then(res => res.json())
    .then(data => {
        const produto = data.find(function (elem) {
            return elem.id == id;
        });
        if (!produto) {
            const main = document.querySelector('main')
            main.textContent= `Produto não encontrado`
            return;
        }
        const nomeProduto = document.querySelector('main > h1');
        if (nomeProduto) nomeProduto.textContent = produto.nome;
        const codProduto = document.querySelector('main > span');
        if (codProduto) codProduto.textContent = `Código: ${produto.codigo}`;
        const tamanho = document.querySelector('.tamanho')
        const tipo = document.querySelector('.tipo')
        tamanho.innerHTML = `Dimensão: `;
        produto.tamanho.forEach((elm, idx)=> {
            if (idx == 0) {
                tamanho.innerHTML+= `<span class='act'>${elm}</span>` 
            } else {
                tamanho.innerHTML+= `<span>${elm}</span>` 
            }
        });
        const spansTamanho = tamanho.querySelectorAll('span');
        spansTamanho.forEach(span => {
            span.addEventListener('click', function() {
                spansTamanho.forEach(elm => elm.classList.remove('act'));
                this.classList.add('act');
            });
        });
        tipo.innerHTML= `Venda: ${produto.venda}`;
        if (produto.imagem && Array.isArray(produto.imagem) && produto.imagem.length > 0) {
            let mainImg = carrosseu.querySelector('img');
            mainImg.src = '../' + produto.imagem[0];
            const thumbsDiv = carrosseu.querySelector('div');
            thumbsDiv.innerHTML = '';
            produto.imagem.forEach((img, idx) => {
                const thumb = document.createElement('img');
                thumb.src = '../' + img;
                if (idx === 0) thumb.classList.add('act');
                thumb.addEventListener('click', function() {
                    mainImg.src = this.src;
                    thumbsDiv.querySelectorAll('img').forEach(t => t.classList.remove('act'));
                    this.classList.add('act');
                });
                thumbsDiv.appendChild(thumb);
            });
        }
        const btnOrcamento = document.getElementById('orcamento');
        if (btnOrcamento) {
            btnOrcamento.addEventListener('click', function() {
                const spanSelecionado = document.querySelector('.tamanho span.act');
                const dimensao = spanSelecionado ? spanSelecionado.textContent : '';
                const codigo = produto.codigo || produto.id;
                const nome = produto.nome;
                const venda = produto.venda || produto.Venda || '';
                const mensagem = encodeURIComponent(
                    `Olá! Estou interessado em fazer um orçamento para o produto:\n` +
                    `Nome: ${nome}\n` +
                    `Código: ${codigo}\n` +
                    `Dimensão: ${dimensao}\n` +
                    `Venda: ${venda}`
                );
                const numero = '3198359590';
                const url = `https://wa.me/${numero}?text=${mensagem}`;
                window.open(url, '_blank');
            });
        }
    });
});
