import React, { useState } from 'react';
import { Card, Button, Col, Stack, Row, Table, Badge } from 'react-bootstrap';
import '../cardsTurno/cardsTurnoStyle.css';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import { useUpdateEstadoTurnoMutation } from '../../../../redux/turnSlices';

const CardsTurno = ({ turnoTardeNumero, data }) => {
  const [updateState] = useUpdateEstadoTurnoMutation();

  const confirmar = (_id) => {
    updateState({ status: false, _id });
  };

  return (
    <>
      <div className="divTabla2">
        <Table className="tabla2">
          <tbody>
            {data.map((turn) => (
              
                <tr key={turn._id} className="divFilas2">
                  <td>
                    <div className="div12">
                      {turn.status ? (
                        Number(turn.timeSlot.substring(0, 2)) >=
                        turnoTardeNumero ? (
                          <Badge className="badge-proximo2 badge2">Proximo</Badge>
                        ) : (
                          <Badge className="badge-tarde2 badge2">Tarde</Badge>
                        )
                      ) : (
                        <Badge className="badge-atendido2 badge2">Atendido</Badge>
                      )}

                      <p className="tx-tabla2 tx-turnoId2">
                        Turno: {turn._id.substring(0, 4)}{' '}
                      </p>

                      <p className="tx-tabla2 tx-turno2">{turn.timeSlot}</p>
                    </div>
                  </td>
                  <td className="">
                    <div className="div22">
                      <div className="divName2">
                        <p className="tx-tabla2 tx-name2">
                          {turn.customer.name} {turn.customer.surName}
                        </p>
                      </div>
                      <div className="divEmail2">
                        <Stack
                          direction="horizontal"
                          gap={3}
                          className=" tx-emai2"
                        >
                          <img
                            src="https://i.ibb.co/dW8nLvg/Vector-2.png"
                            alt=""
                            className="iconosCards2 mb-3"
                          />
                          <p className="tx-tabla2 tx-email2">
                            {turn.customer.customerEmail}
                          </p>
                        </Stack>
                      </div>
                      <div className="divId2">
                        <Stack direction="horizontal" gap={3}>
                          <img
                            src="https://i.ibb.co/chhy7gC/Vector-1.png"
                            alt=""
                            className="iconosCards2 mb-3"
                          />
                          <p className="tx-tabla2">
                            {turn.customer.identificationNumber}
                          </p>
                        </Stack>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="div32">
                      {turn.status ? (
                        <Button
                          onClick={(e) => confirmar(turn._id)}
                          variant="white"
                          className="btnCheckbox2"
                        >
                          <img
                            src="https://i.ibb.co/dLfgZKs/ic-check-box-outline-blank-24px.png"
                            className="checkbox2"
                            alt=""
                          />
                        </Button>
                      ) : (
                        <img
                          src="https://i.ibb.co/KhBckv4/Checkbox.png"
                          alt=""
                          className="checkbox2"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CardsTurno;
