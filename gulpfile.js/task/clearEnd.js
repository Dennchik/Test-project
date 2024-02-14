//* Deleting a directory - Public
const clear = () => {
	return $.del($.path.rootEnd);
};
module.exports = clear; 