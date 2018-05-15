import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, InputItem, TextareaItem } from 'antd-mobile'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import { MyAppText } from '../common'

const HeaderTitle = () => (
  <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>
    Submit a prompt
  </MyAppText>
)

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
    const inputStyles = {
      ...InputItemStyle,
      input: {
        ...InputItemStyle.input,
        fontFamily: 'ProximaNovaRegular'
      }
    }

    return (
      <KeyboardAvoidingView enabled behavior='padding'>
        <InputItem
          type='text'
          placeholder='Title'
          onChange={title => this.setState({ title })}
          value={this.state.title}
          styles={inputStyles}
        />

        <InputItem
          type='text'
          placeholder='Tag Line'
          onChange={tagLine => this.setState({ tagLine })}
          value={this.state.tagLine}
          styles={inputStyles}
        />

        <TextareaItem
          autoHeight
          type='text'
          placeholder='Description'
          onChange={description => this.setState({ description })}
          value={this.state.description}
          styles={inputStyles}
        />

        <Button>
          Submit
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

export default SubmitPromptScreen
