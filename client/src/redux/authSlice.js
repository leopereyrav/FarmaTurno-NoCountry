import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ownerName: '',
  ownerSurname: '',
  ownerDni: '',
  pharmacyName: '',
  pharmacyNit: '',
  pharmacyCity: '',
  pharmacyAdress: '',
  pharmacyPhone: '',
  pharmacyOpenHour: '',
  pharmacyCloseHour: '',
  registrationEmail: '',
  registrationUsername: '',
  registrationPassword: '',
};

export const authSlice = createSlice({
  name: 'auth', // este es el nombre de este slice, puedo crear varios
  initialState,
  reducers: {
    addOwnerDetails: (state, action) => {
      const { ownerName, ownerSurname, ownerDni } = action.payload;
      state.ownerName = ownerName;
      state.ownerSurname = ownerSurname;
      state.ownerDni = ownerDni;
    },
    addPharmacyDetails: (state, action) => {
      const {
        pharmacyName,
        pharmacyNit,
        pharmacyCity,
        pharmacyAdress,
        pharmacyPhone,
        pharmacyOpenHour,
        pharmacyCloseHour,
      } = action.payload;
      state.pharmacyName = pharmacyName;
      state.pharmacyNit = pharmacyNit;
      state.pharmacyCity = pharmacyCity;
      state.pharmacyAdress = pharmacyAdress;
      state.pharmacyPhone = pharmacyPhone;
      state.pharmacyOpenHour = pharmacyOpenHour;
      state.pharmacyCloseHour = pharmacyCloseHour;
    },
    addRegistrationDetails: (state, action) => {
      const { registrationEmail, registrationUsername, registrationPassword } =
        action.payload;
      state.registrationEmail = registrationEmail;
      state.registrationUsername = registrationUsername;
      state.registrationPassword = registrationPassword;
    },
  },
});

export const { addOwnerDetails, addPharmacyDetails, addRegistrationDetails } =
  authSlice.actions;

export default authSlice.reducer;
