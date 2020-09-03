let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

languageConfig.compilers = {
  kotlin: {
    install: "brew install kotlin",
    command: "kotlinc",
    args: "-script <file> --",
    help: ``,
  },
};

module.exports = languageConfig;
