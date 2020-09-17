import React, {Component} from 'react'
import './Search.scss'

class Search extends Component {
  constructor(props) {
    super()
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  render() {
    return(
      <form>
        <input 
          name='query'
          placeholder='Search the Range'
          aria-label='search-input'
          type='text'
          onChange={this.handleChange}
          value={this.state.query}
       />
      </form>
    )
  }
}

export default Search