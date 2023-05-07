let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

const distName = process.distro;
languageConfig.dist = distName;

languageConfig.compilers = {
  kotlin: {
    install: `pkg install -y kotlin`,
    command: "kotlinc",
    args: "-script <file> --",
    help: ``,
  },
};

module.exports = languageConfig;
