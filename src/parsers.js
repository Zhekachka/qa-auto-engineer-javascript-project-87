import yaml from 'yaml'

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.parse,
  '.yaml': yaml.parse,
}

export const getParser = (fileType) => {
  const parser = parsers[fileType]
  if (!parser) {
    throw new Error(`Unsupported file format: ${fileType}`)
  }
  return parser
}
