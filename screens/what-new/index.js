import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import CarouselDots from '../components/carousel-dots'
import Icon from 'react-native-vector-icons/EvilIcons'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components'
import Modal from 'react-native-modal'

const MODAL_HEIGHT = 550
const MODAL_WIDTH = 300

const MetaList = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
`

const StyledTouchableOpacity = styled(TouchableOpacity).attrs({
})`
  right: -3;
  position: absolute;
  font-weight: 700;
  z-index: 1;
`

const CarouselDotContainer = styled.View`
  align-items: ${props => props.centerDots ? 'center' : 'flex-end'};
  padding: 0 8px;
  margin-top: ${props => props.centerDots ? '-8px' : '-16px'};
  flex: 1;
`

const StyledCarousel = styled(Carousel)`
  justify-content: center;
  align-items: center;
  height: 275px;
`

const WrapperView = styled(View).attrs({
})`
  flex:1;
  justify-content: center;
  align-items: center;
`

const CardWrapper = styled(View).attrs({
})`
  background-color: #FFF;
  width: ${MODAL_WIDTH};
  height: ${MODAL_HEIGHT};
`

export default class WhatNewModal extends React.PureComponent {

  state = {
    currentIndex: 0,
    activeSlide: 0,
    isVisible: true
  }

  onDotPress = index => {
    this.setState({
      activeSlide: index,
      currentIndex: index
    })
  }

  renderItem = ({ item, index: itemIndex }) => {
    return <View>
      <Image
        style={{ width: 300, height: 500, marginTop: 20 }}
        resizeMode="contain"
        source={{ uri: item.url }}
      />
    </View>
  }

  closeModal = () => {
    this.setState({ isVisible: false })
  }

  render () {
    const releaseNotes = [
        {
          "url":"https://uploads.tapatalk-cdn.com/20170929/40809593fece1853d7efc36825f1bb54.png"
        },
        {
          "url":"https://uploads.tapatalk-cdn.com/20170929/40809593fece1853d7efc36825f1bb54.png"
        },
        {
          "url":"https://uploads.tapatalk-cdn.com/20170929/40809593fece1853d7efc36825f1bb54.png"
        },
        {
          "url":"https://uploads.tapatalk-cdn.com/20170929/40809593fece1853d7efc36825f1bb54.png"
        }
      ]

    const { activeSlide, isVisible } = this.state

    return (
      <Modal
        transparent
        animationType={'fade'}
        animationInTiming={400}
        animationOutTiming={400}
        isVisible={isVisible}>
        <WrapperView>
          <CardWrapper>
            <StyledTouchableOpacity
              onPress={() => { 
                  this.closeModal()
              }}>
              <Icon name="close-o" size={30} />
            </StyledTouchableOpacity>
            <StyledCarousel
              data={releaseNotes}
              firstItem={activeSlide}
              renderItem={this.renderItem}
              onSnapToItem={(index) => {
                this.setState({ activeSlide: index })
              }}
              sliderWidth={300}
              itemWidth={300}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
            />
            <MetaList>
              <CarouselDotContainer centerDots>
                <CarouselDots
                  onPress={this.onDotPress}
                  active={activeSlide}
                  dots={releaseNotes.length}
                />
              </CarouselDotContainer>
            </MetaList>
          </CardWrapper>
        </WrapperView>
      </Modal>
    )
  }
}

