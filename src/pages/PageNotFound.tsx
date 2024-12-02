import { Link } from "react-router";

function PageNotFound() {
  return (
    <>
      <p>Page not found</p>
      <Link to="/">Return to Menu</Link>
    </>
  );
}

export default PageNotFound;
