#!/usr/bin/env node

const fs = require("fs");

const { program } = require("commander");
const slugify = require("@sindresorhus/slugify");

/**
 * Return an empty post template.
 *
 * @param {String} title - The title of the post
 * @return {String} An empty markdown template with frontmatter for the post
 */
function postTemplate(title) {
	const now = new Date();
	const date = now.toISOString().split("T")[0];

	return `---
title: "${title}"
date: ${date}
description: >-
	TKTKTK
---
`
}

program
	.name("manage.js")
	.description("Management commands for darthmall.net")
	.version("0.1.0");

program
	.command("post")
	.argument("<title>", "Post title")
	.action((title) => {
		const subdir = new Date().getFullYear().toString();
		const slug = slugify(title);
		const tmpl = postTemplate(title);
		const dir = `src/weblog/${subdir}`;
		const file = `${dir}/${slug}.md`;

		if (fs.existsSync(file)) {
			console.log(`${file} already exists`);
			return 1;
		}

		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(file, tmpl);
		console.log(`Created ${file}`);
	});

program.parse()
