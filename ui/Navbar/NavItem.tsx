import { Button, useColorModeValue, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
    href: string;
    title: string;
};

export default function NavItem({ href, title }: Props) {

    const bg = useColorModeValue("gray.200", "gray.700");

    return (
        <NextLink href={href} passHref>
            <Button
                as="a"
                variant="ghost"
                mx={1}
                p={[1, 2, 4]}
                _hover={{ backgroundColor: bg }}
                aria-label={title}
                fontWeight="normal"
            >
                <Text>
                    {title}
                </Text>
            </Button>
        </NextLink>
    );
}