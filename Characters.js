class BaseCharacter {
  constructor(name, health, skills = {attack: 0, sneak: 0, persuade: 0}) {
    this.name = name;
    this.maxHealth = health;
    this.currentHealth = health;
    this.isInjured = false;
    this.barriers = {
      attack: 10,
      sneak: 10,
      persuade: 10
    };
    this.skills = skills;
  }

  attack() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.attack;
  };

  dealDamage() {
    return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1));
  };

  persuade() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.persuade;
  };

  sneak() {
    return Math.floor(Math.random() * 20 + 1 + this.skills.sneak);
  };
};

class Hero extends BaseCharacter {
  constructor(name, health, gender, race, role, skills,
    weapon = {
      name: `None`,
      minDamage: null,
      maxDamage: null
    },
    armour = {
      name: `None`,
      attackBarrierBonus: null
    }) {
    super(name, health, skills);
    this.gender = gender;
    this.race = race;
    this.characterRole = role;
    this.equippedWeapon = weapon;
    this.equippedArmour = armour;
  };

  levelUp(skill) {
    this.maxHealth += Math.floor(Math.random() * 6) + 1;
    this.skills[skill] += 1;
  };

  equipNewWeapon(newWeapon) {
    this.equippedWeapon = newWeapon;
  };

  equipNewArmour(newArmour) {
    this.equippedArmour = newArmour;
    if(this.equippedArmour.attackBarrierBonus) {
      this.barriers.attack -= this.equippedArmour.attackBarrierBonus;
    }
    if(newArmour.attackBarrierBonus) {
      this.barriers.attack += newArmour.attackBarrierBonus;
    }
  };
  rest() {
    this.currentHealth = this.maxHealth;
    this.isInjured = false;
  };
};

const checkClass = (hero, characterClass) => {
  let lowerCharacterClass = characterClass.toLowerCase();

  switch(lowerCharacterClass) {
    case `warrior`:
      hero.skills.attack += 4;
      hero.skills.sneak--;
      break;
    case `defender`:
      hero.skills.attack++;
      hero.skills.sneak++;
      hero.skills.persuade++;
      break;
    case `rogue`:
      hero.skills.sneak += 3;
      hero.skills.attack--;
      break;
    default:
      characterClass = prompt(`"${characterClass}" is not a valid class. Please choose again.`);
      hero.characterRole = characterClass;
      checkClass(hero, characterClass);
      break;
  }
};

const checkRace = (hero, race) => {
  let lowerCaseRace = race.toLowerCase();

  switch(lowerCaseRace) {
    case `human`:
      break;
    case `elf`:
      hero.skills.persuade++;
      hero.barriers.persuade++;
      hero.skills.attack--;
      hero.barriers.sneak--;
      break;
    case `dwarf`:
      hero.skills.attack++;
      hero.barriers.attack++;
      hero.skills.sneak--;
      hero.barriers.persuade--;
      break;
    case `ogre`:
      hero.skills.sneak--;
      hero.barriers.sneak--;
      hero.skills.attack++;
      hero.barriers.persuade++;
      break;
    case `pixie`:
      hero.skills.attack--;
      hero.barriers.attack--;
      hero.skills.sneak++;
      hero.barriers.persuade++;
      break;
    default:
      race = prompt(`${race} is not a valid race. Please choose again.`);
      hero.race = race;
      checkRace(hero, race);
      break;
  }
};

class Monster extends BaseCharacter {
  constructor(name, health, attackBarrier, persuadeBarrier, sneakBarrier, skills, minDamage, maxDamage) {
    super(name, health, skills);
    this.barriers.attackBarrier = attackBarrier;
    this.barriers.persuade = persuadeBarrier;
    this.barriers.sneak = sneakBarrier;
    this.equippedWeapon = {
      minDamage: minDamage;
      maxDamage: maxDamage
    }
  };
};
