 
 
 export const fetchDatos=()=>{
 // Obtener el token de autenticación del session storage
 const token = sessionStorage.getItem('token');
 const companyName= sessionStorage.getItem('companyName');
 
 console.log(token,companyName)
 // URL del endpoint
 const url = `${import.meta.env.VITE_API_URL}api/pharmacy/${companyName}`;
 
 // Configurar los encabezados de la solicitud
 const headers = {
   'Authorization':  token
 };
 
 // Configurar la solicitud usando fetch
 fetch(url, {
   method: 'GET',
   headers: headers
 })
 .then(function(response) {
   if (response.ok) {
     // La solicitud se realizó correctamente
     return response.json();
   } else {
     // Ocurrió un error en la solicitud
     throw new Error('Error en la solicitud. Código de estado: ' + response.status);
   }
 })
 .then(function(data) {
   // Manejar la respuesta de la solicitud
   console.log(data.result);
 })
 .catch(function(error) {
   console.log(error);
 });
}

 