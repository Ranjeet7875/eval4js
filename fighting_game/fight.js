class Warrior{
    constructor(name,attackPower=10,health=100,stamina=50,weapon=null){
        this.name=name;
        this.attackPower=attackPower;
        this.health=health;
        this.stamina=stamina;
        this.weapon=weapon;
        this.#specialCooldown=0
    }
    #specialCooldown;

    get health(){
        return this.health
    }
    set health(value){
        if (value<0){
            console.log(this.name,"'s health can't be negatuve.setting healrth to 0")
            this.stamina=0

        }else{
            this.stamina=value
        }
    }

    basicAttack(){
        if(this.health<=0){
            console.log(this.name,"is dead and cannot attack")
            return
        }
        if (this.stamina<5){
            console.log(this.name,"doest have enough stamina to perform a basicc attack")
            return ;
        }
        const weaponDamges=this.weapon ? this.weapon.damagesBoost:0;
        const damage=this.attackPower+weaponDamges;
        this.stamina=-5
        this.battelog(this.name,"attack with ${damage} damages")
        return damage;

    }
    #decrementCooldown(){
        if(this.#specialCooldown>0){
            this.#specialCooldown--;
        }
    }

    battelog(message){
        const battleLogElement=document.getElementById('battleLog')
        const newLog=document.createElement('div')
        newLog.textContent=message;
        battleLogElement.appendChild(newLog)
        battleLogElement.scrollTop=battleLogElement.scrollHeight

    }
    isAlive(){
        return this.health>0;
    }
    specialAbility(){
        console.log("Special ability not implemented")
    }

}

class Knight extends Warrior{
    constructor(name){
        super(name,12);
    }
    specialAbility(){
        if(this.health<=10) return ;
        if(this.stamina<10) return;
        if(this.#specialCooldown>0) return ;
        this.stamina=-10;
        this.#specialCooldown=3
        this.battelog(this.name,'uses shield Block! Incoming damage is ha;ved this turn')
    }


}
class Ninja extends Warrior{
    constructor(name){
        super(name,15)
    }
    specialAbility(){
        if(this.health<=0) return;
        if(this.stamina<10) return;
        if(this.#specialCooldown>0) return;
        this.stamina-=10
        this.attackPower*=2
        this.battelog(this.name,"uses stealth Attack!")
    }
}
class Weapon{
    constructor(name,damagesBoost){
        this.name=name;
        this.damagesBoost=damagesBoost;
    }
    use(){
        console.log(this.name,"used!")
    }
}
class Sword extends Weapon{
    constructor(){
        super("Sword",10);
    }
    use(){
        console.log("Slash with a powerful sword")
    }
}
const knight=new Knight("kapil");
const ninja=new Ninja("Shadow");
knight.equipWeapon(new Sword());
ninja.equipWeapon(new Sword())
document.getElementById('warrior1name').textContent='Knight: ${knight.name}';
document.getElementById('warrior2name').textContent='ninja: ${ninja.name}';
function updateStats(){
    document.getElementById("warrior1stats").textContent='Health: ${knight.health} | Stamina: ${knight.stamina}'
    document.getElementById("warrior1stats").textContent='Health: ${ninja.health} | Stamina: ${ninja.stamina}'
}
updateStats();
function battleTurn(attacker,defender,attackType){
    if(attackType=="basic"){
        const damage=attacker.basicAttack();
        defender.health-=damage;
        if(defender.health<=0){
            document.getElementById('battleStatus').textContent='${attacker.name} wins!';
            return;
        }

    }else if(attackType=="special"){
        attacker.specialAbility()
    }
    attacker.#decreamentCooldown()
    defender.#decreamentCooldown()
    updateStats();



}
document.getElementById('warrior1Attack').addEventListener('click',()=>{
    battleTurn(knight,ninja,"basic");
})
document.getElementById('warrior1Special').addEventListener('click',()=>{
    battleTurn(knight,ninja,"special");
})
document.getElementById('warrior2Attack').addEventListener('click',()=>{
    battleTurn(knight,ninja,"basic");
})
document.getElementById('warrior2Special').addEventListener('click',()=>{
    battleTurn(knight,ninja,"special");
})

