import {Link} from 'react-router-dom'
import {Component} from 'react'

class Home extends Component {
  state = {first: [], isFinal: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    console.log(response.status)
    if (response.status !== 404) {
      const data = await response.json()
      const newData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({first: newData})
    } else {
      this.setState({isFinal: false})
    }
  }

  render() {
    const {first, isFinal} = this.state
    return (
      <div>
        {isFinal && (
          <div>
            <h1>Courses</h1>
            <ul>
              {first.map(each => (
                <Link to={`/courses/${each.id}`}>
                  <li key={each.id}>
                    <img alt={each.name} src={each.logoUrl} />
                    <p>{each.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        {!isFinal && (
          <div>
            <img
              alt="failure view"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>

            <button type="button">Retry</button>
          </div>
        )}
      </div>
    )
  }
}

export default Home
