---
title: Logging in Eleventy
date: 2022-06-19
description: >-
    How to use the debug package to output custom log messages alongside of
    Eleventy’s logs in your Eleventy build.
tags:
    - Eleventy
---

Eleventy uses the [debug](https://www.npmjs.com/package/debug) package to log debug messages to the console. If something is going wrong with your build, you can set the `DEBUG` environment variable to view log messages from specific parts of Eleventy, or all of it. The Eleventy docs refer to this as [Debug Mode](https://www.11ty.dev/docs/debugging/).

<figure>

```bash
DEBUG=Eleventy* eleventy
```

<figcaption>Turn on debug logging for all of Eleventy.</figcaption>
</figure>

<figure>

```bash
DEBUG=Eleventy:ComputedData eleventy
```

<figcaption>Turn on debug logging just for computed data.</figcaption>
</figure>

## Debugging Your Own Code

Since `debug` is already installed with your Eleventy project, you might want to take advantage of it yourself to debug your own code. All you have to do is import the `debug` module and create a logger with your namespace. For example, suppose you have some computed data that pulls data from a database.

<figure>

```js
// Create a logger that writes to the darthmall:database namespace.
const debug = require("debug")("darthmall:database");

module.exports = async function () {
	let data = [];
	debug("Fetching data...");
	try {
		let data = await getRecords();
		debug(`Fetched ${data.length} records`);
	} catch {
		debug("Database read failed");
	}

	return data;
};
```

<figcaption><samp>src/_data/database.js</samp></figcaption>
</figure>

Now if we need to debug our database fetch, we can run our build with `DEBUG=darthmall:database` in the environment.

<figure>

```bash
DEBUG=darthmall:database eleventy
```

<figcaption>Run Eleventy with our database log messages instead of Eleventy’s default output.</figcaption>
</figure>

## Add Your Logs to Eleventy’s

There’s just one problem with the above solution: when we set `DEBUG=darthmall:database`, all of the output from Eleventy disappears. If you’re trying to debug some part of your site locally, this is great because it keeps unrelated log messages out of sight. But what if you want these logs included as part of a build—say in <abbr>CI</abbr>—so that if a build fails you can go back and see the reason. In this case, you may want to add your logs to the default Eleventy output so that the logs in CI are more informative.

If you dig around in the [Eleventy source code](https://github.com/11ty/eleventy/blob/e386ec5f70e08254284e76a41dcbc591762282c8/src/Util/ConsoleLogger.js#L2), you’ll find that the default Eleventy messages are output to the `Eleventy:Logger` namespace. We can add this to our `DEBUG` environment variable with a comma and then both of the default Eleventy log messages and our database log messages will be printed.

<figure>

```bash
DEBUG=Eleventy:Logger,darthmall:database eleventy
```

<figcaption>Log Eleventy’s default messages and our custom messages with `debug`.</figcaption>
</figure>

Et voilà! We get to see Eleventy’s usual output about writing templates and so on along with the output from our database code. This way we get nice status messages in our builds, but if something goes wrong, we don’t have to re-run the build in CI to find out what went wrong.

## Beware GitLab CI

If you happen to be buiding your Eleventy site with GitLab CI, you have to be careful about how you set your `DEBUG` variable. You might be tempted—as I was—to set it as a variable in the job.

<figure>

```yaml
build:
    variables:
        DEBUG: "Eleventy:Logger,darthmall:database"
    script:
        - eleventy
```

<figcaption>Set the <code>DEBUG</code> variable in GitLab CI’s environment variable config section.</figcaption>
</figure>

Doing this will probably break your builds. For some reason, setting a `DEBUG` variable in the job like this, causes artifact uploads to fail as well as some other bad behaviors. There’s an [open issue for GitLab CI](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/3068), which has been open for several years. Instead, you should set the `DEBUG` variable when you invoke `eleventy`.

<figure>

```yaml
build:
    script:
        - DEBUG="Eleventy:Logger,darthmall:database" eleventy
```

<figcaption>Safely set the <code>DEBUG</code> variable just for your Eleventy build.</figcaption>
</figure>

This limits the scope of the `DEBUG` environment variable to just your Eleventy build process, so that when it comes time for GitLab to upload artifacts or do any other work, the variable is not present and everything continues to function normally.

---

Happy logging!
