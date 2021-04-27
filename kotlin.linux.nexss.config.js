let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

const sudo = process.sudo;

const distName = process.distro;
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
  case process.distros.CENTOS:
    languageConfig.compilers.kotlin.install = `${sudo}yum install epel-release
${sudo}yum install -y snapd
${sudo}systemctl enable --now snapd.socket
${sudo}ln -s /var/lib/snapd/snap /snap
${sudo}snap install kotlin --classic`;
    break;
  case process.distros.FEDORA:
    languageConfig.compilers.kotlin.install = `${sudo}dnf install -y snapd
${sudo}ln -s /var/lib/snapd/snap /snap
${sudo}snap install kotlin --classic`;
    break;
  case process.distros.DEBIAN:
    languageConfig.compilers.kotlin.install = `${sudo}apt update
${sudo}apt install -y snapd
${sudo}snap install kotlin --classic`;
    break;
  case process.distros.AMAZON:
    languageConfig.compilers.kotlin.install = `${sudo}yum install -y kotlin`; // error: package org.json does not exist
    break;
  case process.distros.ARCH:
    languageConfig.compilers.kotlin.install = `${sudo}pacman -S --noconfirm kotlin`; // error: package org.json does not exist
    break;
  case process.distros.UBUNTU:
    languageConfig.compilers.kotlin.install = `${sudo}apt install -y openjdk-11-jdk && snap install --classic kotlin`;
    break;
  default:
    languageConfig.compilers.kotlin.install = process.replacePMByDistro(
      languageConfig.compilers.kotlin.install
    );
    break;
}

module.exports = languageConfig;
