import { Box, Center, Heading, HStack, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { NewsletterSignupForm } from '../components/NewsletterSignupForm'
import { Post } from '../types/post'
import { Navbar } from '../ui/Navbar'
import { sanityClient, urlFor } from '../utils/sanityClient'

interface postProps {
  posts: Post[],
}

const Home = ({ posts }: postProps) => {
  // console.log(posts)
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <>
      <Navbar />
      {posts && (
        <Center mt={20}>
          <HStack spacing={4}>
            {posts.map((post) => <Link href={`post/${post.slug.current}`} passHref={true} key={post._id}>
              <Box>
                <Image src={urlFor(post.mainImage).width(400).url() ?? undefined}
                  alt={post.title}
                  rounded="md" />
                <Stack spacing={1}>
                  <Heading>{post.title}</Heading>
                  <Text color={textColor} fontSize="md">{post.subText}</Text>
                  <Text color="gray.500" fontSize="sm">Published: {post.publishedAt.slice(0, 10)}</Text>
                </Stack>
              </Box>
            </Link>
            )}
          </HStack>
        </Center>
      )}
      {/* <NewsletterSignupForm /> */}
    </>
  )
}

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

export default Home