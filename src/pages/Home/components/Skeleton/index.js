import "./index.css";

export const Skeleton = ({ isLoading }) => {
  return (
    <div className={"skeleton " + (isLoading ? "" : "not-display")}>
      <div className="rect" />
      <div className="line line1" />
      <div className="line line2" />
    </div>
  );
};
