# Game Matar Monstro

<h3>Descrição</h3>
Jogo de batalha em turnos com objetivo de Matar o Monstro Adversário

<h3>Tecnologias</h3>
- HTML5
- CSS3
- VueJS
- JavaScript

<h3>Objetivo</h3>
Aprender a linguagem de Programação VueJS e como as tecnologias reativas funcionam.

<h3>Funcionamento</h3>
O Jogador começa escolhendo o seu Herói e o Monstro adversário que irá Batalhar, cada Personagem tem pontos de atributos diferentes (vida, força, mana ou raiva), sendo executado uma ação por turno com o objetivo de zerar a vida do Adversário.
![jmm - incio](https://user-images.githubusercontent.com/22065816/109401543-24ee8500-792e-11eb-8265-f457b0c3a728.png)

Após inciar o Jogo o jogador tem 4 opções de Movimento:
- Ataque = o movimento basico onde o herói realiza um golpe com base na sua força e retirando vida do Monstro
- Ataque Especial = o herói realiza um golpe mais forte, consumindo 1 da sua mana disponível
- Cura = O herói deixa de atacar este turno para recuperar um pouco de vida, consumindo 1 da sua mana disponível
- Suicidar = Opção no qual o Jogador desiste do Jogo e encera a partida com detora
![jmm - interface](https://user-images.githubusercontent.com/22065816/109401498-e8228e00-792d-11eb-8a35-4e29ef8c875e.png)

Para cada Ação do Jogador o Monstro Adversário realizará um Ataque com base na força do monstro.

Mecânicas do Jogo:
- Ganho de Mana/Raiva = sempre que o herói toma um dano crítico ele ganha um de mana, o crítico é calculado em função da força dos personagens.
- Ataque de Raiva = Quando o Monstro atige 3 de Raiva ele executa um ataque extra.
- Ataque = É calculado em função da força do Personagem com uma variação de +2 ou -2.
- Cura = É soretado um valor entre 10 e 15 + o valor de especial do herói.
- Ataque Especial = É calculado em função da força do Personagem + o valor de especial podendo varia +2 ou -2.

O jogo também conta com um sistema de Logs, que fica na parte de baixo da tela com o detalhe das ações executadas.

<h3>Bônus</h3>
Durante o projeto também estaja estudando sobre Spite de animações 2D/8bits e foi adicionado em dois personagens, algumas animações que ocorrem durante as ações.

![jmm - sprite](https://user-images.githubusercontent.com/22065816/109401515-fec8e500-792d-11eb-8ac0-1ef16184229a.PNG)

Está parte não está finaliza pois o objetivo era aprender sobre o VueJS e não criação/adição de Sprite.

<h3>Execução</h3>
Bastar Realizar o download do Projeto e abrir o arquivo index.html.
O Projeto utilizao VueJS online entâo não é necessário realizar a instalação das dependências.
![jmm - animation](https://user-images.githubusercontent.com/22065816/109401548-2a4bcf80-792e-11eb-8f37-f6f1a31b94e7.png)
