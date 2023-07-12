import { CheckCircleIcon } from "@chakra-ui/icons"
import { Card, HStack, Heading } from "@chakra-ui/react"

export default function AppHeader() {
    return (
        <Card margin="5%" bg="#E0FFD6" border="3px solid green">
            <HStack justifyContent="center">
                <Heading color="blackAlpha.700" fontSize="4xl" padding="20px" mr="-10px">
                    To-Do List
                </Heading>
                <CheckCircleIcon boxSize="10" color="blackAlpha.700" />
            </HStack>
        </Card>
    )
}