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
        container.innerHTML = "";

        const titulo = document.createElement("h1");
        titulo.textContent = `Rodada ${rodada + 1}`;
        container.appendChild(titulo);

        //
        const peca1_jogo = document.createElement("div");
        peca1_jogo.style.backgroundColor = corAleatoria();

        const peca2_jogo = document.createElement("div");
        peca2_jogo.style.backgroundColor = corAleatoria();

        const peca3_jogo = document.createElement("div");
        peca3_jogo.style.backgroundColor = corAleatoria();
        
        const peca4_jogo = document.createElement("div");
        peca4_jogo.style.backgroundColor = corAleatoria();

        let clique_ordem = (peca1_jogo, peca2_jogo, peca3_jogo, peca4_jogo);
        let ordem_para_usuario = corAleatoria();

        container.appendChild(clique_ordem);

        for(let i = 0; i <= clique_ordem.lenght(); i++){

            container.clique_ordem[i].onclick = () => {
                if (clique_ordem[i].style.backgroundColor === ordem_para_usuario){
                    const parabens = document.createElement("p");
                    parabens.textContent = "Você venceu esta rodada";
                    break;
                }
            };
        }
        //Modificando

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
        console.log("Obrigado por jogar.");
    }

    function corAleatoria() {
        
        const letras = "0123456789ABCDEF";
        let cor = "#";

        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        
        return cor;
    }
}
