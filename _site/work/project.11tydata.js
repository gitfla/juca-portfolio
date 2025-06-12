// src/work/project.11tydata.js

const fs = require("fs");
const path = require("path");

module.exports = () => {
    const baseDir = path.join(__dirname);
    const sections = fs.readdirSync(baseDir).filter((f) =>
        fs.statSync(path.join(baseDir, f)).isDirectory()
    );

    const projects = [];

    sections.forEach((section) => {
        const sectionPath = path.join(baseDir, section);
        const projectDirs = fs.readdirSync(sectionPath).filter((f) =>
            fs.statSync(path.join(sectionPath, f)).isDirectory()
        );

        projectDirs.forEach((project) => {
            const projectPath = path.join(sectionPath, project);
            const files = fs.readdirSync(projectPath);

            const descriptionFile = files.find(f => f.toLowerCase() === "description.txt");
            let descriptionText = "";

            if (descriptionFile) {
                try {
                    descriptionText = fs.readFileSync(path.join(projectPath, descriptionFile), "utf-8");
                } catch (e) {
                    console.warn("Couldn't read description for", project, e);
                }
            }

            projects.push({
                layout: "work/project.njk",
                permalink: `/work/${section}/${project}/`,
                project: {
                    name: project,
                        section,
                        description: descriptionText,
                        images: files.filter(f => /^image-\d+\.jpg$/i.test(f)),
                        texts: files.filter(f => /^text-\d+\.txt$/i.test(f))
                }
            });
        });
    });

    return projects;
};