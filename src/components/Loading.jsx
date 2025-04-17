export const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1050 }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h3 className="mt-3">Cargando...</h3>
      </div>
    </div>
  );
};
