import React, {Component} from 'react'
import './SearchForm.scss'
import next from '../assets/next.png'
import {Link} from 'react-router-dom'

class SearchForm extends Component {
  constructor(props) {
    super()
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  search = (e) => {
    e.preventDefault()
    console.log('hello')
    this.props.searchSites(this.state.query)
    this.setState({query: ''})
  }

  render() {
    return(
      <form onSubmit={this.search}>
        <input 
          name='query'
          placeholder='Search the Range'
          aria-label='search-input'
          type='text'
          onChange={this.handleChange}
          value={this.state.query}
       />
        <Link to="/results" className='search-form-link'>
          <img src={next} alt="submit search" className="search-icon" />
        </Link>
      </form>
    )
  }
}

export default SearchForm