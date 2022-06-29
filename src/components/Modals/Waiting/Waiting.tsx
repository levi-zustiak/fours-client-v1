import { Container, Heading, Animation } from "./Waiting.styled";

function Waiting() {
    return (
        <Container>
            <Heading>Waiting</Heading>
            <Animation>
                <div></div>
                <div></div>
                <div></div>
            </Animation>
        </Container>
    );
}

export default Waiting;