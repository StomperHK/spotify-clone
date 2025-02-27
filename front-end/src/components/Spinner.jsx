import PropTypes from "prop-types";

export function Spinner({ className }) {
	return <div className={`border-4 border-t-transparent p-4 inline-block border-white rounded-full animate-spin ${className}`}></div>;
}

Spinner.propTypes = {
  className: PropTypes.string,
};
