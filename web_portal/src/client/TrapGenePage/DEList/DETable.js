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

const DETableWrapper = styled.div`
  width: 800px;
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


const columns = [
  {
    key: 'gene_name',
    heading: 'Gene',
    grow: 0,
    isSortable: false,
    minWidth: 150,
    render: (de_gene, key) => (
    <Link className="grid-cell-content" target="_blank" to={`/awesome?query=${de_gene.gene_name}`}>
    {de_gene.gene_name}
    </Link>
    ),
  },
  {
    key: 'direction',
    heading: 'Direction',
    grow: 0,
    isSortable: true,
    minWidth: 120,
  },
  {
    key: 'sko_expr',
    heading: 'SKO Expr',
    grow: 0,
    isSortable: true,
    minWidth: 120,
  },
  {
    key: 'wt_expr',
    heading: 'WT Expr',
    grow: 0,
    isSortable: true,
    minWidth: 120,
  },
  {
    key: 'dko_expr',
    heading: 'DKO Expr',
    grow: 0,
    isSortable: true,
    minWidth: 120,
  },
  {
    key: 'sig_code',
    heading: 'Significance',
    grow: 0,
    isSortable: true,
    minWidth: 120,
  }

]





class DETable extends PureComponent {
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
      de_genes,
      sortKey,
      sortOrder,
    } = this.props

    if (de_genes.length === 0) {
      return <NoVariants height={500}>No Differentially Expressed Genes Found</NoVariants>
    }

    console.log("In DE Table")
    console.log(de_genes)

    return (
      <DETableWrapper>
      <Grid
        cellData={{ highlightWords: highlightText.split(/\s+/) }}
        columns={columns}
        data={de_genes}
        numRowsRendered={15}
        onHoverRow={onHoverVariant}
        onRequestSort={onRequestSort}
        onVisibleRowsChange={onVisibleRowsChange}
        ref={this.grid}
        rowKey={de_gene => de_gene.gene_name}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      </DETableWrapper>
    )
  }
}


DETable.propTypes = {
  highlightText: PropTypes.string,
  onVisibleRowsChange: PropTypes.func,
  onHoverVariant: PropTypes.func,
  onRequestSort: PropTypes.func,
  rowIndexLastClickedInNavigator: PropTypes.number,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(['ascending', 'descending']).isRequired,
  de_genes: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
}

DETable.defaultProps = {
  highlightText: '',
  onVisibleRowsChange: () => {},
  onHoverVariant: () => {},
  onRequestSort: () => {},
  rowIndexLastClickedInNavigator: null,
}

export default DETable
