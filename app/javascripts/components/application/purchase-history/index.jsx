import React, {
  Component
} from 'react'

import nfToken from '@/contracts/nftoken-factory'

import Hero from '@/components/hero'
import TokenRow from './token-row'

require('./style.scss')

//
// This component demos using a view method on the contract to pull
// the current Ethereum addresses tokens directly, instead of
// replaying the events as is the case in the parent Application component
//
export default class PurchaseHistory extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tokens: []
    }
  }

  refreshTokenList() {
    nfToken().then((instance) => {
      instance.myTokens().then((result) => {
        this.setState({ tokens: result })
        // this.setState({ tokens: result.reverse() })
      }).catch((error) => {
        console.error(error)
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.refreshTokenList()
  }

  render () {
    var content
    if (this.state.tokens.length) {
      content =
        <section className='section'>
          <div className='container'>
            <div className='table__wrapper'>
              <table className='table is-striped is-fullwidth'>
                <thead>
                  <tr>
                    <th>
                    </th>
                    <th>
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tokens.map((tokenId) => <TokenRow tokenId={tokenId.toNumber()} key={tokenId.toNumber()} /> )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
    } else {
      content =
        <Hero>
          <h1 className='title has-text-grey-light has-text-centered'>
            You haven't purchased any tokens.
          </h1>
        </Hero>
    }
    return content
  }
}
