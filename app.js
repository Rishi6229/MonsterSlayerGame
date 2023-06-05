function getRandomValue(max, min) {
  return Math.floor(Math.random() * (12 - 5)) + 5;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      surrender:false,
      logMessages:[]
    };
  },
  methods: {
    startGame(){
        this.playerHealth = 100
        this.monsterHealth = 100
        this.winner = null
        this.currentRound = 0
        this.logMessages = []
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player' , 'attack' , attackValue)
      this.counterMonster();
    },
    counterMonster() {
      const counterAttack = getRandomValue(15, 8);
      this.playerHealth -= counterAttack;
      this.addLogMessage('monster' , 'attack' , attackValue)
    },
    speacialAttack() {
      this.currentRound++;
      const specialAttack = getRandomValue(40, 30);
      this.monsterHealth -= specialAttack;
      this.addLogMessage('player' , 'Special attack' , specialAttack)
      this.specialAttackCounter();
    },
    specialAttackCounter() {
      const specialAttackCounter = getRandomValue(12, 5);
      this.playerHealth -= specialAttackCounter;
    },
    healDamage() {
      this.currentRound++;
      const healedHealth = getRandomValue(15, 10);
      this.addLogMessage('player' , 'heal' , healedHealth)
      if (this.playerHealth + healedHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healedHealth;
      }
      this.counterAttack();
    },
    surrender(){
        this.winner = 'monster'
        this.playerHealth = 0
    },
    addLogMessage(who , what , value){
        this.logMessages.unshift({
            actionBy:who,
            actionType:what,
            actionValue:value
        })
    }
  },
  computed: {
    monsterBarStyles() {
        if(this.monsterHealth <= 0)
        {
            return {width:'0%'};
        }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
        if(this.playerHealth <= 0)
        {
            return {width: '0%'}
        }
      return { width: this.playerHealth + "%" };
    },
    disabledButton() {
      return this.currentRound % 3 !== 0;
    },
    healedRound() {
      return this.currentRound % 5 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth === 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'player'
      }
      return
    },
  },
});

app.mount("#game");
