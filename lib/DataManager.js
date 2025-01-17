export class DataManager {
  constructor(cv) {
    this.cv = cv

  }

  async execute(cv) {
    console.log("execute ", cv.input)
    switch (cv.input) {
      case "cat":
        return await this.cat(cv)
        break;
    
      default:
        break;
    }
  }
  async cat(cv){
    console.log("cat ", cv.base[0])
    return "le retour de cat"
  }


}