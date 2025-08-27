import _ from 'lodash'

export const compare = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2))

  return _.sortBy(keys).flatMap((key) => {
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] }
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] }
    }

    const value1 = data1[key]
    const value2 = data2[key]

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
        value1,
        value2,
      }
    }
    return { type: 'unchanged', key, value: value1 }
  })
}
