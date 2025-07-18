function iniciarJogo(button){ //Button é o mesmo que botão em inglês.
    button.classList.add("ativo") //Repassando "ativo" como argumento para o método da propriedade presente na classList do button (aqui a classList está presente no button), neste caso .add(). Argumento é diferente de parâmetro, pois já sabemos que ele é.
    setTimeout(() => { // Declarando uma função anônima dentro do setTimeout, ela durará 2 segundos (=2000) antes de remover
        button.classList.remove("ativo");
        jogoExecutando();
    }, 2000);
}

function jogoExecutando() {
    let finalizar_jogo = false;
    let rodada = 0;

    const container = document.createElement("div");
    container.className = "jogo-exibicao";
    document.body.appendChild(container);

    novaRodada();
    
    
    function novaRodada() {
        if (rodada >= 12) {
            finalizar();
            return;
        }

        container.innerHTML = "";

        const titulo = document.createElement("h1");
        titulo.textContent = `Rodada ${rodada + 1}`;
        container.appendChild(titulo);

        const quantidadeQuadrados = 4 * (rodada + 1);
        const clique_ordem = [];

        for (let i = 0; i < quantidadeQuadrados; i++) {
            const peca = document.createElement("div");
            peca.className = "grade-jogo";
            peca.style.backgroundColor = corAleatoria();
            peca.style.width = "40px";
            peca.style.height = "40px";
            peca.style.display = "inline-block";
            peca.style.cursor = "pointer";

            peca.onclick = () => {
                if (peca.style.backgroundColor === ordem_para_usuario) {
                    const parabens = document.createElement("p");
                    parabens.textContent = "Você venceu esta rodada!";
                    container.appendChild(parabens);
                }
            };

            clique_ordem.push(peca);
            container.appendChild(peca);
        }

        const ordem_para_usuario = clique_ordem[0].style.backgroundColor;
        const ordem = document.createElement("p");
        ordem.textContent = `Clique na seguinte cor: \"${ordem_para_usuario}\"`;

        container.appendChild(ordem);

        const pergunta = document.createElement("p");
        pergunta.textContent = "Você deseja finalizar o jogo?";
        container.appendChild(pergunta);

        const botoesContainer = document.createElement("div");
        botoesContainer.style.display = "flex";
        botoesContainer.style.gap = "20px";

        const botaoSim = document.createElement("button");
        botaoSim.textContent = "Sim";
        botaoSim.style.backgroundColor = corAleatoria(); // cor aleatória no botão Sim
        
        botaoSim.onclick = () => {
            finalizar_jogo = true;
            finalizar();
        };

        const botaoNao = document.createElement("button");
        botaoNao.textContent = "Não";
        botaoNao.onclick = () => {
            rodada++;
            novaRodada();
        };

        botoesContainer.appendChild(botaoSim);
        botoesContainer.appendChild(botaoNao);
        container.appendChild(botoesContainer);
    }

    function finalizar() {
        container.remove();
    }

    function corAleatoria() {
        
        const cores = ["blue", "red", "pink", "gray", "yellow", "white", "brown"];
        let cor;

        cor = cores[Math.floor(Math.random() * cores.length)];
        
        return cor;
    }
}
