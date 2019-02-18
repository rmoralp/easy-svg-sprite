const svgo = {
  plugins: [
    {
      cleanupAttrs: true
    },
    {
      removeDoctype: true
    },
    {
      removeXMLProcInst: true
    },
    {
      removeComments: true
    },
    {
      removeMetadata: true
    },
    {
      removeTitle: true
    },
    {
      removeDesc: true
    },
    {
      removeUselessDefs: true
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeEmptyText: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeViewBox: false
    },
    {
      cleanupEnableBackground: true
    },
    {
      convertStyleToAttrs: true
    },
    {
      convertColors: true
    },
    {
      convertPathData: true
    },
    {
      convertTransform: true
    },
    {
      removeUnknownsAndDefaults: true
    },
    {
      removeNonInheritableGroupAttrs: true
    },
    {
      removeUselessStrokeAndFill: true
    },
    {
      removeUnusedNS: true
    },
    {
      cleanupIDs: true
    },
    {
      cleanupNumericValues: true
    },
    {
      moveElemsAttrsToGroup: true
    },
    {
      moveGroupAttrsToElems: true
    },
    {
      collapseGroups: true
    },
    {
      removeRasterImages: false
    },
    {
      mergePaths: true
    },
    {
      convertShapeToPath: true
    },
    {
      sortAttrs: true
    },
    {
      removeDimensions: true
    },
    {
      removeAttrs: {attrs: '(stroke|fill)'}
    }
  ]
}

var spriter = {
  dest: '.', // Main output directory
  log: null, // Logging verbosity (default: no logging)
  shape: { // SVG shape related options
      id: { // SVG shape ID related options
          separator: '--', // Separator for directory name traversal
          generator: function () { /*...*/ }, // SVG shape ID generator callback
          pseudo: '~' // File name separator for shape states (e.g. ':hover')
      },
      dimension: {// Dimension related options
          maxWidth: 2000, // Max. shape width
          maxHeight: 2000, // Max. shape height
          precision: 2, // Floating point precision
          attributes: false, // Width and height attributes on embedded shapes
      },
      spacing: { // Spacing related options
          padding: 0, // Padding around all shapes
          box: 'content' // Padding strategy (similar to CSS `box-sizing`)
      },
      transform: ['svgo'], // List of transformations / optimizations
      meta: null, // Path to YAML file with meta / accessibility data
      align: null, // Path to YAML file with extended alignment data
      dest: null // Output directory for optimized intermediate SVG shapes
  },
  svg: { // General options for created SVG files
      xmlDeclaration: true, // Add XML declaration to SVG sprite
      doctypeDeclaration: true, // Add DOCTYPE declaration to SVG sprite
      namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
      namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
      dimensionAttributes: true // Width and height attributes on the sprite
  },
  variables: {} // Custom Mustache templating variables and functions
}

module.exports = {
  svgo,
  spriter
};
