module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("dist/styles.css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/scripts");

    eleventyConfig.addCollection("flatProjects", function(collectionApi) {
        const workSections = require("./src/_data/workProjects.js")();

        let flat = [];
        workSections.forEach(section => {
            section.projects.forEach(project => {
                flat.push({
                    ...project,
                    section: section.name
                });
            });
        });

        return flat;
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
    };
};
