// Преобразовываем в джисон формат
const formatJson = (diff) => {
  const result = {
    removed: [], // для удаленных
    added: [], // для добавленных
    changed: [], // для измененных
  }

  diff.forEach((node) => { // обработка каждого параметра
    switch (node.type) {
      case 'removed':
        result.removed.push(node.key) // только ключ
        break
      case 'added':
        result.added.push({ [node.key]: node.value }) // ключ и значение
        break
      case 'changed':
        result.changed.push({
          [node.key]: { // историю
            oldValue: node.oldValue, // до
            newValue: node.newValue, // после
          },
        })
        break
      default:
        break
    }
  })

  return JSON.stringify(result, null, 2) // два пробела для отступов
}

export default formatJson
