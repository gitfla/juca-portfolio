const path = require("path");
const fs = require("fs");

module.exports = class {
    data() {
        const baseDir = "src/work";
        const sections = fs.readdirSync(baseDir).filter((f) =>
            fs.statSync(path.join(baseDir, f)).isDirectory()
        );

        const allProjects = [];

        sections.forEach((section) => {
            const sectionPath = path.join(baseDir, section);
            const projects = fs.readdirSync(sectionPath).filter((f) =>
                fs.statSync(path.join(sectionPath, f)).isDirectory()
            );

            projects.forEach((project) => {
                const projectPath = path.join(sectionPath, project);
                const files = fs.readdirSync(projectPath);

                allProjects.push({
                    section,
                    project,
                    description: files.find((f) => f.toLowerCase() === "description.txt"),
                    texts: files.filter((f) => /^text-\d+\.txt$/i.test(f)),
                    images: files.filter((f) => /^image-\d+\.jpg$/i.test(f)),
                    permalink: `/work/${section}/${project}/`,
                });
            });
        });

        return {
            layout: "layout.njk",
            pagination: {
                data: allProjects,
                size: 1,
                alias: "entry",
            },
            // ✅ Make sure this returns a string
            permalink: function(data) {
                return data.entry.permalink;
            },
        };
    }

    render({ entry }) {
        return `
      <h1>${entry.project}</h1>
      ${entry.description ? `<pre>${fs.readFileSync(`src/work/${entry.section}/${entry.project}/${entry.description}`, 'utf-8')}</pre>` : ""}
      <h2>Images</h2>
      <ul>
        ${entry.images.map(img => `<li><img src="/work/${entry.section}/${entry.project}/${img}" width="300"/></li>`).join("")}
      </ul>
      <h2>Texts</h2>
      <ul>
        ${entry.texts.map(txt => `<li><a href="/work/${entry.section}/${entry.project}/${txt}">${txt}</a></li>`).join("")}
      </ul>
    `;
    }
};