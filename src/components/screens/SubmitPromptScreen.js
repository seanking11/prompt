import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { Button, InputItem, List } from 'antd-mobile'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import DatePicker from 'react-native-datepicker'
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
    tagLine: '',
    description: '',
    date: ''
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

        <List renderHeader={() => 'Launch Date (Optional)'}>
          <DatePicker
            style={styles.datePickerStyles}
            date={this.state.date}
            mode='date'
            placeholder='Day you want this prompt to appear'
            format='MM-DD-YYYY'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            showIcon={false}
            onDateChange={date => this.setState({ date })}
            customStyles={styles.customDateStyles}
          />
        </List>

        <Button type='primary' style={styles.buttonStyles}>Submit</Button>
      </DismissKeyboardView>
    )
  }
}

export default SubmitPromptScreen
