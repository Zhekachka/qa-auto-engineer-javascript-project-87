import renderStylishDiff from './stylish.js'
import renderPlainDiff from './plain.js'
import renderJsonDiff from './json.js'

export const formatDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return renderStylishDiff(diff)
    case 'plain':
      return renderPlainDiff(diff)
    case 'json':
      return renderJsonDiff(diff)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
