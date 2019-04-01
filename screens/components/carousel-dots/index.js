import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  z-index: 200;
  background-color: #FFF;
  padding: 4px 16px 0;
  margin-right: -16px;
`

const Dot = styled.View`
  background-color: ${props => props.active ? '#ED1C24' : 'transparent'};
  width: 8px;
  height: 8px;
  border: 1px solid ${props => props.active ? '#ED1C24' : '#999999'};
  border-radius: 4px;
`

const Button = styled(TouchableOpacity)`
  padding: 2px;
`

export default class CarouselDots extends React.PureComponent {
  static defaultProps = {
    active: 0
  }

  onPress = index => {
    const { onPress } = this.props

    onPress(index)
  }

  renderDot = (_, index) => {
    const { active, onPress } = this.props

    return <Button key={index} onPress={onPress ? () => this.onPress(index) : null}>
      <Dot active={active === index} />
    </Button>
  }

  render () {
    const { dots } = this.props

    return dots && dots > 1 ? <Wrapper>
      {Array(dots).fill(0).map(this.renderDot)}
    </Wrapper> : null
  }
}
