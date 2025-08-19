import _ from 'lodash'

const stylish = (diff) => {

  if (diff.length === 0) return '{}'
  
  const lines = diff.map(({ type, key, value }) => {
    const normalizedValue = _.isObject(value) ? '[complex value]' : value
    switch (type) {
      case 'added':
        return `  + ${key}: ${normalizedValue}`
      case 'removed':
        return `  - ${key}: ${normalizedValue}`
      case 'unchanged':
        return `    ${key}: ${normalizedValue}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })
  return `{\n${lines.join('\n')}\n}`
}

export default stylish
