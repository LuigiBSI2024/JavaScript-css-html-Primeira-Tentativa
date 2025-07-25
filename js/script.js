let interruptor = true; // Como o nome diz, serve para ser usado ocasionalmente assim como um interruptor real.
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
        container.innerHTML = ""; /*"Esvazia completamente o conteúdo HTML do elemento container, ou seja, 
                                remove todos os elementos filhos (como <div>, <p>, <button>, etc.) que 
                                foram inseridos anteriormente dentro do container. Evitando a 
                                acumulação deles. 
                                */ 

        const titulo = document.createElement("h1");
        titulo.textContent = `Rodada ${rodada}`;
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
                if (!venceu_rodada && cor_traducao[clique_ordem[0].style.backgroundColor] === ordem_para_usuario) {
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
                        container.appendChild(ordem); //Isso aqui garante que esse elementos só é adicionados ao passarem o mouse por cima da div "peca_grade".
                        container.appendChild(pergunta); //Isso aqui garante que esse elementos só é adicionados ao passarem o mouse por cima da div "peca_grade".
                        container.appendChild(botoesContainer); //Isso aqui garante que esse elementos só é adicionados ao passarem o mouse por cima da div "peca_grade".
                    }
                };
            }

            peca_grade.appendChild(peca)
            clique_ordem.push(peca);
            container.appendChild(peca_grade);

            interruptor = false;

        }

        const ordem_para_usuario = cor_traducao[clique_ordem[0].style.backgroundColor]; //É aqui onde é atribuído a cor a ser informada para o jogador clicar.
        const ordem = document.createElement("p");
        
        ordem.textContent = `Clique na seguinte cor: \"${ordem_para_usuario}\", \n`;

        //Início do temporizador
        const temporizador_p = document.createElement("p");
        let tempoRestante = 8;

        function intervalo(){
            
            const intervalo_var = setInterval(() => { //Variável intervalo
                temporizador_p.textContent = `Você tem 8 segundos para clicar na cor correta: ${tempoRestante}s`;
                tempoRestante--;

                console.log("Oi");
                if (tempoRestante > 0 && rodada != 4) { // Para entrar neste caso exclusivamente evitar o temporizador travar na rodada 3.
                    console.log("Testanto temporizador");
                }

                else {   //Para cair em qualquer outro caso não listado.
                    clearInterval(intervalo_var); //Para evitar a acumulação de outros elementos associados a essa função.
                    temporizador_p.textContent = "Tempo esgotado! \nObrigado por jogar";
                    
                    return;
                }
                
            }, 1000);
        }
        //Fim do temporizador

        container.appendChild(temporizador_p);

        const pergunta = document.createElement("p");
        pergunta.textContent = "Você deseja finalizar o jogo?";

        const botoesContainer = document.createElement("div");
        botoesContainer.style.display = "flex";
        botoesContainer.style.gap = "20px";

        const botaoSim = document.createElement("button");
        botaoSim.textContent = "Sim";
        botaoSim.style.backgroundColor = corAleatoria(); // cor aleatória no botão Sim
        
        botaoSim.onclick = function () { 
            finalizar(container, interruptor);
            botoesContainer.innerHTML = "";  //Ele substitui o que antes havia nessa div por uma string vazia.
        };

        const botaoNao = document.createElement("button");
        botaoNao.textContent = "Não";
        botaoNao.onclick = () => {
            if (venceu_rodada && rodada != 3){
                rodada++; // O jogo termina a partir da 13° rodada.
                novaRodada();
            }
            else { //O jogo em tese, nunca iria acabar se não fosse por esta restrição.
                container.innerHTML = "";
                rodada = 1;
                novoJogo(); //A função pergunta se o jogador deseja finalizar o jogo ou não?
            }
        };

        botoesContainer.appendChild(botaoSim);
        botoesContainer.appendChild(botaoNao);
    }

    function novoJogo(){
        container.innerHTML = "";
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
        const fechar = document.createElement("button");
        fechar.textContent = "Fechar";
        container.append(fechar);

        fechar.onclick = () => {
            container.remove();
            
            const fechando = document.createElement("div");
            
            document.body.appendChild(fechando);
            container.className = "jogo-exibicao";
        }
    } 

    
    function corAleatoria() {
        
        const cores = ["blue", "red", "pink", "gray", "yellow", "white", "brown"];
        let cor;

        cor = cores[Math.floor(Math.random() * cores.length)];
        
        return cor;
    }
    
}

const cor_traducao = {
    "blue":"azul",
    "red": "vermelho",
    "pink": "rosa",
    "gray": "cinza",
    "yellow": "amarelo",
    "white": "branco",
    "brown": "marrom"
};



