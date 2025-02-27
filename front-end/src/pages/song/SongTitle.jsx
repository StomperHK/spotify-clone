import PropTypes from "prop-types";

export function SongTitle({ title, label, breakpoint }) {
	return (
		<div className={breakpoint}>
			<h2 className="text-[1rem] max-md:text-2xl max-md:text-center">{title}</h2>
			<span className="block text-gray-300 max-md:text-xl max-md:text-center">{label}</span>
		</div>
	);
}

SongTitle.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  breakpoint: PropTypes.string,
}
