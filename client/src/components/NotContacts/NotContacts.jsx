import { Nossing } from './NotContacts.styled';
import propTypes from 'prop-types';

const NotContacts = ({ text }) => {
  return <Nossing>{text}</Nossing>;
};

NotContacts.propTypes = {
  text: propTypes.string,
};
export default NotContacts;
