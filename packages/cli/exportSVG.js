const { getSvgsFromFigma } = require("unicon");

module.exports = async ({ options, token, fileID, output, client, data }) => {
  const svgs = await getSvgsFromFigma(fileID, { page: options.page });
  return Object.keys(svgs).map(name => ({
    filename: `${name}.svg`,
    content: svgs[name]
  }));
};
