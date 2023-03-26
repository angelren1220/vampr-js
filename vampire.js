class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    // let numberFromOriginal = 0;
    // let currentVampire = this;

    // while (currentVampire.creator) {
    //   currentVampire = currentVampire.creator;
    //   numberFromOriginal++;
    // }

    // return numberFromOriginal;
    if(!this.creator) {
      return 0;
    }
    return 1 + this.creator.numberOfVampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (!this) {
      return null;
    }
    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      return offspring.vampireWithName(name);
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    total += this.offspring.length;
    for (const child of this.offspring) {
      total += child.totalDescendents;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let arrOfVampires = [];
    if (this.yearConverted > 1980) {
      arrOfVampires.push(this);
    }

    for(const child of this.offspring) {
      const vampires = child.allMillennialVampires;
      arrOfVampires = arrOfVampires.concat(vampires);
    }

    return arrOfVampires;
  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

