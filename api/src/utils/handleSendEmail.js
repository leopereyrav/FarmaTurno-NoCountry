const fetch = require("node-fetch");
const handleLog = require('./handleLog');
const Colors = require('@colors/colors');


const { API_KEY_BREVO, URL_API_BREVO, EMAIL_SENDER } = process.env;


const handleSendEmail = (data) => {
    
  data.map((turn) => {
    let options = {};
    const url = `${URL_API_BREVO}`;
    if (turn.action === "create") {
      options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": API_KEY_BREVO,
        },
        body: JSON.stringify({
          sender: { name: "Mary de FarmaTurno", email: `${EMAIL_SENDER}` },
          to: [
            { email: `${turn.customerEmail}`, name: `${turn.customerName}` },
          ],

          subject: "Confirmación de Turno Asignado  ",
          htmlContent: `<!DOCTYPE html> <html> <body> <h2>Turno Asignado</h2> 
            <h4>Hola ${turn.customerName}</h4>
            <p> <strong> FarmaTurno </strong>  
            te informa que el turno en la farmacia <strong> CruzVerde </strong>  
            fue registrado con éxito y serás atendido a las <strong>${turn.hour}</strong>. 
            Gracias por usar nuestro servicio, para más información ingresa a www.farmaturno.com 
            </p>  
            </body> </html>`,
        }),
      };
    } else {
      options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": API_KEY_BREVO,
        },
        body: JSON.stringify({
          sender: { name: "Mary de FarmaTurno", email: `${EMAIL_SENDER}` },
          to: [
            { email: `${turn.customerEmail}`, name: `${turn.customerName}` },
          ],

          subject: "Confirmación de Turno Asignado  ",
          htmlContent: `<!DOCTYPE html> <html> <body> <h2>Turno próximo a ser atendido</h2> 
            <h4>Hola, ${turn.customerName}</h4>
            <p> <strong> FarmaTurno </strong>  
            te informa que el turno en la farmacia <strong> CruzVerde </strong>  
            será atendido a las <strong>${turn.hour}</strong>, recuerda estar puntualmente en el punto de atención para no perder tu turno. 
            Gracias por usar nuestro servicio, para más información ingresa a www.farmaturno.com 
            </p>  
            </body> </html>`,
        }),
      };
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(Colors.bgMagenta.black(`==>> Email sending status: --> `), json)
        handleLog({logEmail: `Send email in handleSendEmail: `, json});
      })
      .catch((err) => {
        console.error(Colors.bgRed.black(` ** Error sending email: [${err}] ** `));
        handleLog({LogError: `Error in handleSendEmail: `, json});
      });
  });
};

module.exports = handleSendEmail;
