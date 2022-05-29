import { Person, DeletedPerson } from './Contact.styled';
import propTypes from 'prop-types';

import { useDeletedContactMutation } from 'server/contacts';
import NotContacts from 'components/NotContacts/NotContacts';

const Contact = ({ elem }) => {
  const [deleted, { isLoading: isDeleted }] = useDeletedContactMutation(); //после делетед мы можем принимать опции удаления если нужно. [ a, {} ]
  return (
    <>
      {isDeleted ? (
        <NotContacts text={'Wite we deleting'} />
      ) : (
        <Person>
          {elem.name} : {elem.number}
          <DeletedPerson
            onClick={() => {
              deleted(elem.id);
            }}
          >
            <div>Delete</div>
          </DeletedPerson>
        </Person>
      )}
    </>
  );
};

Contact.propTypes = {
  elem: propTypes.object,
};

export default Contact;
