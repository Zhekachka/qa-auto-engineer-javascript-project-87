import yaml from 'yaml'

export const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yaml':
    case 'yml':
      return yaml.parse(content)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
