import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Input, AutoComplete } from 'antd';

import { search } from '../actions/searchActions';
import UserAvatar from './avatar.jsx';

const Option = AutoComplete.Option;

function onSelect(value) {
  console.log('onSelect', value);
}



function renderAvatar(name) {
  return (
    <Option key={name}>
      <UserAvatar name={name} nogrid={true}/>
    </Option>
  );
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBar extends Component {
  constructor() {
    super();

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    this.props.search(value);
  }

  render() {
    const { results } = this.props;
    console.log(results);
    return (
      <div className="search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          dataSource={results.map(renderAvatar)}
          onSelect={onSelect}
          onChange={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input suffix={<Icon type="search" />} />
        </AutoComplete>
      </div>
    );
  }
}

function mapStateToProps({ search }) {
  return {
    results: search.results
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: (query) => {
      dispatch(search(query));
    }
  }
}
