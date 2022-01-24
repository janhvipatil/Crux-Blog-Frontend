import { useState, useEffect } from "react";
import {
    useColorModeValue,
    Heading,
    Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import NavItem from "./NavItem";


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
            justifyContent="space-between"
        >
            <NextLink href="/" passHref>
                {/* logo here */}
                <Heading size="lg"
                    m="0"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}>
                    Crux
                </Heading>
            </NextLink>

            <Flex
                align="center"
            >
                <NavItem title="articles" href="/articles" />
                <NavItem title="about us" href="/about-us" />
                <NavItem title="get in touch" href="/contact-us" />
                <DarkModeSwitch />
            </Flex>

        </Flex>
    );
}