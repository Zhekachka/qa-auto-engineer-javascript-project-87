import yaml from 'yaml'

const parseJson = content => JSON.parse(content)
const parseYaml = content => yaml.parse(content)

export const getParser = (content, format) => {
  switch (format) {
    case 'json':
      return parseJson(content)
    case 'yaml':
    case 'yml':
      return parseYaml(content)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
