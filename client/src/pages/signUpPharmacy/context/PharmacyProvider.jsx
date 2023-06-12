import { SignUpContext } from './pharmacyContext';
import { useState } from 'react';

const PharmacyProvider = ({ children }) => {
  const [formToShow, setFormToShow] = useState('a');

  return (
    <SignUpContext.Provider value={{ formToShow, setFormToShow }}>
      {children}
    </SignUpContext.Provider>
  );
};

export default PharmacyProvider;
