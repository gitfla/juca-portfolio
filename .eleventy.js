module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("dist/styles.css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/scripts");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
    };
};
