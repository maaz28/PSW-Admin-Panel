import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import RadioButtonsGroup from './radio'
export default class SearchBar extends Component {


  selectHandler = (value) => {
    console.log(value)
    this.props.selectHandler(value)
  }

  render() {
    return (
        <React.Fragment>
            <RadioButtonsGroup changeHandler = {(value) => {this.props.changeHandler(value)}}/>
            <ReactSearchBox
              placeholder="Search Here"
              value=""
              data={this.props.data}
              onSelect = {this.selectHandler}
              callback={record => console.log(record)}
            />
        </React.Fragment>
    )
  }
}