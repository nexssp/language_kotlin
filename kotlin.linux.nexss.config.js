let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

// const os = require("@nexssp/os")
// Load os from Nexss CLI path (it can be changed if needed)
const os = require(`${process.env.NEXSS_SRC_PATH}/node_modules/@nexssp/os/`);
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
  case os.distros.CENTOS:
    languageConfig.compilers.kotlin.install = `${sudo}yum install epel-release
${sudo}yum install -y snapd
${sudo}systemctl enable --now snapd.socket
${sudo}ln -s /var/lib/snapd/snap /snap
${sudo}snap install kotlin --classic`;
    break;
  case os.distros.FEDORA:
    languageConfig.compilers.kotlin.install = `${sudo}dnf install -y snapd
${sudo}ln -s /var/lib/snapd/snap /snap
${sudo}snap install kotlin --classic`;
    break;
  case os.distros.DEBIAN:
    languageConfig.compilers.kotlin.install = `${sudo}apt update
${sudo}apt install -y snapd
${sudo}snap install kotlin --classic`;
    break;
  case os.distros.AMAZON:
    languageConfig.compilers.kotlin.install = `${sudo}yum install -y kotlin`; // error: package org.json does not exist
    break;
  case os.distros.ARCH:
    languageConfig.compilers.kotlin.install = `${sudo}pacman -S --noconfirm kotlin`; // error: package org.json does not exist
    break;
  case os.distros.UBUNTU:
    languageConfig.compilers.kotlin.install = `${sudo}apt install -y openjdk-11-jdk && snap install --classic kotlin`;
    break;
  default:
    languageConfig.compilers.kotlin.install = os.replacePMByDistro(
      languageConfig.compilers.kotlin.install
    );
    break;
}

module.exports = languageConfig;
