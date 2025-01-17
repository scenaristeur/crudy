import { JqWrapper } from './JqWrapper.js'; 

const jq = new JqWrapper()
export class DataManager {
  constructor(cv) {
    this.cv = cv

  }

  async execute(cv) {
    const cmd = cv.inputArray[0] 
    console.log("execute ", cmd)
    switch (cmd) {
      case "cat":
        case "type":
        return await this[cmd] (cv)
        break;
    
      default:
        console.log("[DataManager] !!! Non implemented yet : ",cmd)
        break;
    }
  }
  async cat(cv){
    let cat = await jq.type(cv )
    
    console.log(cat)
    return cat
  }
  async type(cv){
    let t = await jq.type(cv )
    
    console.log(t)
    return t
  } 


}