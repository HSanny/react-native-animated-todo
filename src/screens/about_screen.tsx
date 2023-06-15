import React from 'react';
import { ScrollView, Box, Text, VStack, Icon, Image, useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated_color_box';
import NavBar from '../components/navBar';
import MastHead from '../components/masthead';
import LinkButton from '../components/link_button';


const AboutScreen = () => {
    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'warmGray.900')}
            w="full"

        >
            <MastHead
                title="About this app"
                image={require('../assets/devaslife_about.png')}
            >
                <NavBar />
            </MastHead>
            <ScrollView
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                mt="-20px"
                pt="30px"
                p={4}
            >
                <VStack
                    flex={1}
                    space={4}
                >
                    <Box
                        alignItems="center"
                    >
                        <Image
                            source={require('../assets/profile_pic.gif')}
                            borderRadius="full"
                            resizeMode="cover"
                            w={120}
                            h={120}
                            alt="author"

                        />
                    </Box>
                    <Text
                        fontSize="md"
                        w="full"
                    >
                        React Native built animated To-Do app
                    </Text>
                    <LinkButton
                        colorScheme="red"
                        size="lg"
                        borderRadius="full"
                        href="https://www.google.com"
                        leftIcon={
                            <Icon
                                as={Feather}
                                name="youtube"
                                size="sm"
                                opacity={0.5}
                            />
                        }
                    >
                        Do more further research on React Native !
                    </LinkButton>
                    <LinkButton
                        colorScheme={useColorModeValue('blue', 'darkBlue')}
                        size="lg"
                        borderRadius="full"
                        href="https://twitter.com"
                        leftIcon={
                            <Icon
                                as={Feather}
                                name="twitter"
                                size="sm"
                                opacity={0.5}
                            />
                        }
                    >
                        @ twittter
                    </LinkButton>
                    <Text fontSize="md" w="full">
                        Are you looking forward to more info?
                        Check out my github page!
                    </Text>
                    <LinkButton
                        colorScheme="purple"
                        size="lg"
                        borderRadius="full"
                        href="https://twitter.com"
                        leftIcon={
                            <Icon
                                as={Feather}
                                name="external-link"
                                size="sm"
                                opacity={0.5}
                            />
                        }
                    >
                        @github page
                    </LinkButton>
                </VStack>
            </ScrollView>
        </AnimatedColorBox>
    )
}

export default AboutScreen;