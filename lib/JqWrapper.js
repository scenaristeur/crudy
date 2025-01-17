import jq from 'node-jq'

export class JqWrapper {
  constructor() {


  }
  async type(cv) {
    const filename = cv.options.path + cv.base[0] + '.json'
    console.log(filename)
    // const filter = 'map(type)'
    const filter = 'type'
    const jsonPath = filename
    const options = {}

    jq.run(filter, jsonPath, options)
      .then((output) => {
        console.log("type",output)

      })
  }

  async cat(cv) {
    const filename = cv.options.path + cv.base[0] + '.json'
    console.log(filename)
    const filter = '.'
    const jsonPath = filename
    const options = {}

    jq.run(filter, jsonPath, options)
      .then((output) => {
        console.log("cat",output)

      })
  }
}
