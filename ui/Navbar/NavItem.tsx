import { Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
    href: string;
    title: string;
};

export default function NavItem({ href, title }: Props) {

    return (
        <NextLink href={href} passHref>

            <Text
                mx="4"
                py="1"
                _hover={{ borderBottom: "2px solid #333", cursor: "pointer" }}
                borderBottom="2px solid transparent"
                transition="all 0.2s ease-in"
            >
                {title}
            </Text>

        </NextLink>
    );
}