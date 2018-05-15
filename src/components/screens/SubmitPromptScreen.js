import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, InputItem, List } from 'antd-mobile'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import TextAreaItemStyle from 'antd-mobile/lib/textarea-item/style/index.native'
import { MyAppText } from '../common'

const HeaderTitle = () => (
  <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>
    Submit a prompt
  </MyAppText>
)

const styles = {
  inputStyle: {
    ...InputItemStyle,
    margin: 15,
    input: {
      ...InputItemStyle.input,
      fontFamily: 'ProximaNovaRegular'
    }
  },
  textAreaStyle: {
    ...TextAreaItemStyle,
    margin: 15,
    input: {
      ...TextAreaItemStyle,
      fontFamily: 'ProximaNovaRegular'
    }
  }
}

class SubmitPromptScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: <HeaderTitle />
  })

  state = {
    title: '',
    tagLine: '',
    description: ''
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior='padding'>
        <List renderHeader={() => 'Title'}>
          <InputItem
            type='text'
            placeholder='The main instructions for your prompt'
            onChange={title => this.setState({ title })}
            value={this.state.title}
            styles={styles.inputStyle}
          />
        </List>


        <List renderHeader={() => 'Tag Line'}>
          <InputItem
            type='text'
            placeholder='Appears in the header the day of being used'
            onChange={tagLine => this.setState({ tagLine })}
            value={this.state.tagLine}
            styles={styles.inputStyle}
            maxLength={15}
          />
        </List>

        <List renderHeader={() => 'Description'}>
          <InputItem
            type='text'
            placeholder='Pose a question, offer some inspiration!'
            onChange={description => this.setState({ description })}
            value={this.state.description}
            styles={styles.inputStyle}
          />
        </List>

        <Button type='primary'>Submit</Button>
      </KeyboardAvoidingView>
    )
  }
}

export default SubmitPromptScreen
