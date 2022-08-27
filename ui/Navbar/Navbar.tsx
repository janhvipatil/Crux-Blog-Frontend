import { useState, useEffect } from "react";
import {
    useColorModeValue,
    Heading,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Text,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { MdOutlineArticle } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { CgMenu } from 'react-icons/cg';
import { AiFillFacebook, AiFillInstagram, AiOutlineFileSearch, AiOutlineMessage, AiOutlineTwitter } from 'react-icons/ai';


export default function Navbar() {

    // on scroll get the users scroll position
    // if the user has scrolled 20px, change boxShadow to true
    const [boxShadow, setBoxShadow] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setBoxShadow(true);
            } else {
                setBoxShadow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const boxShadow1 = useColorModeValue(
        "0px 2px 4px rgba(0, 0, 0, 0.2)",
        "0px 2px 4px rgba(0, 0, 0, 0.4)"
    );
    const navBackgroundColor = useColorModeValue(
        "rgba(255, 255, 255, 0.96)",
        "rgba(018, 035, 028, 0.90)"
    )

    return (
        <Flex
            as="nav"
            w="100%"
            h="60px"
            px="4"
            pt="4"
            pb="4"
            alignItems="center"
            top={0}
            zIndex={10}
            position="fixed"
            bgColor={navBackgroundColor}
            // if boxshadow is true then boxshadow = boxshadow1
            boxShadow={boxShadow ? boxShadow1 : "none"}
            transition="box-shadow .2s ease-in-out"
            justifyContent="space-between">

            <InputGroup w='25%' mr="20">
                <InputLeftAddon rounded='lg'><AiOutlineFileSearch fontSize='1.25em' color='gray.400' /></InputLeftAddon>
                <Input placeholder='Search' rounded='lg' />
            </InputGroup>

            <NextLink href="/">
                {/* logo here */}
                <Heading size="lg" fontWeight='extrabold'
                    m="0"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}>
                    Crux Blog
                </Heading>
            </NextLink>

            <HStack>
                <DarkModeSwitch />
                <IconButton icon={<AiFillInstagram fontSize='1.25em' />} aria-label="instagram link" variant='ghost' />
                <IconButton icon={<AiFillFacebook fontSize='1.25em' />} aria-label="facebook link" variant='ghost' />
                <IconButton icon={<AiOutlineTwitter fontSize='1.25em' />} aria-label="twitter link" variant='ghost' />
            </HStack>

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<CgMenu />}
                    variant='outline' />
                <MenuList>
                    <NextLink href="/articles">
                        <MenuItem icon={<MdOutlineArticle fontSize='1.25em' />} command='⌘A'>
                            <Text fontSize='sm'>Articles</Text>
                        </MenuItem>
                    </NextLink>
                    <NextLink href="/about-us">
                        <MenuItem icon={<BsFillPersonFill fontSize='1.25em' />} command='⌘I'>
                            <Text fontSize='sm'>About Us</Text>
                        </MenuItem>
                    </NextLink>
                    <NextLink href="/contact-us">
                        <MenuItem icon={<AiOutlineMessage fontSize='1.25em' />} command='⌘C'>
                            <Text fontSize='sm'>Get In Touch</Text>
                        </MenuItem>
                    </NextLink>
                </MenuList>
            </Menu>

        </Flex>
    );
}