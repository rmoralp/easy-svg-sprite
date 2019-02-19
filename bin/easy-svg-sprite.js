#!/usr/bin/env node

const program = require('commander')
const {resolve} = require('path')
const rimraf = require('rimraf')
const pkg = require('../package.json')
const version = pkg.version

const optimizeFiles = require('./ess/optimizeFiles')
const generateSprite = require('./ess/generateSprite')

program
  .version(version, ' --version')
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

const inputPath = resolve(inputDir || DEFAULT_INPUT_DIR)
const tempPath = resolve(TEM_DIR)
const outputPath = resolve(outputDir || DEFAULT_OUTPUT_DIR)

const cleanTempFolder = () => rimraf.sync(tempPath)

const easySvgSprite = async () => {
  cleanTempFolder()
  await optimizeFiles(inputPath, tempPath)
  await generateSprite(tempPath, outputPath)
  cleanTempFolder()
}

easySvgSprite()
