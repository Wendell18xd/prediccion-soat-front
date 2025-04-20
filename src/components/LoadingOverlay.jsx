export const LoadingOverlay = ({ show = false }) => {
  return (
    <div
      className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center ${
        show ? "d-flex" : "d-none"
      }`}
      style={{ zIndex: 1055 }}
    >
      <div className="text-center text-white">
        <i className="fas fa-spinner fa-spin fa-3x mb-3"></i>
        <h5 className="text-white">Cargando...</h5>
      </div>
    </div>
  );
};
