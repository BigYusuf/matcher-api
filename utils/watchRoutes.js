// utils/watchRoutes.js
const chokidar = require("chokidar");
const path = require("path");
const { exec } = require("child_process");
// const { generateSwaggerDocsFromRoutes } = require("./generateSwaggerPaths");

const routesPath = path.join(__dirname, "..", "routes");

if (process.env.NODE_ENV !== "production") {
  console.log("👀 Watching routes for changes...");
}

const watcher = chokidar.watch(routesPath, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add", (filePath) => {
  console.log(`📄 Route created: ${filePath}`);

  if (process.env.NODE_ENV !== "production") {
    generateDocs();
  }
  //   generateSwaggerDocsFromRoutes();
});

watcher.on("change", (filePath) => {
  console.log(`✏️ Route edited: ${filePath}`);
  if (process.env.NODE_ENV !== "production") {
    generateDocs();
  }
  //   generateSwaggerDocsFromRoutes(); // generate paths
});

function generateDocs() {
  exec("node utils/generateSwaggerDocs.js", (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Error generating docs:", stderr);
    } else {
      console.log("✅ Swagger docs updated.");
      console.log(stdout);
    }
  });
}
