import React from "react"
import { Overlay } from "react-native-elements"
import { Dimensions } from "react-native"
import { IntroductionsPage } from "./InstructionsPage"

export const InstructionsOverlay = (isVisible, onBackdropPress) => {
    return (
        <Overlay
        isVisible={isVisible}
        overlayBackgroundColor= "transparent"
        width= {Dimensions.get("window").width * 0.87}
        height = { Dimensions.get("window").height * 0.75}
        onBackdropPress = {onBackdropPress}>
        >
            <IntroductionsPage />
        </Overlay>
    )
}