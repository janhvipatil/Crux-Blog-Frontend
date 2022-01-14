import { useState, useEffect } from "react";
import {
    Box,
    useColorModeValue,
    Heading,
    Flex,
    Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import NavItem from "./NavItem";


export default function Navbar() {
    const [top, setTop] = useState("0");

    // on scroll get the users scroll position
    // if the user has scrolled 100px, change boxShadow to true
    const [boxShadow, setBoxShadow] = useState(false);

    useEffect(() => {
        onmousemove = function (e) {
            if (e.clientY < 30) setTop("0");
            // console.log("mouse location:", e.clientX, e.clientY)
        };
        const handleScroll = () => {
            if (window.scrollY > 100) {
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

    return (
        <Flex
            as="nav"
            w="100%"
            px="4"
            pt="4"
            pb="6"
            alignItems="center"
            pos="sticky"
            top={top}
            zIndex={10}
            // if boxshadow is true then boxshadow = boxshadow1
            boxShadow={boxShadow1}
            transition="top .5s ease-in-out, box-shadow .2s ease-in-out"
        >
            <NextLink href="/" passHref>
                <Button
                    as="a"
                    variant="ghost"
                    p={[1, 2, 4]}
                    _hover={{ transform: "scale(1.05)" }}
                    aria-label="Home"
                    fontWeight="normal"
                    title="Home"
                >
                    {/* logo here */}
                    <Heading size="lg">
                        Crux
                    </Heading>
                </Button>
            </NextLink>

            <Box>
                <NavItem title="About Us" href="/about-us" />
                <NavItem title="Get in touch" href="/contact-us" />
                <DarkModeSwitch />
            </Box>

        </Flex>
    );
}