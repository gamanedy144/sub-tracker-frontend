import React from 'react';
import { Subscription } from '../models/Subscription';

interface Props {
  subscription: Subscription;
}
const SubCard = ({ subscription }: Props) => {
  return <div>{subscription.name}</div>;
};

export default SubCard;
