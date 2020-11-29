import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const TabListItem = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;

  &:hover {
    background-color: palevioletred;
    color: white;
    cursor: pointer;
  }
`

const TabListActive = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: solid #ccc;
  border-width: 1px 1px 0 1px;
`


class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  /*
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }
  */

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this

    /*
    let className = "tab-list-item"

    if (activeTab === label) {
      className += " tab-list-active"
    }
  */

    return (
      <TabListItem onClick={e => this.props.onClick(e)}>
        {label}
      </TabListItem>
    )
  }
}

export default Tab