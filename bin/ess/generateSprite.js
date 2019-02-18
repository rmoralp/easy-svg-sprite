const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const helpers = require('../helpers')

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
    const filePath = path.resolve(SRC_FOLDER, file)
    const fileName = path.basename(file, path.extname(file))
    const wrapContent = wrapFile.bind(null, fileName)

    return fs.readFile(filePath, 'utf8').then(wrapContent)
  }

  const readSrcFolder = () => {
    return helpers.readSrcFolder(SRC_FOLDER)
  }

  const processFiles = files => {
    const processedFiles = files
      .filter(helpers.filterSvgFile)
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

  return helpers.removeFile(DEST_FILE)
    .then(readSrcFolder)
    .then(processFiles)
    .then(getSpriteContent)
    .then(writeDestFile)
    .then(printFinish)
    .catch(catchErrors);
}

module.exports  = generateSprite