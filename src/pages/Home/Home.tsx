import { PageContainer, Flex, Button } from '@styles/Global.styled';
import { Heading, SubHeading } from './Home.styled';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const route = () => {
    navigate('/option');
  }

  return (
    <PageContainer>
      <Flex direction={'row'}>
        <Flex direction={'column'}>
          <Heading>Lorem ipsum dolor sit amet</Heading>
          <SubHeading>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</SubHeading>
          <Button
            onClick={route}
            background={'red'}
            color={'white'}
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
    </PageContainer>
  )
}

export default Home;
