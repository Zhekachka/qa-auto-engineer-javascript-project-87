import _ from 'lodash'

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2)

const stringify = (value, depth) => {
  if (!_.isObject(value)) return String(value)

  const entries = Object.entries(value)
  const indent = makeIndent(depth + 1)
  const body = entries.map(([k, v]) => `${indent}  ${k}: ${stringify(v, depth + 1)}`).join('\n')
  return `{\n${body}\n${makeIndent(depth)}  }`
}

const formatStylish = (diff, depth = 1) => {
  if (diff.length === 0) return '{}'
  const indent = makeIndent(depth)

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: ${renderStylishDiff(node.children, depth + 1)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n')
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${indent.slice(2)}}`
}

export default formatStylish
