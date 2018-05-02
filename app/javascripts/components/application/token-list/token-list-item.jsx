import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import nfTokenTypeImageUrl from '@/services/nfToken-type-image-url'
import getToken from '@/services/get-token'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
  }

  componentDidMount () {
    getToken(this.props.tokenId).then((values) => {
      this.setState({
        type: values[0],
        title: values[1]
      })
    })
  }

  render () {
    var img
    if (this.state.type !== null) {
      img = (
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <Link to={`/tokens/${this.props.tokenId}`}>
                <img src={nfTokenTypeImageUrl(this.state.type)} />
              </Link>
            </figure>
          </div>

          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">
                  {this.state.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )

    } else {
      img = <span></span>
    }

    return (
      <span>{img}</span>
    )
  }
}