import httpClient from "./httpClient";

async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method: method,
      url: url,
      data: data,
    };

    const response = await httpClient(config);
    return response.data;
  } catch (error) {
    let errorMessage;

    if (error.response) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = "No se recibió respuesta del servidor";
    } else {
      errorMessage = "Error al realizar la solicitud";
    }

    console.log(errorMessage); // Imprime el mensaje de error en la consola
    console.log(error?.response?.data?.errors);
    throw new Error(errorMessage);
  }
}

export default makeRequest;
