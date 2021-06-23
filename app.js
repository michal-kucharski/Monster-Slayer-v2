const app = Vue.createApp({
    data() {
        return {
            playerHealth: 0,
            monsterHealth: 0,
            specialAttackCD: 0,
            healCD: 0,
            battleLog: [],
            gameOn: false,
            surrenderText: '',
            endGameText: ''
        };
    },
    methods: {
        startGame() {
            if(!this.gameOn) {
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.specialAttackCD = 4;
                this.healCD = 3;
                this.battleLog = [];
                this.gameOn = true;
                this.endGameText = '';
            }
        },
        surrenderGame() {               
            this.gameOn = false;                  
            this.endGameText = 'You fleed.';   
        },
        endGame() {            
            if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                this.playerHealth = 0;
                this.monsterHealth = 0;
                this.endGameText = "You killed a monster but at the same time u also died.";
                this.gameOn = false;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                this.endGameText = 'You get slayed!';
                this.gameOn = false;
            } else if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                this.endGameText = "You killed a monster!";
                this.gameOn = false;
            }
        },
        playerAttack() {
            const playerDamage = this.calculateAmmount(5, 15);
            this.monsterHealth -= playerDamage;
            this.battleLog.unshift(`Player attacked Monster for ${playerDamage}`);
            this.checkCooldowns();
            this.endGame();         
        },
        monsterAttack() {
            const monsterDamage = this.calculateAmmount(8, 18);
            this.playerHealth -= monsterDamage;
            this.battleLog.unshift(`Monster attacked Player for ${monsterDamage}`);
            this.endGame(); 
        },
        specialAttack(power) {
            const playerDamage = this.calculateAmmount(8, 18) + power;
            this.monsterHealth -= playerDamage;
            this.battleLog.unshift(`Player attacked Monster for ${playerDamage}`);
            this.checkCooldowns()
            this.specialAttackCD = 4;   
            this.endGame();         
        },
        heal() {
            const healAmount = this.calculateAmmount(5,10)
            this.playerHealth += healAmount;
            this.battleLog.unshift(`Player healed for ${healAmount}`);
            this.checkCooldowns()
            this.healCD = 3;
        },
        checkCooldowns() {
            if(this.specialAttackCD !== 0) {
                this.specialAttackCD--
            }
            if(this.healCD !== 0) {
                this.healCD--
            }
        },
        calculateAmmount(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);     
        },
    }
})

app.mount("#game");
