export const postTurn = async (data, url) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const URL = `${BASE_URL + url}`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    //console.log(data);
    //console.log(response);
    if (!response.ok) {
      throw new Error('Error al enviar los datos');
    }
    return response;
  } catch (error) {
    console.error('ERROR: ', error);
    throw error;
  }
};
