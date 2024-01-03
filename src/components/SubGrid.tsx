import SubCard from './SubCard';
import { Grid } from '@chakra-ui/react';
import useSubscriptions from '../hooks/useSubscriptions';

import UpdateSubCard from './UpdateSubCard';
import { useState } from 'react';

const SubGrid = () => {
  const { data: subscriptions } = useSubscriptions();

  const [isAdding, setIsAdding] = useState(false);

  const onClickHandle = () => {
    setIsAdding(!isAdding);
  };
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
        templateRows="1fr"
        paddingX={5}
        paddingY={5}
        gap={5}
      >
        {subscriptions.map((subscription) => (
          <SubCard subscription={subscription} key={subscription.id} />
        ))}
        <UpdateSubCard clicked={isAdding} onClickHandle={onClickHandle} />
      </Grid>
    </>
  );
};

export default SubGrid;
