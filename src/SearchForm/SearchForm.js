import React, {Component} from 'react'
import './SearchForm.scss'
import next from '../assets/next.png'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value })
  }

  search = (e) => {
    e.preventDefault()
    this.props.searchSites(this.state.query)
    this.setState({query: ''})
  }

  render() {
    return (
     <form>
      <input
       name="query"
       placeholder="Search the Range"
       aria-label="search-input"
       type="text"
       onChange={this.handleChange}
       value={this.state.query}
      />
      <Link to="/results" className="search-form-link" onClick={this.search}>
       <img
        src={next}
        alt="submit search"
        className="search-icon"
        // onClick={this.search}
       />
      </Link>
     </form>
    );
  }
}

export default SearchForm

SearchForm.propTypes = {
  searchSites: PropTypes.func
}