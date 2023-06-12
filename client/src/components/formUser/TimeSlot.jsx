import React from 'react';
import { useGetTurnsQuery } from "../../redux/turnSlices";
import FormUser from './FormUser';

const TimeSlot = () => {
    const { data, isError, isLoading, error } = useGetTurnsQuery(); //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR
    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>Error:{error}</div>;
    
  const horarios = [];
  for (let i = 8; i <= 19; i++) {
    const hora = {
      name: `${i < 10 ? '0' + i + ':00' : i + ':00'}`,
      value: 0,
    };
    horarios.push(hora);
  }
  if (data) {
    data.forEach((item) => {
      const timeSlot = item.timeSlot;
      const index = horarios.findIndex((hora) => hora.name === timeSlot);
      if (index !== -1) {
        horarios[index].value++;
      }
    });
  }
	
  return (
    <FormUser horarios={horarios} />
  )
}

export default TimeSlot