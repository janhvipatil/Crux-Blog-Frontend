import { Box, Heading, Image, Text, Stack, useColorModeValue } from "@chakra-ui/react"
import SanityBlockContent from '@sanity/block-content-to-react';
import { GetServerSideProps } from "next/types"
import { sanityClient, urlFor } from "../../utils/sanityClient"
import { OpinionPolls } from "../../components/OpinionPolls";
import { Navbar } from "../../ui/Navbar";
import { Post } from "../../types/post";

const Post = ({ title, mainImage, body, publishedAt, subText, pollID }: Post) => {

    const textColor = useColorModeValue('gray.600', 'gray.400')

    return (
        <>
            <Navbar />
            <Box justify="center" align="center" mt={20}>
                <Stack spacing={1} mb={6}>
                    <Heading fontSize="7xl" letterSpacing="wide">{title}</Heading>
                    <Text color={textColor} fontSize="md">{subText}</Text>
                    <Text color="gray.500" fontSize="xs">Published: {publishedAt.slice(0, 10)}</Text>
                </Stack>
                <Image
                    rounded="2xl"
                    src={urlFor(mainImage).width(720).url() ?? undefined}
                    alt={title}
                />
                <Box as="section">
                    <Box className="text-blocks" ml={28} mr={28} pt={10}
                        color={textColor}
                        textAlign="start"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="lg">
                        <SanityBlockContent blocks={body} />
                    </Box>
                </Box>
                <OpinionPolls pollid={pollID} />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async pageContext => {

    const pageSlug = pageContext.query.slug
    const query = `*[ _type == "post" && slug.current == $pageSlug][0]{
        title,
        mainImage,
        pollID,
        publishedAt,
        subText,
        body
    }`
    const post = await sanityClient.fetch(query, { pageSlug })

    if (!post) {
        return {
            props: null,
            notFound: true,
        }
    } else {
        return {
            props: {
                title: post.title,
                mainImage: post.mainImage,
                body: post.body,
                publishedAt: post.publishedAt,
                subText: post.subText,
                pollID: post.pollID,
            }
        }
    }
}

export default Post