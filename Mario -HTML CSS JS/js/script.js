
// Declarar uma constante que vai pegar a imagem do mario de dentro do html. Usando o seletor de classe, vai pegar a classe
// com o nome igual ao que foi colocado no CSS e na tag da imagem no html
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');

// Agora que já pegou a imagem do mario de dentro do html através da classe, vai adicionar ao mário a classe Jump
// SetTimeout tem 2 parâmetros, função e tempo, dado o tempo que foi pedido, ele executa a função 
// offsetLeft é a distancia até a borda esquerda
// x.style.animation modifica a propriedade das animações
// window.getcomputedstyle() retornou uma string com 0px, como não é possivel realizar operação matematica com o 'px' no meio
// então foi necessário substituir o 'px' por nada. 
// o + na frente do window serve para converter o valor da string que ele retorna para um número 
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}

const loop = setInterval(() => {
    const pipe_position = pipe.offsetLeft;
    const cloud_position = cloud.offsetLeft;
    const mario_position = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    // assim que a posição for menor que 120, ele para a animação do cano, e deixa o cano parado na posição atual, setando
    // o valor dele com a string.
    if (pipe_position <= 120 && pipe_position > 0 && mario_position < 80) {
        // Parando a animação do cano
        pipe.style.animation = 'none';
        pipe.style.left = `${pipe_position}px`;

        // Parando a animação do mario - Posição do mario sempre em relação ao solo
        mario.style.animation = 'none';
        mario.style.bottom = '80px';

        // Parando a animaçã das nuvens 
        cloud.style.animation = 'none';
        cloud.style.left = `${cloud_position}px`;

        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginleft = '50px';

        clearInterval(loop)
    }
}, 10)

// Vai adicionar um escutador de eventos, para quando pressionar uma tecla ele executar a ação
document.addEventListener('keydown', jump);