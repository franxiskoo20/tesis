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
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error al realizar la solicitud");
    }
  }
}

export default makeRequest;
