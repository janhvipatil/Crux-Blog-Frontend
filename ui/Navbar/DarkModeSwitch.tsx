import { useColorMode, IconButton, useColorModeValue, } from '@chakra-ui/react'
import { RiSunFill, RiMoonFill } from "react-icons/ri"

const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <RiSunFill /> : <RiMoonFill />}
            fontSize='1.25em'
            onClick={toggleColorMode}
            borderRadius={5}
            variant='ghost'
        />
    )
}

export default DarkModeSwitch