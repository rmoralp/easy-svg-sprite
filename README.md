# easy-svg-sprite

This package has been created thinking about improving the creation of icons sprites.

A tool that takes a bunch of icons in SVG, optimizes them and generate a SVG sprite ready for use in your website as an icon library.

## Installation

```sh
npm install easy-svg-sprite
```

## Usage

It takes all the .svg files in folder, optimize them and finally generate a sprite.
All the icons in the sprite has the prefix `icon-`, so an "arrow-left.svg" is going to become "icon-arrow-left"

### <abbr title="Command Line Interface">CLI</abbr> Options

```
Usage: easy-sprite [OPTIONS]

Options:

  --version : Version
  -I INPUT, --input=INPUT : Input directory, where the .cvg icons are (by default ./icons directory)
  -o OUTPUT, --output=OUTPUT : Output folder (by default the current path)
```

### Examples

```sh
$ easy-sprite -I ./files -O ./dist
```

## How can I use it in html?

```
<svg xmlns="http://www.w3.org/2000/svg" role="img">
  <use xlink:href="ess-sprite.svg#icon-arrow-left" />
</svg>
```
