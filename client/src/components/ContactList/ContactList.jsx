import { ListPersons, BoxPersons } from "./ContactList.styled";
import Filter from "components/Filter/Filter";
import Contact from "components/Contact/Contact";
import { useSelector } from "react-redux";
import NotContacts from "components/NotContacts/NotContacts";

const ContactList = ({ contacts }) => {
    const filter = useSelector((state) => state.filter);

    const findeByName = () => {
        return contacts.filter((elem) => elem.name.slice(0, filter.length).toLowerCase() === filter.toLowerCase());
    };

    let nameContacts = findeByName();

    return (
        <BoxPersons>
            <Filter />
            {contacts.length > 0 ? (
                <ListPersons>
                    {nameContacts.map((el) => (
                        <Contact key={el._id} elem={el} />
                    ))}
                </ListPersons>
            ) : (
                <NotContacts text={"List empty now"} />
            )}
        </BoxPersons>
    );
};

export default ContactList;
