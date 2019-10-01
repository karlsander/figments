const meow = require("meow");
const Figma = require("figma-js");
const process = require("process");
const { setFigmaToken, watchFigmaFile } = require("unicon");
const config = require("./figma.config.js");
const { outputFileSync } = require("fs-extra");

const cli = meow(
  `
	Usage
	  $ figma-sync [watch]

	Examples
	  $ figma-sync watch
`
);

async function executePlugins({ client }) {
  const { data } = await client.file(config.fileID);
  config.plugins.forEach(async ({ plugin, options, output }) => {
    const files = await plugin({
      options,
      token: process.env.FIGMA_TOKEN,
      fileID: config.fileID,
      output,
      client,
      data
    });
    if (files) {
      if (Array.isArray(files)) {
        files.forEach(({ filename, content }) => {
          outputFileSync("./" + output + "/" + filename, content);
        });
      } else {
        outputFileSync(output, files);
      }
    }
  });
}

async function run(input, flags) {
  const client = Figma.Client({
    personalAccessToken: process.env.FIGMA_TOKEN
  });

  setFigmaToken(process.env.FIGMA_TOKEN);

  if (input[0] === "watch") {
    watchFigmaFile(config.fileID, async () => {
      await executePlugins({ client });
    });
  } else {
    await executePlugins({ client });
  }
}

run(cli.input, cli.flags);
