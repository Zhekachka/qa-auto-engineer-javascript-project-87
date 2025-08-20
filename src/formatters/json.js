const formatJson = (diff) => {
  const addedKeys = diff.filter(node => node.type === 'added').map(node => ({ [node.key]: node.value }))
  const removedKeys = diff.filter(node => node.type === 'removed').map(node => node.key)
  const changedKeys = diff
    .filter(node => node.type === 'changed')
    .map(node => ({ [node.key]: { oldValue: node.oldValue, newValue: node.newValue } }))

  return JSON.stringify({
    added: addedKeys,
    removed: removedKeys,
    changed: changedKeys,
  }, null, 2)
}

export default formatJson
