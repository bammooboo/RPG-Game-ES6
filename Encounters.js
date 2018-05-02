let persuadeEncounter = (heroes, enemies) => {
  let persuadeBarrier = 0;
  let persuadePower = 0;
  enemies.forEach(enemy => {
    persuadeBarrier += enemy.barriers.persuade;
  });
  heroes.forEach(hero => {
    persuadePower += hero.persuade();
  });
  return persuadePower >= persuadeBarrier;
};

let sneakEncounter = (heroes, enemies) => {
  let sneakBarrier = 0;
  let sneakPower = 0;
  enemies.forEach(enemy => {
    sneakBarrier += enemy.barriers.sneak;
  });
  heroes.forEach(hero => {
    sneakPower += hero.sneak();
  });
  return sneakPower >= sneakBarrier;
};

const fightEncounter = (heroes, enemies, heroesFirst) => {
  let fighting = true;
  let totalHeroes = heroes.length;
  let totalEnemies = enemies.length;
  while(fighting) {
    if(heroesFirst) {
      totalEnemies -= teamAttack(heroes, enemies);
      totalHeroes -= teamAttack(enemies, heroes);
    } else {
      totalHeroes -= teamAttack(enemies, heroes);
      totalEnemies -= teamAttack(heroes, enemies);
    }
    if(totalHeroes === 0) {
      console.log(`All heroes are eliminated.`);
      return false;
    }
    if(totalEnemies === 0) {
      console.log(`All enemies have been defeated.`);
      return true;
    }
  }
};

function teamAttack(attackers, defenders) {
  let totalInjured = 0;
  const totalAvailableDefenders = 0;
  defenders.forEach(defender => {
    if(!defender.isInjured) {
      totalAvailableDefenders++;
    }
  });
  attackers.forEach(attacker => {
    if(attacker.isInjured || totalAvailableDefenders === 0) {
      return;
    }

    let target, randomTargetIndex;

    while(!target) {
      randomTargetIndex = Math.floor(Math.random() * defenders.length);

      if(!defenders[randomTargetIndex].isInjured) {
        target = defenders[randomTargetIndex];
      }
    }

    if(attacker.attack() >= target.barriers.attack) {
      let damage = attacker.dealDamage();
      target.currentHealth -= damage;
      console.log(`${attacker.name} (${attacker.currentHealth}) hit ${target.name} (${target.currentHealth})`);
      if(target.currentHealth <= 0) {
        console.log(`${target.name} is injured!`);
        target.isInjured = true;
        totalInjured++;
        totalAvailableDefenders--;
      }
    } else {
      console.log(`${attacker.name} missed!`);
    }
  });
  return totalInjured;
};

const decisionMaker = (answer) => {
 let lowerAnswer = answer.toLowerCase();

 let result;

 switch (lowerAnswer) {
   case `attack`:
     result = fightEncounter(heroGroup, enemies, true);
     break;
   case `sneak`:
     result = sneakEncounter(heroGroup, enemies);
     break;
   case `persuade`:
     result = persuasionEncounter(heroGroup, enemies);
     break;
   default:
     return decisionMaker(prompt(`Check your spelling? Please choose Attack, Sneak, or Persuade?`));
     break;
   }
   return result;
}
