import { useContext } from 'react';
import ScrollContainerContext from '../components/ScrollContainerContext';

const useScrollContainer = () => useContext(ScrollContainerContext).current;

export default useScrollContainer;
