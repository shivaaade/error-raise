import {Component} from 'react'

class CourseDetails extends Component {
  state = {last: {}, isFinal: true}

  componentDidMount() {
    this.getDataFinal()
  }

  getDataFinal = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.status !== 404) {
      const data = await response.json()
      const newData = data.course_details
      const finalData = {
        id: newData.id,
        imageUrl: newData.image_url,
        name: newData.name,
        description: newData.description,
      }
      this.setState({last: finalData})
    } else {
      this.setState({isFinal: false})
    }
    // const {last} = this.state
    // console.log(id)
    // console.log(last)
    // if (id !== last.id) {
    //   this.setState({isFinal: false})
    // }
  }

  render() {
    const {last, isFinal} = this.state
    const {id, name, description, imageUrl} = last
    return (
      <div>
        {isFinal && (
          <ul>
            <li>
              <img alt={name} src={imageUrl} />
              <h1>{name}</h1>
              <p>{description}</p>
            </li>
          </ul>
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

export default CourseDetails
