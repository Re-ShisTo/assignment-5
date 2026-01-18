import useProps from "../Hooks/useProps";
import ContactContext from "./ContactContext";

export const ContactProvider = ({ children }) => {
  const allProps = useProps();
  return (
    <ContactContext.Provider value={allProps}>
      {children}
    </ContactContext.Provider>
  );
};
