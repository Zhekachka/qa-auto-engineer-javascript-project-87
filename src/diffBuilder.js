import _ from 'lodash'

export const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
  return _.sortBy(keys).flatMap((key) => {
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: compare(value1, value2),
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      }
    }
    return { type: 'unchanged', key, value: value1 }
  })
}

