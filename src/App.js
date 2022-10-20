import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here

const PackageList = props => {
  const {eachPackage} = props
  const {description, name, imageUrl} = eachPackage
  return (
    <li className="lsit-item">
      <img className="image-style" src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

class App extends Component {
  state = {givenPackageData: [], isLoading: true}

  componentDidMount() {
    this.onFetchTravelData()
  }

  onFetchTravelData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const packageData = data.packages.map(eachData => ({
      description: eachData.description,
      id: eachData.id,
      name: eachData.name,
      imageUrl: eachData.image_url,
    }))
    console.log(packageData)
    this.setState({givenPackageData: packageData, isLoading: false})
  }

  onRenderLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="red" height={50} />
    </div>
  )

  onRenderTravelDetail = () => {
    const {givenPackageData} = this.state
    return (
      <ul className="list-item-cont">
        {givenPackageData.map(eachPackage => (
          <PackageList eachPackage={eachPackage} key={eachPackage.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-cont">
        <h1 className="main-haed">Travel Guide</h1>
        {isLoading ? this.onRenderLoading() : this.onRenderTravelDetail()}
      </div>
    )
  }
}

export default App
