let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

const os = require("@nexssp/os");
const sudo = os.sudo();

const distName = os.name();
languageConfig.dist = distName;

languageConfig.compilers = {
  kotlin: {
    install: `${sudo}apt install -y kotlin`,
    command: "kotlinc",
    args: "-script <file> --",
    help: ``,
  },
};

switch (distName) {
  case os.distros.ARCH:
    languageConfig.compilers.kotlin.install = `${sudo}pacman -S --noconfirm kotlin`; // error: package org.json does not exist
    break;
  case os.distros.UBUNTU:
    languageConfig.compilers.kotlin.install = `${sudo}apt install openjdk-11-jdk && snap install --classic kotlin`;
    break;
  default:
    languageConfig.compilers.kotlin.install = os.replacePMByDistro(
      languageConfig.compilers.java8.install
    );
    break;
}

module.exports = languageConfig;
