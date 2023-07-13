import { CheckCircleIcon } from "@chakra-ui/icons"
import { Card, HStack, Heading } from "@chakra-ui/react"

export default function AppHeader() {
    return (
        <Card margin="0.5rem" width="25rem" border="0.3rem solid green">
            <HStack justifyContent="center">
                <Heading color="#297105" padding="1rem" marginRight="-1rem">
                    To-Do List
                </Heading>
                <CheckCircleIcon boxSize="10" color="#297105" />
            </HStack>
        </Card>
    )
}