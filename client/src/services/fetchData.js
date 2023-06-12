export async function fetchData(URL) {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('ERROR: ', err);
    throw err;
  }
}
