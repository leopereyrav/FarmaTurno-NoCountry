import { useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  useGetTurnsQuery,
  useDeleteTurnMutation,
} from '../../redux/turnSlices';
import Table from 'react-bootstrap/Table';
import './PageTurnoStyle.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Turno = () => {
  const [deleteTurn] = useDeleteTurnMutation();
  const identificationNumber = useSelector(
    (state) => state.user.identificationNumber,
  );
  console.log(identificationNumber);
  const navigate=useNavigate()

  const formatDate = (dateString) => {
    const date = moment(dateString, 'MM/DD/YYYY, h:mm:ss a');
    return date.format('DD/MM/YY');
  };

  const { data, isError, isLoading, error } = useGetTurnsQuery(); //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR
  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error:{error}</div>;
  console.log(data);
  const users =data && data.filter((item) => item.customer.identificationNumber === identificationNumber);
    

  console.log(users);
  //   const borrarTurn = useCallback(() => {
  // 	Swal.fire({
  // 		title: "Estas seguro?",
  // 		text: "No se podra revertir!",
  // 		icon: "warning",
  // 		showCancelButton: true,
  // 		confirmButtonColor: "#E95821",
  // 		cancelButtonColor: "#5B5B5B",
  // 		confirmButtonText: "Si, borrar!",
  // 	}).then((result) => {
  // 		if (result.isConfirmed) {
  // 			deleteTurn(identificationNumber);
  // 			Swal.fire({
  // 				icon: "success",
  // 				title: "Producto borrado!",
  // 				showConfirmButton: false,
  // 				timer: 1500,
  // 			});
  // 			setShow(false);
  // 		}
  // 	});
  // }, []);
  return (
    <div>
    {users.length === 0 ? (
     Swal.fire({
      title: 'No tenemos registros de turnos con el nro de documento brindado',
      icon: 'question',
      showCloseButton: true,
      confirmButtonText:
        'volver',
    }) .then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      } 
    })
    ) : (
      <div className="general-consult">
      <div className="margin">
        <a href="/">
          <img
            src="https://i.ibb.co/T0psFH9/arrow-left-circle-fillback.png"
            alt="arrow-left-circle-fillback"
            border="0"
            className='arrow'
          />
        </a>
      </div>
      <div className="body-consult">
        <div>
          <h1>Consulta tu turno</h1>
          <p className="titulo-consult">
            Puedes revisar la información detallada del último turno que
            solicitaste, junto al historial guardado en nuestro sistema.
          </p>
        </div>

        <Table className="table" borderless hover>
          <thead className="encabezado">
            <tr>
              <th>Datos Personales</th>

              <th>Fecha y hora</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr className="td" key={user._id}>
                  <td>
                    {user.customer.name} {user.customer.surName} correo:{' '}
                    {user.customer.customerEmail}
                  </td>

                  <td>
                    {formatDate(user.date)} {user.timeSlot}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>

        {/* <div>
          <p className="titulo-consult">
            Haz click{' '}
            <a href="#" onClick={(e) => borrarTurn()}>
              aqui
            </a>{' '}
            para eliminar tu historial de turnos datos personales
          </p>
        </div> */}
      </div>
    </div>
    )}
    </div>
  );
};

export default Turno;
