let interruptor = true; // Como o nome diz, serve para ser usado ocasionalmente assim como um interruptor real.
const fechar = document.createElement("button");
const container = document.createElement("div");

function iniciarJogo(button){ //Button é o mesmo que botão em inglês.
    button.classList.add("ativo") //Repassando "ativo" como argumento para o método da propriedade presente na classList do button (aqui a classList está presente no button), neste caso .add(). Argumento é diferente de parâmetro, pois já sabemos que ele é.
    setTimeout(() => { // Declarando uma função anônima dentro do setTimeout, ela durará 2 segundos (=2000) antes de remover
        button.classList.remove("ativo");
        jogoExecutando();
    }, 2000);
}

function jogoExecutando() {
    
    let rodada = 1;
    container.className = "jogo-exibicao"; //Aplicando a classe a partir do css no html, e identificando qual seletor pelo nome delimitado pelas aspas.
    document.body.appendChild(container);

    novaRodada();
    
    function novaRodada() {
        if (rodada >= 4) { //O jogo em tese, nunca iria acabar se não fosse por esta restrição.
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
        const peca_grade = document.createElement("div");

        let i = 0;
        for (; i < quantidadeQuadrados; i++) {
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
                    return venceu_rodada;
                }
            };  

            let onmouseover = true; //Variável para controlar o elemento DOM, o nome da variável é o mesmo que do elemento.
            if (onmouseover === true){
                //.onmouseover é uma propriedade DOM equivalente ao hover (a pseudoclasse)
                peca_grade.onmouseover = () =>{ //A variável será usada aqui.
                    if(onmouseover === true){
                        onmouseover = false; //Alterando o valor da variável aqui dentro.
                        intervalo();
                    }
                };
            }

            peca_grade.appendChild(peca)
            clique_ordem.push(peca);
            container.appendChild(peca_grade);
        }

        const ordem_para_usuario = clique_ordem[0].style.backgroundColor;
        const ordem = document.createElement("p");
        
        ordem.textContent = `Clique na seguinte cor: \"${ordem_para_usuario}\", \n`;

        //Início do temporizador
        const temporizador_p = document.createElement("p");
        let tempoRestante = 8;

        function intervalo(){
            
            const intervalo_var = setInterval(() => { //Variável intervalo
                temporizador_p.textContent = `Você tem 8 segundos para clicar na cor correta: ${tempoRestante}s`;
                tempoRestante--;

                if (tempoRestante === 0 && venceu_r) {
                    clearInterval(intervalo_var);
                    temporizador_p.textContent = "Tempo esgotado! \nObrigado por jogar";
                    finalizar(container, interruptor);
                    return;
                }
            }, 1000);
        }
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
        
        botaoSim.onclick = function () { finalizar(container, interruptor); };

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

    function novoJogo(){
        const repetir = document.createElement("p");
        repetir.textContent = "Deseja jogar novamente? ";

        const sim = document.createElement("button");
        sim.textContent = "Sim";
        sim.onclick = () => {
            novaRodada();
        }

        const nao = document.createElement("button");
        nao.textContent = "Nao";
        nao.onclick = () =>{
            finalizar(container, interruptor);
        }

        container.append(repetir);
        container.append(sim);
        container.append(nao);

    }

    function finalizar(container, interruptor) {
        console.log("Interruptor é recebido: ", interruptor);
        fechar.textContent = "Fechar";
        container.append(fechar);

        fechar.onclick = () => {
            container.remove();
            const fechando = document.createElement("div");
            return;
        }
    } 

    
    function corAleatoria() {
        
        const cores = ["blue", "red", "pink", "gray", "yellow", "white", "brown"];
        let cor;

        cor = cores[Math.floor(Math.random() * cores.length)];
        
        return cor;
    }
    
}



