import PropTypes from "prop-types";

export function MainCatalogue({ children }) {
	return <main className="min-h-[90svh] rounded-md p-8 spotify-gradient max-md:p-4">{children}</main>;
}

MainCatalogue.propTypes = {
  children: PropTypes.node.isRequired,
};