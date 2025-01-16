export class DataManager {
  constructor(cv) {
    this.cv = cv

  }

  async execute(cv) {
    console.log("execute ", cv.input)
  }
}