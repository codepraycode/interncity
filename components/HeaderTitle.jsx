import { View, Text } from 'react-native'
import React from 'react'
import Theme from '../constants/theme'

const HeaderTitle = ({title, color}) => {
  return (
        <Text 
            style={{
                fontFamily:'FontBold',
                fontSize:20,
                color:color ? color: Theme.main,
            }}
        >
            {title}
        </Text>
  )
}

export default HeaderTitle;