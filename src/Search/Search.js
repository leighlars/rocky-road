import React, {Component} from 'react'
import './Search.css'

class Search extends Component {
  constructor(props) {
    super()
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    return(
      <form>
        <input 
          name='query'
          placeholder='Search the Range'
          aria-label='search-input'
          type='text'
          value={this.state.query}
          onChange={this.handleChange}
       />
      </form>
    )
  }


}

export default Search