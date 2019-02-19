const {resolve, basename, extname} = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const {readSrcFolder, filterSvgFile, removeFile} = require('../helpers')

function generateSprite(inputDir, outputPath) {
  const SPRITE_NAME = 'ess-sprite.svg'
  const SRC_FOLDER = inputDir;
  const DEST_FILE = `${outputPath}/${SPRITE_NAME}`;
  const ID_PREFIX = 'icon-';

  const getSvgElement = content => {
    const $ = cheerio.load(content)
    return $('svg').first()
  }

  const getViewbox = content => {
    return getSvgElement(content).attr('viewbox')
  }

  const getPreserveAspectRatio = content => {
    return getSvgElement(content).attr('preserveaspectratio')
  }

  const constructId = fileName => {
    return (ID_PREFIX + fileName).replace(' ', '-')
  }

  const constructAttributesString = attributes => {
    return Object.keys(attributes).reduce((acc, key) => {
      const value = attributes[key]
      return value
        ? `${acc} ${key}='${value}'`
        : acc
    }, '')
  }

  const getSvgContent = content => {
    return getSvgElement(content).html()
  };

  const createSymbol = (content, attributes) => {
    return `<symbol ${constructAttributesString(attributes)}>
      ${getSvgContent(content)}
    </symbol>`
  }

  const wrapFile = (fileName, content) => {
    const attributes = {
      viewBox: getViewbox(content),
      id: constructId(fileName),
      preserveAspectRatio: getPreserveAspectRatio(content)
    }

    return createSymbol(content, attributes)
  }

  const processFile = file => {
    const filePath = resolve(SRC_FOLDER, file)
    const fileName = basename(file, extname(file))
    const wrapContent = wrapFile.bind(null, fileName)

    return fs.readFile(filePath, 'utf8').then(wrapContent)
  }

  const readFolder = () => {
    return readSrcFolder(SRC_FOLDER)
  }

  const processFiles = files => {
    const processedFiles = files
      .filter(filterSvgFile)
      .map(processFile)

    return Promise.all(processedFiles)
  };

  const getSpriteContent = contents => {
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
      + 'style="width: 0; height: 0; visibility: hidden; position: absolute;" aria-hidden="true">'
      + contents.join('')
      + '</svg>'
  };

  const writeDestFile = content => {
    return fs.writeFile(DEST_FILE, content, 'utf8')
  };

  const printFinish = () => {
    console.log(`File ‘${SPRITE_NAME}’ successfully generated.`)
  };

  const catchErrors = err => {
    throw err
  }

  return removeFile(DEST_FILE)
    .then(readFolder)
    .then(processFiles)
    .then(getSpriteContent)
    .then(writeDestFile)
    .then(printFinish)
    .catch(catchErrors);
}

module.exports  = generateSprite