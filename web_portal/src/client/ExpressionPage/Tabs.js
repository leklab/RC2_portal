import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'

import styled from 'styled-components'

const TabList = styled.ol`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    }

    this.onClickTabItem = this.onClickTabItem.bind(this)

  }

  onClickTabItem = (e) => {
    this.setState({ activeTab: e.currentTarget.textContent })
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this

    return (
      <div className="tabs">
      	<TabList>
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={this.state.activeTab}
                key={label}
                label={label}
                onClick={this.onClickTabItem}
              />
            )
          })}
        </TabList>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          })}
        </div>
      </div>
    )
  }
}

export default Tabs

