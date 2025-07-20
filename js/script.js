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
        if (rodada >= 12) { //O jogo em tese, nunca iria acabar se não fosse por esta restrição.
            novoJogo(); //A função pergunta se o jogador deseja finalizar o jogo ou não?
        }

        container.innerHTML = ""; /*"Esvazia completamente o conteúdo HTML do elemento container, ou seja, 
                                remove todos os elementos filhos (como <div>, <p>, <button>, etc.) que 
                                foram inseridos anteriormente dentro do container. Evitando a 
                                acumulação deles. 
                                */ 

        const titulo = document.createElement("h1");
        titulo.textContent = `Rodada ${rodada + 1}`;
        container.appendChild(titulo);

        const quantidadeQuadrados = 4 * (rodada + 1);
        const clique_ordem = [];
        let venceu_rodada = false; //Inicialmente será falso, não é possível ganhar se nunca jogou antes ou clicou na função anônima em: peca.onclick = () => {...}, linhas: 45 a 53.

        for (let i = 0; i < quantidadeQuadrados; i++) {
            const peca = document.createElement("div");
            peca.className = "grade-jogo";
            peca.style.backgroundColor = corAleatoria();
            peca.style.width = "40px";
            peca.style.height = "40px";
            peca.style.display = "inline-block";
            peca.style.cursor = "pointer";

            peca.onclick = () => {
                if (!venceu_rodada && peca.style.backgroundColor === ordem_para_usuario) {
                    venceu_rodada = true;

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
        
        ordem.textContent = `Clique na seguinte cor: \"${ordem_para_usuario}\", \n`;

        //Início do temporizador
        const temporizador_p = document.createElement("p");
        let tempoRestante = 8;

        const intervalo = setInterval(() => {
            temporizador_p.textContent = `Você tem 8 segundos para clicar na cor correta: ${tempoRestante}s`;
            tempoRestante--;

            if (tempoRestante < 0 && venceu_rodada === true) {
                clearInterval(intervalo);
                temporizador_p.textContent = "Tempo esgotado! \nObrigado por jogar";
                finalizar();
            }
        }, 1000);
        //Fim do temporizador

        container.appendChild(temporizador_p);
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
        
        botaoSim.onclick = function () { finalizar_jogo = true; finalizar(); };

        const botaoNao = document.createElement("button");
        botaoNao.textContent = "Não";
        botaoNao.onclick = () => {
                if (venceu_rodada){
                rodada++; // O jogo termina a partir da 13° rodada.
                novaRodada();
            }
        };

        botoesContainer.appendChild(botaoSim);
        botoesContainer.appendChild(botaoNao);
        container.appendChild(botoesContainer);
    }

    function finalizar() {
        if (finalizar){
            container.remove();
            return;
        }
    }

    function novoJogo(){
        const repetir = document.createElement("p");
        repetir.textContent = "Deseja jogar novamente? "

        const sim = document.createElement("button");
        sim.textContent = "Sim";
        sim.onclick = () => {
            novaRodada();
        }

        const nao = document.createElement("button");
        nao.textContent = "Nao";
        nao.onclick = () =>{
            finalizar();
        }

        container.append(repetir);
        container.append(sim);
        container.append(nao);

    }

    function corAleatoria() {
        
        const cores = ["blue", "red", "pink", "gray", "yellow", "white", "brown"];
        let cor;

        cor = cores[Math.floor(Math.random() * cores.length)];
        
        return cor;
    }
    
}
