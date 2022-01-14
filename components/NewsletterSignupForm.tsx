import {
    Box,
    Button,
    chakra,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue as mode,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiShieldCheck } from 'react-icons/hi'
import { isEmailValid } from "../src/validations";
import { supabase } from '../utils/supabaseClient'

export const NewsletterSignupForm = () => {

    const [email, setEmail] = useState("")
    const toast = useToast();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const handleSubmit: React.FormEventHandler = async (event) => {

        event.preventDefault()
        if (isEmailValid(email)) {
            const { error } = await supabase.from('newsletterSubscribers').insert({
                email,
                createdAt: new Date(),
            }, { returning: 'minimal' })

            if (error) {

                toast({
                    duration: 3000,
                    position: 'bottom',
                    variant: 'solid',
                    isClosable: true,
                    status: 'error',
                    description: `There was an error while processing your request. ${error.message}`
                })
            } else {
                toast({
                    duration: 3000,
                    position: 'bottom',
                    variant: 'solid',
                    isClosable: true,
                    status: 'success',
                    description: `You're signed up. We will message you soon!`
                })

                setEmail("")
            }

        } else {
            toast({
                duration: 3000,
                position: 'bottom',
                variant: 'solid',
                isClosable: true,
                status: 'error',
                description: 'The email you entered is invalid.'
            })
        }
        supabase.auth.signIn({ email })
    }

    return (
        <Box as="section" bg={mode('gray.100', 'gray.700')} py="12">
            <Box
                textAlign="center"
                bg={mode('white', 'gray.800')}
                shadow="lg"
                maxW={{ base: 'xl', md: '3xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
                py="12"
                rounded="lg"
            >
                <Box maxW="md" mx="auto">
                    <Text
                        color={mode('green.600', 'green.400')}
                        fontWeight="bold"
                        fontSize="sm"
                        letterSpacing="wide"
                    >
                        6,000+ PEOPLE ALREADY JOINED ❤️️
                    </Text>
                    <Heading mt="4" fontWeight="extrabold">
                        Get new products every month on your inbox!
                    </Heading>
                    <Box mt="6">
                        <chakra.form
                            onSubmit={handleSubmit}
                        >
                            <Stack>
                                <Input
                                    aria-label="Enter your email"
                                    placeholder="Enter your email to join"
                                    rounded="base"
                                    type="email"
                                    onChange={handleChange}
                                    value={email}
                                />
                                <Button
                                    type="submit"
                                    w="full"
                                    colorScheme="blue"
                                    size="lg"
                                    textTransform="uppercase"
                                    fontSize="sm"
                                    fontWeight="bold"

                                >
                                    Join now
                                </Button>
                            </Stack>
                        </chakra.form>
                        <Text color={mode('gray.600', 'gray.400')} fontSize="sm" mt="5">
                            <Box
                                aria-hidden
                                as={HiShieldCheck}
                                display="inline-block"
                                marginEnd="2"
                                fontSize="lg"
                                color={mode('green.600', 'green.400')}
                            />
                            No spams. We&apos;re only going to send you relevant content
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}