
import PropTypes from "prop-types";
import "./styles.css";
import { Header } from "../../components/Header";

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export function BaseLayout(props) {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <main className="content">{props.children}</main>
      </div>
    </>
  );
}
