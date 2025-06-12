const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/work");
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/scripts");

    eleventyConfig.addFilter("fileToString", function (filePath) {
        try {
            return fs.readFileSync(path.join("src", filePath), "utf-8");
        } catch (err) {
            console.warn("fileToString error for", filePath, err);
            return "";
        }
    });


    eleventyConfig.addCollection("workSections", function () {
        const baseDir = "src/work";
        const sections = fs.readdirSync(baseDir).filter((f) => fs.statSync(path.join(baseDir, f)).isDirectory());

        return sections.map((section) => {
            const sectionPath = path.join(baseDir, section);
            const projects = fs.readdirSync(sectionPath).filter((f) => fs.statSync(path.join(sectionPath, f)).isDirectory());

            return {
                name: section,
                projects: projects.map((project) => {
                    const projectPath = path.join(sectionPath, project);
                    const files = fs.readdirSync(projectPath);

                    const descriptionFilename = files.find(f => f.toLowerCase() === "description.txt");
                    let descriptionText = "";

                    if (descriptionFilename) {
                        try {
                            descriptionText = fs.readFileSync(path.join(projectPath, descriptionFilename), "utf-8");
                        } catch (err) {
                            console.warn("Error reading description:", err);
                        }
                    }

                    return {
                        name: project,
                        section,
                        description: descriptionText,
                        texts: files.filter(f => /^text-\d+\.txt$/i.test(f)),
                        images: files.filter(f => /^image-\d+\.jpg$/i.test(f)),
                        permalink: `/work/${section}/${project}/`
                    };
                })
            };
        });
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        }
    };
};
