import React from 'react';
import { sanityClient, urlFor } from '../utils/sanityClient'
import { Post } from '../types/post'
import { Navbar } from '../ui/Navbar';
import { Box, Button, Center, Flex, Heading, HStack, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

interface postProps {
    posts: Post[],
}

const Articles = ({ posts }: postProps) => {

    const cardBackground = useColorModeValue('white', 'gray.700')
    const textColor = useColorModeValue('gray.600', 'gray.400')

    return (
        <>
            <Navbar />
            {posts && (
                <Stack>
                    <Flex p={20}>
                        <Stack spacing={10}>
                            {posts.map((post) => <Link href={`post/${post.slug.current}`} passHref={true} key={post._id}>
                                <Box
                                    bg={cardBackground}
                                    shadow="lg"
                                    rounded="lg"
                                    _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                                >
                                    <HStack spacing={8} pr={6}>
                                        <Image src={urlFor(post.mainImage).width(400).url() ?? undefined}
                                            alt={post.title}
                                            roundedLeft='lg' />
                                        <Stack>
                                            <Heading>{post.title}</Heading>
                                            <Text color={textColor} fontSize="md">{post.subText}</Text>
                                            <Text color="gray.500" fontSize="sm">Published: {post.publishedAt.slice(0, 10)}</Text>
                                        </Stack>
                                    </HStack>
                                </Box>
                            </Link>
                            )}
                            <Center>
                                <Button width='fit-content' size='lg'>load more</Button>
                            </Center>
                        </Stack>
                    </Flex>
                </Stack>
            )}

        </>
    )
};

export const getServerSideProps = async () => {

    const query = '*[ _type == "post"]'
    const posts = await sanityClient.fetch(query)

    if (!posts.length) {
        return {
            props: {
                posts: [],
            },
        }
    } else {
        return {
            props: {
                posts
            }
        }
    }
}

export default Articles;