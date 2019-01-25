const gulp = require("gulp");
const eslint = require("gulp-eslint");
const path = require("path");
const fs = require("fs");

gulp
  .src(["./public/js/**/*.js"])
  .pipe(eslint())
  .pipe(
    eslint.format(reporter, results => {
      fs.writeFileSync(path.join(__dirname, "report-results.html"), results);
    })
  );
