import Title from 'components/Title/Title';
import { Section } from './ContactsPage.style';
import { Form } from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import { useGetAllContactsQuery } from 'server/contacts';
import NotContacts from 'components/NotContacts/NotContacts';

function ContactsPage() {
  const { data: contacts, isLoading } = useGetAllContactsQuery();

  return (
    <Section>
      <Title text={'Phonebook'} />
      <Form />
      <Title text={'Contacts:'} />
      {!isLoading ? (
        <ContactList contacts={contacts} />
      ) : (
        <NotContacts text={'LOADING'} />
      )}
    </Section>
  );
}

export default ContactsPage;
