const fs = require('fs-extra')
const path = require('path')

const filterSvgFile = file => {
  return path.extname(file) === '.svg'
};

const ensureDirectory = dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}

const saveFile = (filePath, content) => {
  fs.writeFile(filePath, content, err => {
    if (err) throw err
  })
}

const removeFile = filePath => {
  return fs.remove(filePath)
}

const readSrcFolder = dir => {
  return fs.readdir(dir)
}

module.exports = {
  filterSvgFile,
  ensureDirectory,
  saveFile,
  removeFile,
  readSrcFolder
}