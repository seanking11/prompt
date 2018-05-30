import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { graphql } from 'react-apollo'
import { Button, InputItem, List } from 'antd-mobile'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import DatePicker from 'react-native-datepicker'
import createPromptMutation from '../../mutations/createPrompt'
import { MyAppText, DismissKeyboard } from '../common'

const DismissKeyboardView = DismissKeyboard(View)

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
  buttonStyles: {
    margin: 15,
    marginTop: 20
  },
  datePickerStyles: {
    width: Dimensions.get('window').width
  },
  customDateStyles: {
    dateInput: {
      borderWidth: 0,
      alignItems: 'flex-start',
      marginLeft: 15
    },
    placeholderText: {
      fontFamily: 'ProximaNovaRegular',
      fontSize: 17
    },
    dateText: {
      fontFamily: 'ProximaNovaRegular',
      color: '#000000',
      fontSize: 17
    }
  }
}

class SubmitPromptScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: <HeaderTitle />
  })

  state = {
    title: '',
    tagline: '',
    description: '',
    suggestedLaunchDate: null
  }

  _handleOnSubmit = () => {
    const date = new Date(`${this.state.suggestedLaunchDate}T04:00:00.000Z`)
    const vars = {
      title: this.state.title,
      tagline: this.state.tagline,
      description: this.state.description,
      suggestedLaunchDate: date
    }
    this.props.mutate({ variables: vars })
      .catch(err => console.log(err)) // eslint-disable-line no-console
  }

  render() {
    return (
      <DismissKeyboardView>
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
            onChange={tagline => this.setState({ tagline })}
            value={this.state.tagline}
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

        <List renderHeader={() => 'Launch Date (Optional)'}>
          <DatePicker
            style={styles.datePickerStyles}
            date={this.state.suggestedLaunchDate}
            mode='date'
            placeholder='Day you want this prompt to appear'
            format='YYYY-MM-DD'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            showIcon={false}
            onDateChange={suggestedLaunchDate => this.setState({ suggestedLaunchDate })}
            customStyles={styles.customDateStyles}
          />
        </List>

        <Button
          type='primary'
          style={styles.buttonStyles}
          onClick={this._handleOnSubmit}
        >
          Submit
        </Button>
      </DismissKeyboardView>
    )
  }
}

export default graphql(createPromptMutation)(SubmitPromptScreen)
