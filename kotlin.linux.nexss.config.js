let languageConfig = Object.assign({}, require("./kotlin.win32.nexss.config"));

languageConfig.compilers = {
  kotlin: {
    install: "apt install openjdk-11-jdk && snap install --classic kotlin",
    command: "kotlinc",
    args: "-script <file> --",
    help: ``,
  },
};

languageConfig.languagePackageManagers = {
  gradle: {
    // TODO:
    // Gradle cheatsheet https://gist.github.com/jahe/59557d507f43574b0d96
    installation: "scoop install gradle",
    messageAfterInstallation: null, // sometimes there is need of add something to the files can be add here eg php for composer.
    build: "gradle build",
    tasks: "gradle tasks",
    search: "gradle search",
    install: "gradle install",
    uninstall: "gradle remove",
    help: "gradle help",
    version: "gradle --version",
    init: () => {
      if (
        !require("fs").existsSync(
          require("path").join(process.cwd(), ".gradle")
        )
      ) {
        require("child_process").execSync("gradle init", {
          stdio: "inherit",
        });
        console.log("initialized kotlin gradle project.");
      } else {
        console.log("kotlin gradle already initialized.");
      }
    },
    // if command not found in specification
    // run directly on package manager
    else: "gradle",
  },
};

module.exports = languageConfig;
