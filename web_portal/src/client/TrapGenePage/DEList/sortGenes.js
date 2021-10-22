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
  sig_code: makeStringComparator('sig_code'),
  direction: makeStringComparator('direction'),
  sko_expr: makeNumericComparator('sko_expr'),
  wt_expr: makeNumericComparator('wt_expr'),
  dko_expr: makeNumericComparator('dko_expr'),


}

const sortGenes = (genes, { sortKey, sortOrder }) => {
  const baseComparator = comparators[sortKey]
  const comparator = sortOrder === 'ascending' ? baseComparator : (a, b) => baseComparator(b, a)

  console.log("In sortGenes")
  return [...genes].sort(comparator)
}

export default sortGenes
