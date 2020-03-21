import Datasheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import { Row, Col, Card, InputNumber } from 'antd'
import _ from 'lodash'
import numeral from 'numeral'

import React from 'react'
import kill from 'cross-port-killer';

function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

export default class ComponentSheet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [
                [{ value: '', readOnly: true }, { value: 'A', readOnly: true }, { value: 'B', readOnly: true }, { value: 'C', readOnly: true }],
                [{ value: '1', readOnly: true }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }],
                [{ value: '2', readOnly: true }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }],
                [{ value: '3', readOnly: true }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }],
                [{ value: '4', readOnly: true }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }, { value: 1, componentName: 'InputNumber' }],
            ]
        }
    }

    generateGrid() {
        let grid = this.state.grid
        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell.componentName === 'InputNumber') {
                    cell.component = (
                        <InputNumber
                            style={{width:'100%'}}
                            autoFocus={true}
                            value={cell.value}
                            type="number"
                            precision={2}
                            onChange={(value) => {
                                if (typeof value === 'number') {
                                    cell.value = value
                                    this.setState({ grid: [...grid] })
                                }
                            }}
                        />
                    )
                }
            })
        })
        return grid
    }

    render() {
        numeral.defaultFormat('0,0.00');
        return (
            <Datasheet
                data={this.generateGrid()}
                valueRenderer={(cell) => {
                    if(cell.componentName==='InputNumber'){
                        var number = numeral(cell.value);
                        return number.format();
                        // return toThousands(Number(cell.value).toFixed(2))
                    }else{
                        return cell.value
                    }
                }}
                onChange={() => { }}
            />
        )
    }
}
