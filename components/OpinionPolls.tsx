import React, { useEffect, useState } from 'react'
import { Box, useColorModeValue, Text, Heading, Stack, Button, useToast } from '@chakra-ui/react'
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient'
import { Poll } from '../types/poll';
import { CalculateVote } from './CalculateVote';

interface Props {
    pollid: string,
}

export const OpinionPolls = ({ pollid }: Props) => {

    const [polls, setPolls] = useState<null | Poll[]>(null)
    const [error, setError] = useState<null | PostgrestError>(null)
    const [showOptions, setShowOptions] = React.useState(true)
    const cardBackground = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.600', 'gray.400')
    const toast = useToast();

    useEffect(() => {

        const getPollsFromDatabase = async () => {
            let { data, error } = await supabase.from('polls')
                .select(`heading, text, id, options`)
                .eq('id', pollid)
                .eq('isEnabled', true)
            return { data, error }
        }

        getPollsFromDatabase().then(({ data, error }) => {
            setPolls(data as Poll[])
            setError(error)
        })

    }, [pollid])

    // console.log(polls)

    const addVote = async (poll_id: string, option: string) => {

        // insert row with option name in poll entries.
        const { error } = await supabase.from('pollEntries').insert({
            created_at: new Date(),
            poll_id,
            selected_option: option,
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
                description: `Your vote has been registered, Thank you for participating ❤️️  `
            })
        }

        setShowOptions(false)
    }

    return (
        <>
            <Box as="section" py="12">
                <Stack spacing={4} alignItems="center">
                    {polls?.map((poll) =>
                        <Box
                            key={poll.id}
                            textAlign="center"
                            bg={cardBackground}
                            shadow="lg"
                            maxW={{ base: 'xl', md: '3xl' }}
                            mx="auto"
                            px={{ base: '6', md: '8' }}
                            py="12"
                            rounded="lg"
                        >
                            <Box maxW="md" mx="auto">
                                <Stack spacing={2} mb={5}>
                                    <Heading mt="4" fontWeight="bold" fontSize="3xl">
                                        {poll.heading}
                                    </Heading>
                                    <Text
                                        color={textColor}
                                        fontWeight="bold"
                                        fontSize="sm"
                                        letterSpacing="wide"
                                    >
                                        {poll.text}
                                    </Text>
                                </Stack>
                                <Stack spacing={2}>
                                    {poll.options?.map(option =>
                                        <>
                                            {showOptions ?
                                                <Button
                                                    key={option}
                                                    onClick={() => addVote(poll.id, option)}
                                                >
                                                    {option}
                                                </Button>
                                                : null}
                                        </>
                                    )}
                                    {!showOptions ?
                                        <CalculateVote options={poll.options} poll_id={poll.id} />
                                        : null}
                                </Stack>
                            </Box>
                        </Box>
                    )}
                </Stack>
            </Box>
        </>
    )
}