import { RecoverContext } from './recoverContext';
import { useState } from 'react';

const RecoverContextProvider = ({ children }) => {
  const [emailData, setEmailData] = useState({
    email: '',
    error: '',
  });

  return (
    <RecoverContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </RecoverContext.Provider>
  );
};

export default RecoverContextProvider;
