import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import CardModal from './CardModal'

class CardList extends Component {
  state = {
    scroll: true
  }

  toggleScroll = () => this.setState({ scroll: !this.state.scroll })

  render() {
    return (
      <ScrollView scrollEnabled={this.state.scroll} style={styles.container}>
        <CardModal />
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 20
  }
}

export default CardList
