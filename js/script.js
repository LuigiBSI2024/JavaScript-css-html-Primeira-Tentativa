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
    
    let venceu_rodada = true; //Inicialmente será vazio, não é possível ganhar se nunca jogou antes ou clicou na função anônima em: peca.onclick = () => {...}, linhas: 45 a 53.

    function novaRodada() {
        container.innerHTML = ""; /*"Esvazia completamente o conteúdo HTML do elemento container, ou seja, 
                                remove todos os elementos filhos (como <div>, <p>, <button>, etc.) que 
                                foram inseridos anteriormente dentro do container. Evitando a 
                                acumulação deles. 
                                */ 

        const titulo = document.createElement("h1");
        titulo.textContent = `Rodada ${rodada}`;
        container.appendChild(titulo);

        const pontuacao = document.createElement("p"); //Declarando o espaço onde o returna da função de pontuação será inserido.

        const quantidadeQuadrados = 4 * (rodada + 1);
        const clique_ordem = [];
        const peca_grade = document.createElement("div");
        let item_sorteado; //Essa variável será atribuída mais à frente, quando "clique_ordem" possuir elementos em sua lista.

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
                if (venceu_rodada === true && cor_traducao[item_sorteado] === ordem_para_usuario) {
                    venceu_rodada = true;
                    const parabens = document.createElement("p");
                    parabens.textContent = "Você venceu esta rodada!";
                    container.appendChild(parabens);
              
                    if (rodada < 10){
                        rodada++; // O jogo termina a partir da 13° rodada.
                        novaRodada();
                    }

                    else { //O jogo em tese, nunca iria acabar se não fosse por esta restrição. Tudo que foi feito antes será sobreescrito por um novo.
                        container.innerHTML = "";
                        rodada = 1;
                        novoJogo(); //A função pergunta se o jogador deseja finalizar o jogo ou não.
                    }

                    pontuacao.textContent = `Pontos: ${pontosRodada(rodada, venceu_rodada)}`;
                }

                else {
                    
                    setTimeout(() => { // Declarando uma função anônima dentro do setTimeout, ela durará 12 segundos(=12000, por causa de 8 segundos de espera do temporizador +4 deste) antes de finalizar.
                        
                        pontuacao.textContent = `Pontos: ${pontosRodada(rodada, venceu_rodada)}`;
                        finalizar(container, interruptor);

                    }, 16000);
                }
            };  
            
            let onmouseover = true; //Variável para controlar o elemento DOM, o nome da variável é o mesmo que do elemento. Criei ela para evitar várias chamadas do mesmo evento.

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
            
            item_sorteado = sortearQuadrado(clique_ordem); /*Essa variável está em um escopo diferente da função que utiliza internamente uma variável de mesmo nome.
                                                            Além disso, é preciso que essa variável seja atribuída aqui, pois novos itens estão sendo adicionada na lista na linha acima e ativamente dentro desse escopo do "for".*/
            
            container.appendChild(peca_grade);

            interruptor = false;

        }

        const ordem_para_usuario = cor_traducao[item_sorteado]; //É aqui onde é atribuído a cor a ser informada para o jogador clicar.
        const ordem = document.createElement("p");
        
        ordem.textContent = `Clique na seguinte cor: \"${ordem_para_usuario}\". \n`;

        //Início do temporizador
        const temporizador_p = document.createElement("p");
        let tempoRestante = 8;

        function intervalo(){
            const intervalo_var = setInterval(() => { //Variável intervalo
                temporizador_p.textContent = `Você tem 8 segundos para clicar na cor correta: ${tempoRestante}s`;
                tempoRestante--;

                if (tempoRestante > 0 && rodada <= 10) { // Para entrar neste caso exclusivamente evitar o temporizador travar na rodada 3.
                    console.log("Funcionando como o esperado.");
                    console.log(venceu_rodada);
                    console.log(pontosRodada(rodada, venceu_rodada));
                }

                else {   //Para cair em qualquer outro caso não listado.
                    temporizador_p.textContent = "Tempo esgotado! \nObrigado por jogar";
                    clearInterval(intervalo_var); //Para evitar a acumulação de outros elementos associados a essa função.
                    return;
                }


            }, 1000);
        }
        //Fim do temporizador

        container.appendChild(pontuacao);
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

        botoesContainer.appendChild(botaoSim);
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
        container.innerHTML = "";
        const fechar = document.createElement("button");
        fechar.textContent = "Fechar";

        fechar.onclick = () => {
            
            const fechando = document.createElement("div");
            
            container.className = "jogo-exibicao";

            document.body.appendChild(fechando);

            container.remove(); //Remove tudo que estiver dentro dessa div cujo nome é "container".
        }

        const descricao_fim = document.createElement("p");
        descricao_fim.textContent = "Obrigado por jogar, aperte o botão abaixo para finalizar este jogo.";

        const pontuacao_final = document.createElement("p");
        pontuacao_final.textContent = `Pontos: ${pontosRodada(container, venceu_rodada)}`;

        container.append(descricao_fim);
        container.append(pontuacao_final);
        container.append(fechar);
    } 

    
    function corAleatoria() {
        
        const cores = ["blue", "red", "pink", "gray", "yellow", "white", "brown"];
        let cor;

        cor = cores[Math.floor(Math.random() * cores.length)];
        
        return cor;
    }
    
    function sortearQuadrado(clique_ordem){ //"clique_ordem" é uma lista.
        const espaco_amostral = clique_ordem.length;

        let item_sorteado = clique_ordem[Math.floor(Math.random() * espaco_amostral)].style.backgroundColor;
        
        return item_sorteado;
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

function pontosRodada(rodada, venceu_rodada) {
let pontos = 0;

const regras = [
    {
        aplica: rodada => rodada <= 4 && rodada !== 1,
        calcular: venceu_rodada => venceu_rodada ? 5 : -3
    },

    {
        aplica: rodada => rodada >= 5 && rodada < 9,
        calcular: venceu_rodada => venceu_rodada ? 8 : -5
    },

    {
        aplica: rodada => rodada >= 9 && rodada < 11,
        calcular: venceu_rodada => venceu_rodada ? 11 : -10
    }
];

    for (let regra of regras) {
        if (regra.aplica(rodada)) {
            pontos += regra.calcular(venceu_rodada);
            break; // Encontrou a regra aplicável com base nas condições em aplica e calcula, as propriedades presente no array de objetos "regras", então sai ao do loop ao encontrar ou não encontrar a regra.
        }
    }

    return pontos;
}
