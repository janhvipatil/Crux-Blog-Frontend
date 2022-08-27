import { Box, Center, Container, Flex, Heading, HStack, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
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
        <Flex my={20} px={24}>
          <SimpleGrid columns={3} spacing={8}>
            {posts.map((post) => <Link href={`post/${post.slug.current}`} passHref={true} key={post._id}>
              <Box width='full' boxShadow='base' rounded='xl' bg='white' _hover={{ transform: "scale(1.01)", cursor: "pointer" }}>
                <Image src={urlFor(post.mainImage).width(400).url() ?? undefined}
                  alt={post.title}
                  roundedTop='xl' />
                <Stack spacing={1} p={4}>
                  <HStack spacing={1}>
                    <Text fontWeight='semibold'>Genre</Text>
                    <Text color="gray.500" fontSize="sm">- {post.publishedAt.slice(0, 10)}</Text>
                  </HStack>
                  <Text as='h2' fontSize='2xl' fontWeight='bold'>{post.title}</Text>
                  <Text color={textColor} fontSize="md">{post.subText}</Text>
                </Stack>
              </Box>
            </Link>
            )}
          </SimpleGrid>
        </Flex>
      )
      }
      <Box as='section' bg='gray.50' p={20}>
        <NewsletterSignupForm />
      </Box>
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