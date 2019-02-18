const fs = require('fs-extra');
const SVGO = require('svgo')
const config = require('../config')
const helpers = require('../helpers')

const svgo = new SVGO(config.svgo)

const optimizeFiles = async (inputPath, outputPath) => {
  try {
    const files = await fs.readdir(inputPath)
    const svgFiles = files.filter(helpers.filterSvgFile)

    const promises = svgFiles.map(async fileName => {
      const filePath = `${inputPath}/${fileName}`
      const svgData = await fs.readFile(filePath, 'utf8')

      return svgo.optimize(svgData, {path: filePath}).then(result => {
        helpers.ensureDirectory(outputPath)
        helpers.saveFile(`${outputPath}/${fileName}`, result.data)
      })
    })

    return Promise.all(promises)
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports  = optimizeFiles