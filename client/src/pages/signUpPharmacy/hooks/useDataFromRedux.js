import { useSelector } from 'react-redux';
export default function useDataFromRedux() {
  const {
    ownerName,
    ownerSurname,
    ownerDni,
    pharmacyName,
    pharmacyNit,
    pharmacyCity,
    pharmacyAdress,
    pharmacyPhone,
    pharmacyOpenHour,
    pharmacyCloseHour,
    registrationEmail,
    registrationUsername,
    registrationPassword,
  } = useSelector((state) => state.auth);

  return {
    ownerName,
    ownerSurname,
    ownerDni,
    pharmacyName,
    pharmacyNit,
    pharmacyCity,
    pharmacyAdress,
    pharmacyPhone,
    pharmacyOpenHour,
    pharmacyCloseHour,
    registrationEmail,
    registrationUsername,
    registrationPassword,
  };
}
