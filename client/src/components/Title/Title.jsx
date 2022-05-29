import { TitleSection } from './Title.styled';
import propTypes from 'prop-types';

const Title = ({ text }) => {
  return <TitleSection>{text}</TitleSection>;
};

Title.propTypes = {
  text: propTypes.string,
};
export default Title;
