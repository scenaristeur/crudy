// import { promises as fs } from 'fs';
import fs from 'fs'

export class FileSystem {
  constructor(parameters) {
    this.options = parameters
    this.path

  }
//   async execute(cv){
// console.log("execute", cv.inputArray)


//   }
async touch(cv){
  const base = cv.options.base
  if(!fs.existsSync(base)){
    fs.mkdirSync(base)
  }
//   let dir_exists = await fs.stat(base)
//   console.log("dir_exists", dir_exists)
//   if (!dir_exists){
//     let create_dir = await fs.mkdir(base);
//     console.log("create dir", create_dir)
// }
  const filename = base+cv.inputArray[1]+".json"
console.log(filename)
let output = await fs.writeFileSync(filename, "{}", 'utf8');
console.log("output",output)
// //   let exists = await fs.exists(filename)
// // // fla wx fails if file exists
// //   let write = await fs.writeFile(filename, {}, { flag: 'wx' }, function (err) {
// //     if (err) throw err;
// //     console.log("It's saved!");
// // });


//   console.log("touch", cv, exists, write)
}
  async ls(cv){

    console.log("ls")
  }
}