let languageConfig = Object.assign({}, require("../config.win32"));
languageConfig.title = "Kotlin";
languageConfig.description =
  "Kotlin is a general purpose, open source, statically typed “pragmatic” programming language for the JVM and Android that combines object-oriented and functional programming features. ";
languageConfig.url = "https://kotlinlang.org";
languageConfig.extensions = [".kts", ".kt"];
languageConfig.executeCommandLine = "";
languageConfig.printCommandLine = ""; //no console.log() needed to display result eg node -p "4+6"
languageConfig.checkSyntax = "";
languageConfig.interactiveShell = "kotlinc-jvm";
languageConfig.builders = {};
languageConfig.compilers = {
  kotlin: {
    install: "scoop install kotlin gradle",
    // Cpp does not have possibility to compile and run on the fly. We need to save it as a exe file first.
    command: "kotlinc",
    args: "<file>",
    help: ``
  }
};
languageConfig.errors = require("./nexss.kotlin.errors");
languageConfig.languagePackageManagers = {
  gradle: {
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
          stdio: "inherit"
        });
        console.log("initialized kotlin gradle project.");
      } else {
        console.log("kotlin gradle already initialized.");
      }
    },
    // if command not found in specification
    // run directly on package manager
    else: "gradle"
  }
};

module.exports = languageConfig;
