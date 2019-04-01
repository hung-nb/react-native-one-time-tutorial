import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import VersionNumber from 'react-native-version-number'
import WhatNewModal from './screens/what-new'

export default class App extends React.PureComponent {
  
  state = {
    isShowWhatNew: false
  }

  componentWillMount () {
    // Get build number
    AsyncStorage.getItem('app-build-number').then(
      (response) => {
        const newBuildNumber = VersionNumber.buildVersion
        if (newBuildNumber.toString() !== response) {
          this.setState({ isShowWhatNew: true })
        }
        this.setBuildNumber(newBuildNumber)
      }
    )
  }

  setBuildNumber = async (newBuildNumber) => {
    await AsyncStorage.setItem('app-build-number', newBuildNumber.toString())
  }

  render() {
    if (this.state.isShowWhatNew) {
      return <WhatNewModal />
    } else {
      return null
    }
  }
}
