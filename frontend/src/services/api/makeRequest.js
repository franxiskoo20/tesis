import httpClient from "./httpClient";

async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method,
      url,
      data,
    };

    const response = await httpClient(config);
    return response.data;
    
  } catch ({ response, request }) {
    const errorMessage = response
      ? response.data.message
      : request
      ? "No se recibió respuesta del servidor"
      : "Error al realizar la solicitud";

    throw new Error(errorMessage);
  }
}

export default makeRequest;
