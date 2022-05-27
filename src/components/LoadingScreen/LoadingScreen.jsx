const LoadingScreen = ({ height }) => {
  return (
    <div
      className="spinner-container"
      style={{ height: height } || { height: "20rem" }}
    >
      <div className="loading-spinner"></div>
    </div>
  );
};
export default LoadingScreen;
