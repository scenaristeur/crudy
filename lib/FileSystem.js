// import { promises as fs } from 'fs';
import fs from 'fs'
import { confirm } from '@inquirer/prompts';

export class FileSystem {
  constructor(parameters) {
    this.options = parameters
  }
  //   async execute(cv){
  // console.log("execute", cv.inputArray)


  //   }
  async touch(cv) {
    try {


      const path = cv.options.path
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      //   let dir_exists = await fs.stat(path)
      //   console.log("dir_exists", dir_exists)
      //   if (!dir_exists){
      //     let create_dir = await fs.mkdir(path);
      //     console.log("create dir", create_dir)
      // }
      const filename = path + cv.inputArray[1] + ".json"
      console.log(filename)

      let writeOK = true
      if (fs.existsSync(filename)) {
        writeOK = await confirm({ message: filename + " existe déjà. Êtes vous sûr de vouloir l'écraser par un fichier vide ?", default: false })
      }

      console.log("writeOK", writeOK)

      if (writeOK == true) {
        let output = await fs.writeFileSync(filename, "{}", 'utf8');
        console.log("output", output)
        // //   let exists = await fs.exists(filename)
        // // // fla wx fails if file exists
        // //   let write = await fs.writeFile(filename, {}, { flag: 'wx' }, function (err) {
        // //     if (err) throw err;
        // //     console.log("It's saved!");
        // // });
        return { status: 200, msg: filename + " created" }
      } else {
        return { status: 800, msg: filename + " already exists, ABORTED", }
      }
    }
    catch (e) {
      return { err: e }
    }

    //   console.log("touch", cv, exists, write)
  }
  async ls(cv) {
    try {
      const dir = cv.options.path
      if (cv.inputArray[1] != undefined) dir = dir + cv.inputArray[1]
      let output = await fs.readdirSync(dir)
      output
      return { status: 200, msg: output , currentFilename: this.currentFilename}


    } catch (e) {
      return { err: e }
    }
    console.log("ls")
  }

  async rm(cv) {
    if (cv.inputArray[1] == undefined) {
      console.log("you must specify a file to remove (with .json)")
      return
    }
    try {

      const path = cv.options.path
      let filename = path + cv.inputArray[1]
      let output = await fs.unlinkSync(filename)

      return { status: 200, msg: output }


    } catch (e) {
      return { err: e }
    }
    console.log("ls")
  }

  async use(cv) {
    const path = cv.options.path
    cv.base[0] = cv.inputArray[1]
    this.currentFilename = path + cv.inputArray[1] + ".json"
  }

  async echo(cv) {
    const path = cv.options.path
    let filename = null
    if (cv.inputArray[1] != undefined) {
      path + cv.inputArray[1] + ".json"
    } else {
      filename = this.currentFilename
    }
    console.log(filename)
  }

}