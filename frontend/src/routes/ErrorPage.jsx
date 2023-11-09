import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  
  const error = useRouteError();
  // console.error("prueba" + error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Perdon esto es un error.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default ErrorPage;
