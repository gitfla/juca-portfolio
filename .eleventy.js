module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("dist/styles.css");
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
        },
    };
};
