import { Box, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import { PostgrestError } from '@supabase/postgrest-js'
import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

interface Props {
    poll_id: string,
    options: string[],
}

interface Result {
    option: string,
    count: number
}

export const CalculateVote = ({ poll_id, options }: Props) => {

    const [results, setResults] = useState<null | Result[]>(null)
    const [error, setError] = useState<null | PostgrestError>(null)
    const [totalVotes, setTotalVotes] = useState(0)

    useEffect(() => {

        const getPollEntriesFromDatabase = (option: string): Promise<Result> => {
            return new Promise(async (resolve, reject) => {
                let { count, error } = await supabase.from('pollEntries')
                    .select('id', { count: "exact" })
                    .eq('poll_id', poll_id)
                    .eq('selected_option', option)
                if (error || count === null) {
                    reject(error)
                } else {
                    resolve({
                        option, count
                    })
                }
            })
        }

        let promises = options.map((o) => getPollEntriesFromDatabase(o))
        Promise.all(promises).then((r) => {
            setResults(r)
            setError(null)
            const voteTotal = r.reduceRight((totalVotes, result) => totalVotes + result.count, 0);
            setTotalVotes(voteTotal)
        })
            .catch((e) => {
                setResults(null)
                setError(e)
            })

    }, [poll_id, options])

    return (
        <>
            <Box maxW="md" mx="auto">
                <Stack spacing={6} >
                    {results?.map((r) => <Stack key={r.option} spacing={2}>
                        <HStack spacing={4}>
                            <Text color='blue.500' fontWeight='semibold'>{((r.count / totalVotes) * 100).toPrecision(2)}%</Text>
                            <Text fontWeight='bold'>{r.option}</Text>
                        </HStack>
                        <Progress colorScheme='blue' size='sm' value={(r.count / totalVotes) * 100} />
                    </Stack>)}
                </Stack>
            </Box>
        </>
    )
}