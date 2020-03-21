import Datasheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import { Row, Col, Card, InputNumber } from 'antd'
import _ from 'lodash'

import React from 'react'

export default class ComponentSheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grocery: {},
      items: 3
    }
  }

  generateGrid () {
    const groceryValue = (id) => {
      if (this.state.grocery[id]) {
        
        return this.state.grocery[id]
      } else {
        return ''
      }
    }
    const component = (id) => {
      return (
        <InputNumber
          autofocus
          openOnFocus
          value={this.state && this.state.grocery[id]}
          onChange={(e) => {
            if(typeof e === 'number'){
                this.setState({grocery: _.assign(this.state.grocery, {[id]: e})})
            }
          }}
        />
      )
    }
    let rows = [
      [{readOnly: true, colSpan: 2, value: 'Shopping List'}],
      [
        {readOnly: true, value: ''},
        {
          value: 'Grocery Item',
          component: (
            <div className={'add-grocery'}> Grocery List
              <div className={'add-button'} onClick={() => { console.log('add'); this.setState({items: this.state.items + 1}) }}> add item</div>
            </div>
          ),
          forceComponent: true
        }]
    ]
    rows = rows.concat(_.range(1, this.state.items + 1).map(id => [{readOnly: true, value: `Item ${id}`}, {value: groceryValue(id), component: component(id)}]))

    console.log(rows)
    return rows
  }

  render () {
    return (
      <Datasheet
        data={this.generateGrid()}
        valueRenderer={(cell) => cell.value}
        onChange={() => {}}
      />
    )
  }
}
