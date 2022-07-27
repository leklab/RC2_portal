function isEmpty(val) {
  return val === undefined || val === null || val === ''
}

const makeComparator = (key, fn) => (v1, v2) => {
  if (isEmpty(v1[key])) {
    return 1
  }
  if (isEmpty(v2[key])) {
    return -1
  }
  return fn(v1[key], v2[key])
}

const makeStringComparator = key => makeComparator(key, (v1, v2) => v1.localeCompare(v2))
const makeNumericComparator = key => makeComparator(key, (v1, v2) => v1 - v2)

const comparators = {
  //consequence: makeStringComparator('consequence'),
  pvalue: makeNumericComparator('pvalue'),
  fc: makeNumericComparator('fc'),
}

const sortMetabolites = (metabolites, { sortKey, sortOrder }) => {
  const baseComparator = comparators[sortKey]
  const comparator = sortOrder === 'ascending' ? baseComparator : (a, b) => baseComparator(b, a)

  console.log("In sortMetabolites")
  return [...metabolites].sort(comparator)
}

export default sortMetabolites
