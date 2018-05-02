//Creating characters
let name = prompt("What is your character's name?");
let gender = prompt("What is your character's gender?");
let race = prompt("What is your character's race? (Human, Elf, Dwarf, Ogre, Pixie)");
let characterRole = prompt("What is your character's class? (Rogue, Warrior, Defender)");

const theHero = new Hero(name, 10, gender, race, characterRole);
const heroGroup = [theHero];
checkRace(theHero, mainHero.race);
checkClass(mainHero, mainHero.characterRole);

console.log(
  `${theHero.name} had been dreaming of adventure for years and finally the day had come. ${theHero.name} will now venture out and face the hoards of foes out there. This would be the first battle...`
);

theHero.equipNewWeapon({
  name: prompt(`Which weapon would you like to use? (Sword, Dagger, Bow)`),
  minDamage: 1,
  maxDamage: 6
});

console.log(
  `As ${theHero.name} pulled the ${theHero.equippedWeapon.name} from the rack, they noticed another rack of armour...`
);

theHero.equipNewArmour({
  name: `Leather`,
  attackBarrierBonus: 3
});

console.log(
  `With weapon and armour now chosen, the battle commenced.`
);

//adding a hero to the group
const bobHero = new Hero(`Bob`, 10, `Male`, `Human`, `Warrior`,
  {attack: 6, sneak: 2, persuade: 1},
  {name: `Dagger`, minDamage: 2, maxDamage: 6},
  {name: `Chain mail`, attackBarrierBonus: 5});

checkClass(bobHero, bobHero.characterRole);
checkRace(bobHero, bobHero.race);

heroGroup.push(bobHero);

console.log(`${bobHero.name} had joined ${theHero.name} to take down their shared enemy...`);

let enemies = [new Monster(`Beasty`, 3, 7, 10, 6, {attack: 0, sneak: 0, persuade: 0}, 1, 2)];

let answer = prompt(`Which action do you wish to take? Attack, Sneak or Persuade?`);

let winner = decisionMaker(answer);
if(winner) {
  console.log(`You succeeded in your ${answer} encounter. Your ${answer} skill has been leveled up!`);
  theHero.levelUp(answer.toLowerCase());
} else {
  console.log(`You lost!`);
}
