const ExportSVGPlugin = require("./exportSVG");

module.exports = {
  fileID: "UTlFMilC5JvAcmglzkGV3N",
  plugins: [
    {
      plugin: ExportSVGPlugin,
      output: "src/assets/icons",
      options: {
        page: "icons",
        transformers: [
          /*
          currentColorTransformer,
          svgoTransformer,
          svgrTransformer*/
        ]
      }
    }
    /*
    {
      plugin: ThemeUIPlugin,
      output: "src/util/theme.js",
      options: {
        replace: true
      }
    },
    {
      plugin: TailwindPlugin,
      output: "tailwind.config.js",
      options: {
        replace: true
      }
    },
    {
      plugin: ReactStyledComponentsPlugin,
      output: "src/components/design",
      options: {
        page: "components"
      }
    },
    {
      plugin: ReactTSInlinePlugin,
      output: "src/components/design/ts",
      options: {
        page: "components"
      }
    }*/
  ]
};
