const fs = require("fs");
const path = require("path");

const MEDIA_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".mp4"];

module.exports = () => {
    const workDir = path.join(__dirname, ".", "work"); // Adjust path relative to _data folder

    if (!fs.existsSync(workDir)) {
        console.warn(`Warning: work directory "${workDir}" does not exist.`);
        return [];
    }

    const sections = fs.readdirSync(workDir).filter((name) => !name.startsWith("."));

    return sections.map((sectionName) => {
        const sectionPath = path.join(workDir, sectionName);

        if (!fs.existsSync(sectionPath) || !fs.statSync(sectionPath).isDirectory()) {
            // Section path doesn't exist or is not a directory
            return { name: sectionName, projects: [] };
        }

        let projects = [];
        try {
            projects = fs.readdirSync(sectionPath).filter((name) => !name.startsWith("."));
        } catch (e) {
            console.warn(`Warning: unable to read projects inside section "${sectionName}".`, e);
            projects = [];
        }

        const validProjects = projects.filter((projectName) => {
            const projectPath = path.join(sectionPath, projectName);
            return fs.existsSync(projectPath) && fs.statSync(projectPath).isDirectory();
        });

        return {
            name: sectionName,
            projects: validProjects.map((projectName) => ({
                name: projectName,
            })),
        };
    });
};