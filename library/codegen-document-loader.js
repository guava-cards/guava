const { parse } = require('graphql')
const { readFileSync } = require('fs')
const { importSchema } = require('graphql-import')

/**
 * @param {string} docString
 * @param {Record<string, any>} config
 */
module.exports = function (docString, config) {
  const documentContent = readFileSync(docString, { encoding: 'utf-8' })
  const transformedContent = importSchema(documentContent)
  return parse(transformedContent)
}
