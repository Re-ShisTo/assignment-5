import { useContext } from "react";
import ContactContext from "../Context/ContactContext";

const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
export default useContacts;
