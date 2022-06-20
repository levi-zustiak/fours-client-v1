import { ChangeEvent, FormEvent } from "react";

import CloseButton from "@components/CloseButton";
import { Flex, Button, Input } from '@styles/Global.styled';
import {
    Container,
    TextContainer,
    Heading,
    SubHeading,
    Form
} from './InputCard.styled';

type InputCardProps = {
    text: {
        heading: string,
        subHeading: string,
        placeholder: string,
        buttonText: string,
    };
    colors: {
        buttonBackground: string,
        buttonColor: string,
    };
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => void;
}

function InputCard(props: InputCardProps) {
    const { text, colors, value, handleChange, handleSubmit } = props;

    return (
        <Container>
            <TextContainer>
                <Heading>{text.heading}</Heading>
                <CloseButton />
                <SubHeading>{text.subHeading}</SubHeading>
            </TextContainer>
            <Flex direction={'column'}>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Input value={value} placeholder={text.placeholder} onChange={handleChange} />
                    <Button
                        background={colors.buttonBackground}
                        color={colors.buttonColor}
                    >
                        {text.buttonText}
                    </Button>
                </Form>
            </Flex>
        </Container>
    )
}

export default InputCard;