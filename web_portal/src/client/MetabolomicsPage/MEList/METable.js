import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { Grid } from './Grid'
import Link from '../../Link'

const NoVariants = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height}px;
  border: 1px dashed gray;
  font-size: 20px;
  font-weight: bold;
`

const METableWrapper = styled.div`
  width: 600px;
`


const renderExponentialNumberCell = (row, key) => {
  const number = row[key]
  if (number === null || number === undefined) {
    return ''
  }
  const truncated = Number(number.toPrecision(3))
  if (truncated === 0) {
    return '0'
  }
  return truncated.toExponential()
}

const truncateNum = (row, key) => {
  const number = row[key]

  if (number === null || number === undefined) {
    return ''
  }
  
  const truncated = Number(number.toPrecision(3))
  
  if (truncated === 0) {
    return '0'
  }
  //return truncated.toExponential()

  return truncated

}
const logNum = (row, key) => {
  const number = Math.log10(row[key])

  if (number === null || number === undefined) {
    return ''
  }
  
  const truncated = Number(number.toPrecision(3))
  
  if (truncated === 0) {
    return '0'
  }
  //return truncated.toExponential()

  return truncated

}


const columns = [
  {
    key: 'biochemical',
    heading: 'Metabolite',
    grow: 0,
    isSortable: false,
    minWidth: 365,
    render: (metabolite, key) => (
    <Link className="grid-cell-content" target="_blank" to={`/awesome?query=${metabolite.comp_id}`}>
    {metabolite.biochemical}
    </Link>
    ),
  },
  {
    key: 'avg_exp',
    heading: 'Expression',
    grow: 0,
    isSortable: false,
    minWidth: 75,
    render: truncateNum,
  },
  {
    key: 'fc',
    heading: 'log(FC)',
    grow: 0,
    isSortable: true,
    minWidth: 60,
    render: logNum,
  },
  {
    key: 'pvalue',
    heading: 'Adj P value',
    grow: 0,
    isSortable: true,
    minWidth: 100,
    render: renderExponentialNumberCell,
  },
]





class METable extends PureComponent {
  grid = React.createRef()

  componentDidUpdate(prevProps) {

    /*
    const { rowIndexLastClickedInNavigator } = this.props
    if (rowIndexLastClickedInNavigator !== prevProps.rowIndexLastClickedInNavigator) {
      if (this.grid.current) {
        this.grid.current.scrollToDataRow(rowIndexLastClickedInNavigator)
      }
    }
    */

  }

  render() {
    
    const {
      highlightText,
      onVisibleRowsChange,
      onHoverVariant,
      onRequestSort,
      metabolites,
      sortKey,
      sortOrder,
    } = this.props

    if (metabolites.length === 0) {
      return <NoVariants height={500}>No Metabolites Found</NoVariants>
    }

    console.log("In ME Table")
    console.log(metabolites)

    return (
      <METableWrapper>
      <Grid
        cellData={{ highlightWords: highlightText.split(/\s+/) }}
        columns={columns}
        data={metabolites}
        numRowsRendered={15}
        onHoverRow={onHoverVariant}
        onRequestSort={onRequestSort}
        onVisibleRowsChange={onVisibleRowsChange}
        ref={this.grid}
        rowKey={metabolite => metabolite.biochemical}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      </METableWrapper>
    )
  }
}


METable.propTypes = {
  highlightText: PropTypes.string,
  onVisibleRowsChange: PropTypes.func,
  onHoverVariant: PropTypes.func,
  onRequestSort: PropTypes.func,
  rowIndexLastClickedInNavigator: PropTypes.number,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(['ascending', 'descending']).isRequired,
  metabolites: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
}

METable.defaultProps = {
  highlightText: '',
  onVisibleRowsChange: () => {},
  onHoverVariant: () => {},
  onRequestSort: () => {},
  rowIndexLastClickedInNavigator: null,
}

export default METable
