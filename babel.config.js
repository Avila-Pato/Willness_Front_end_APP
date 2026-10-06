module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          unstable_transformImportMeta: true,
          // Reanimated shared values se marcan como "no modificables" por el compilador
          // en 21 archivos. Con NONE, el compilador omite solo esos componentes en vez de fallar.
          "react-compiler": { panicThreshold: "NONE" },
        },
      ],
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
