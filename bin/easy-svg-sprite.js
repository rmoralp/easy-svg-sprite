'use strict'

const program = require('commander')
const path = require('path')
const rimraf = require('rimraf')

const optimizeFiles = require('./ess/optimizeFiles')
const generateSprite = require('./ess/generateSprite')

program
  .version('0.0.1')
  .option('-P, --pineapple <string>', 'Add pineapple')
  .option(
    '-I, --inputDir <string>',
    'Directory where the svg files are'
  )
  .option(
    '-O, --outputDir <string>',
    'Directory where the svg sprite is going to be'
  )
  .parse(process.argv)

const {
  inputDir,
  outputDir
} = program

const DEFAULT_INPUT_DIR = './icons'
const TEM_DIR = './ess'
const DEFAULT_OUTPUT_DIR = './'

const inputPath = path.resolve(inputDir || DEFAULT_INPUT_DIR)
const tempPath = path.resolve(TEM_DIR)
const outputPath = path.resolve(outputDir || DEFAULT_OUTPUT_DIR)

const cleanTempFolder = () => rimraf.sync(tempPath)

const easySvgSprite = async () => {
  cleanTempFolder()
  await optimizeFiles(inputPath, tempPath)
  await generateSprite(tempPath, outputPath)
  cleanTempFolder()
}

easySvgSprite()
