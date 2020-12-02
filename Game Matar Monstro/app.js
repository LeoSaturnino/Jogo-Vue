new Vue({
  el: "#app",
  data: {
    jogando: false,
    logs: [],
    personagens: [
      mago = {
        id: 0,
        img: 'assets/person/mago.jpg',
        animation: 'assets/sprite/Mago/inicial.gif',
        animationOK: true,
        nome: 'Mago',
        vida: 100,
        mana: 5,
        forca: 5,
        especial: 9,
      }, guerreiro = {
        id: 1,
        nome: 'Guerreiro',
        img: 'assets/person/guerreiro.jpg',
        animation: 'assets/sprite/Guerreiro/inicial.gif',
        vida: 120,
        mana: 4,
        forca: 8,
        especial: 5,
      }, arqueiro = {
        id: 2,
        nome: 'Arqueiro',
        img: 'assets/person/arqueiro.jpg',
        animation: 'assets/sprite/Arqueiro/inicial.gif',
        vida: 100,
        mana: 5,
        forca: 7,
        especial: 7,
      }],
    inimigos: [
      fera = {
        id: 0,
        nome: 'Fera',
        img: 'assets/person/fera.jpg',
        animation: 'assets/sprite/Fera/inicial.gif',
        vida: 100,
        raiva: 2,
        forca: 10,
      }, demonio = {
        id: 1,
        nome: 'Demônio',
        img: 'assets/person/demonio.jpg',
        animation: 'assets/sprite/Demônio/inicial.gif',
        animationOK: true,
        vida: 100,
        raiva: 0,
        forca: 12,
      }, troll = {
        id: 2,
        nome: 'Troll',
        img: 'assets/person/troll.jpg',
        animation: 'assets/sprite/Troll/inicial.gif',
        vida: 120,
        raiva: 0,
        forca: 10,
      }],
    jogador: null,
    monstro: null,
    jogadorEscolhido: null,
    monstroEscolhido: null,
  },
  computed: {
    resultado() {
      if (this.jogador && this.monstro) {
        if (this.monstro.vida <= 0) {
          swal('Parabéns!', 'Você Ganhou!', 'success');
        } else if (this.jogador.vida <= 0) {
          swal('Que Pena!', 'Você Perdeu!', 'error');
        }
        return this.jogador.vida <= 0 || this.monstro.vida <= 0;
      }
      return false;
    }
  },
  methods: {
    iniciarGame() {
      if (this.monstroEscolhido == null || this.jogadorEscolhido == null) {
        swal('Escolha os personagens', '', 'error');
        return;
      }
      this.jogador = { ...this.personagens[this.jogadorEscolhido] };
      this.monstro = { ...this.inimigos[this.monstroEscolhido] };
      if (!this.jogador) {
        this.jogador = { ...this.personagens[Math.floor(Math.random() * 2)] };
      }
      if (!this.monstro) {
        this.monstro = { ...this.inimigos[Math.floor(Math.random() * 2)] };
      }
      this.jogando = true;
      this.logs = [];
    },
    escolherPersonagem(num) {
      this.jogadorEscolhido = num;
    },
    escolherInimigo(num) {
      this.monstroEscolhido = num;
    },
    attack(especial) {
      if (especial) {
        this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/ataque_especial.gif";
      } else {
        this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/ataque.gif";
      }
      this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/hit.gif";
      setTimeout(() => {
        let css = "player";
        if (especial == true) {
          this.jogador.mana--;
          css = "player-especial";
        }
        this.dano(this.monstro, this.jogador.forca - 2, this.jogador.forca + 2, especial, "Jogador", "Monstro", css);
        if (this.monstro.vida > 0) {
          this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/ataque.gif";
          this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/hit.gif";
          setTimeout(() => {
            this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/inicial.gif";
            this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/inicial.gif";
          }, 2000);
          this.dano(this.jogador, this.monstro.forca - 2, this.monstro.forca + 2, false, "Monstro", "Jogador", "monster");
        }
      }, 2000);
    },
    dano(personagem, min, max, especial, source, target, cls) {
      const plus = especial ? this.jogador.especial : 0;
      const dano = this.getRandom(min + plus, max + plus);
      personagem.vida = Math.max(personagem.vida - dano, 0);
      this.registerLog(`${source} atingiu ${target} com ${dano}.`, cls);
    },
    curaEdano() {
      this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/vida.gif";
      setTimeout(() => {
        let plus = 0;
        if (this.jogador.id == 0) {
          plus = 5;
        }
        this.cura(10, 15, plus);
        this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/ataque.gif";
        this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/hit.gif";
        setTimeout(() => {
          this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/inicial.gif";
          this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/inicial.gif";
        }, 2000);
        this.dano(this.jogador, this.monstro.forca - 2, this.monstro.forca + 2, false, "Monstro", "Jogador", "monster");
      }, 2000);
    },
    cura(min, max, plus) {
      this.jogador.mana--;
      const cura = this.getRandom(min + plus, max + plus);
      this.jogador.vida = Math.min(this.jogador.vida + cura, 100);
      this.registerLog(`Jogador ganhou ${cura} de vida.`, "player-cura");
    },
    suicidar() {
      this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/dead.gif";
      this.jogador.vida = 0;
      setTimeout(
        this.jogando = false
        , 5000);
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    }
  },
  watch: {
    resultado(value) {
      if (value) {
        this.jogadorEscolhido = null;
        this.monstroEscolhido = null;
        setTimeout(
          this.jogando = false
          , 5000);
      }
      ;
    },
    'monstro.vida': function (novo, antigo) {
      if ((antigo - novo) > 10 && this.monstro.vida > 0) {
        this.monstro.raiva++;
        this.registerLog(`Mostro ganhou 1 de Raiva.`, "monster-raiva")
      }
    },
    'jogador.vida': function (novo, antigo) {
      if ((antigo - novo) > this.monstro.forca && this.jogador.vida > 0) {
        this.jogador.mana++;
        this.registerLog(`Jogador ganhou 1 de Mana.`, "player-mana")
      }
    },
    'monstro.raiva': function (value) {
      if (value == 3) {
        this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/ataque_especial.gif";
        this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/hit.gif";
        setTimeout(() => {
          this.jogador.animation = "assets/sprite/" + this.jogador.nome + "/inicial.gif";
          this.monstro.animation = "assets/sprite/" + this.monstro.nome + "/inicial.gif";
        }, 2000);
        this.jogador.vida -= this.monstro.forca;
        this.monstro.raiva = 0;
        this.registerLog(`Mostro causou ` + this.monstro.forca + ` de dano no jogador.`, "monster-especial")
      }
    },
    'jogador.mana': function () {
      if (this.jogador.mana > this.personagens[this.jogador.id].mana) {
        this.jogador.mana = this.personagens[this.jogador.id].mana;
      }
    }
  }
});
