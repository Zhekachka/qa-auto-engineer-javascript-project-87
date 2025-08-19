import stylish from './stylish.js'

export const formatDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
