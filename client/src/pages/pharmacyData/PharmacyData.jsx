import React, { useEffect, useState } from 'react';
import '../pharmacyData/pharmacyDataStyle.css';
import { useGetCompanyByNameQuery } from '../../redux/companySlices';
import Footer from "../../components/Footer/Footer"
import NavbarFarmaceutico from '../../components/farmaceutico/navbarFarmacia/NavbarFarmaceutico';
// import { fetchDatos } from './fetchDatos';

const PharmacyData = () => {
  const { data, isError, isLoading, error } = useGetCompanyByNameQuery(); //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error:{error}</div>;
  console.log(data);
  const datos = data.result;


  // const [datos, setDatos] = useState([])

  // useEffect(() => {
  //   const getDatos= async () => {
  //     const response = await fetchDatos();
  //     setDatos(response);
   
  //   };

  //   getDatos();
  // }, [datos]);
 





  return (
    <>
      <div className='divPrincipalpageDatos'>
        <NavbarFarmaceutico/>
        <div className="divVerde"></div>
        <div className="divImgPerfil1">
            <img
              src="https://i.ibb.co/FmwtyVR/Group-170.png"
              alt=""
              className="imgPerfil1"
            />
          </div>
          <div className='divDatos'>
        <h1 className="tituloName mx-2">{datos.companyName}</h1>
        <p className="tituloDatosGenerales mx-2">Datos generales</p>
        <div className="">
          <div className="divDato">
            {' '}
            <p className="encabezadoDato mx-2">NIT:</p>{' '}
            <p className="txDato"> {datos.nit}</p>
          </div>
          <div className="divDato">
            {' '}
            <p className="encabezadoDato mx-2">Ciudad: </p>{' '}
            <p className="txDato">{datos.city}</p>
          </div>
          <div className="divDato">
            {' '}
            <p className="encabezadoDato mx-2">Dirección:</p>{' '}
            <p className="txDato"> {datos.address}</p>
          </div>
          <div className="divDato">
            {' '}
            <p className="encabezadoDato mx-2">Número telefónico:</p>{' '}
            <p className="txDato"> {datos.phone}</p>
          </div>
          <div className="divDato">
            {' '}
            <p className="encabezadoDato mx-2">Horario de atención:</p>{' '}
            <p className="txDato">
              {' '}
              de {datos.hourAttention.substring(0, 5)} a{' '}
              {datos.hourAttention.substring(6, 11)}{' '}
            </p>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default PharmacyData;
