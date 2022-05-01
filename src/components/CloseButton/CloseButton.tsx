// import { useGameSessionContext } from '@hooks/GameContextProvider';
import { Container, Icon } from './CloseButton.styled';
import { useNavigate } from 'react-router-dom';

export default function CloseButton() {
    // const { socketConnection, endSession } = useGameSessionContext();
    const navigate = useNavigate();

    const handleClick = () => {
        // endSession(socketConnection.gameId);
        navigate('/');
    }

    return (
        <Container onClick={handleClick}>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                    <path id="x" d="m457.40681,396.98644c16.71842,16.71842 16.71842,43.80226 0,60.52068c-8.29234,8.35921 -19.25962,12.50538 -30.22691,12.50538s-21.90782,-4.17961 -30.25365,-12.53882l-140.94298,-140.86942l-140.9296,140.83598c-8.35921,8.42608 -19.31312,12.57225 -30.26703,12.57225s-21.89444,-4.14617 -30.26034,-12.57225c-16.71842,-16.71842 -16.71842,-43.80226 0,-60.52068l140.96973,-140.96973l-140.96973,-140.90285c-16.71842,-16.71842 -16.71842,-43.80226 0,-60.52068s43.80226,-16.71842 60.52068,0l140.93629,141.0366l140.96973,-140.96973c16.71842,-16.71842 43.80226,-16.71842 60.52068,0s16.71842,43.80226 0,60.52068l-140.96973,140.96973l140.90285,140.90285z"/>
                </g>
            </Icon>
        </Container>
    );
}