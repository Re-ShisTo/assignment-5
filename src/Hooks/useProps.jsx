import { useState } from "react";

const useProps = () => {
  const [contacts, setContacts] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [contactData, setContactData] = useState(null);

  const openShowModal = (contact) => {
    setContactData(contact);
    setActiveModal("show");
  };

  const openEditModal = (contact) => {
    setContactData(contact);
    setActiveModal("edit");
  };
  const closeModal = () => {
    setActiveModal(null);
    setContactData(null);
  };
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    fetch(`http://localhost:8000/contacts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        closeModal();
      })
      .catch(console.error);
  };

  return {
    contacts,
    setContacts,
    activeModal,
    setActiveModal,
    contactData,
    setContactData,
    openShowModal,
    openEditModal,
    closeModal,
    handleDelete,
  };
};

export default useProps;
