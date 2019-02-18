const fs = require('fs')
const path = require('path')
const config = require('../config')
const SVGO = require('svgo')
const svgo = new SVGO(config.svgo)

const optimizeFiles = function (inputPath, outputPath) {
  fs.readdir(inputPath, (err, svgFiles) => {
    if (err) throw err
  
    svgFiles.forEach(fileName => {
      const filePath = `${inputPath}/${fileName}`
  
      // Filter not .svg files
      if (path.extname(filePath) !== '.svg') {
        console.log(`The file ${fileName} is not an svg and have been ignored`)
        return
      }
  
      // Get svg data
      fs.readFile(filePath, 'utf8', function(err, svgData) {
        if (err) throw err
  
        svgo.optimize(svgData, {path: filePath}).then(function(result) {
          if (!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath);
          }
  
          fs.writeFile(`${outputPath}/${fileName}`, result.data, err => {
            if (err) throw err
            console.log(`The file ${fileName} has been optimized!`)
          })
        })
      })
  
  
    });
  });
}


module.exports  = optimizeFiles