---
title: Node Development with Docker
date: 2021-10-27
description: >-
    A few tips for using Docker containers during development with Node
    applications.
tags:
    - Docker
    - Node
    - Web Dev
---

I don't use [Docker](https://www.docker.com/) for my development environments as
a matter of course, but I do sometimes find that it is useful. I use it
infrequently enough for development that I sometimes forget some of these tricks
(specifically [the one about the NPM cache](#moving-the-npm-cache), which I've
now had to figure out twice). So, to save my future self some time, I thought
I'd write these down.

If you're not interested in the explanations, you can just jump down to the
[sample config](#wrapping-up).

## Why Docker?

I tend to reach for Docker when a project involves multiple services that need
to communicate with one another over a network. For example, you may have some
backend services that are written as Amazon Web Services (<abbr>AWS</abbr>)
Lambda Functions and a front-end that's a single page app sending <abbr
title="Hypertext Transfer Protocol">HTTP</abbr> requests to those Lambda
Functions. Or maybe you've got a Django application that needs to communicate
with a relational database like PostgreSQL or MySQL.

In cases like these, I find it's much easier to configure a few Docker
containers with [Docker Compose](https://docs.docker.com/compose/) than it is to
set these technologies up individually.

### Docker Compose

I like to use Docker Compose for development environments for a few reasons.

- Starting the development environment is usually as simple as running
  `docker-compose up`
- Docker Compose handles all of the networking between containers, so it's easy
  to configure connections between the containers
- If I'm not deploying the application as a container, then I can usually
  configure an official base image in `docker-compose.yml` directly instead of
  having to create a `Dockerfile`

## Binding the `src/` Directory

Whether you're using something like [Vite](https://vitejs.dev/) for hot module
replacement (<abbr>HMR</abbr>) or [nodemon](https://nodemon.io/) to kick your
Express server, most web development tools these days have some capacity to
watch your source code for changes and automatically update them. I don't want
to give up this handy aspect of modern tools just because I'm using Docker, so I
usually create a [bind mount](https://docs.docker.com/storage/bind-mounts/) for
my `src/` directory into the
[WORKDIR](https://docs.docker.com/engine/reference/builder/#workdir) of the
Docker container.

Binding your host directory over the working directory of the container means
any changes to the files in there will be immediately available in the container
without having to rebuild it. So if you're running some live-reloading server in
the container, it will notice the changes whenever you save and reload the
application.

In your `docker-compose.yml` file using an official Node image, it would look
something like this:

```yaml
frontend:
    image: "node:14.18.1-alpine"
    volumes:
        - "./src/:/home/node/app/"
```

## Setting the User ID in the Container

I've often found it to be the case that I need to run commands in the container
that generate files in my project directory. A common one with Node would be
`npm install`, but if you're using an Object-Relational Mapping
(<abbr>ORM</abbr>) to talk to a database, it may provide tools for generating
database migrations based on the changes you make to your models (I run into
this one a lot with Python web applications).

Unfortunately, the user in the container may be different than your host user,
so if you run those commands in the container and it puts files in your `src/`
directory, those files won't be owned by your user. You'll have to `sudo chown`
them every time you run one of these commands in the container. This is tedious,
so you're left with two alternatives:

1. Set up a development environment (Python, Node, <i>etc.</i>) on your host
   machine to run these commands as your user instead of the container's user
2. Change the user in the container to match your user

I prefer the second option. Duplicating the environment that already exists in
the container seems fragile and undermines the value of Docker in the first
place. Plus, I like to think about how much I'm asking of anyone who might want
to contribute to a project. If I've already asked a hypothetical contributor to
set up Docker on their computer, I don't want them to then have to set up the
correct version of Node (or Python), possibly involving the use a version
manager like [nvm](https://github.com/nvm-sh/nvm), and install dependencies into
both environments and keep those environments in sync.

Fortunately, there's a very easy way to override the user ID and group ID of the
current user in a container so that whatever files are created by that user in
the container will have the same ownership as if they had been created by your
user on the host. Simply set the `user` property of the service in your
`docker-compose.yml` file to be the user ID and group ID of your user, which you
can easily find by running `id -u` and `id -g` in a terminal. It looks something
like this:

```yaml
frontend:
    # ...
    user: "1000:1000"
```

### A More Portable `user` Setting

The only problem with the above configuration is that you can't guarantee that
other contributors to your project all have a user ID of 1000 and a default
group ID of 1000 (or whatever your user and group IDs are). You don't want them
editing `docker-compose.yml` for their user, because they might accidentally
commit it and then you end up in a commit war with your collaborators over the
user settings for the development environment.

Instead, I like to set these values as environment variables. Conveniently,
Docker Compose will check for a `.env` file in the same directory in which
`docker-compose.yml` resides. So you can just put those IDs in variables in a
`.env` and set them in your configuration from the variables.

```bash
echo "UID=$(id -u)" >> .env
echo "GID=$(id -g)" >> .env
```

And then your `docker-compose.yaml` refers to those variables.

```yaml
frontend:
    # ...
    user: ${UID}:${GID}
```

**Make sure you add `.env` to your `.gitignore`.** <i>Et voilà</i>, any files
created by the user in the container will always have the appropriate ownership
on the host filesystem for all contributors to the project. I find the `.env`
approach quite convenient because most of the languages I work with have some
package for reading environment variables out of a `.env` file as well, so I
often want a `.env` file for development environment configuration anyway.

## Running Commands in the Container

I like to override the
[entrypoint](https://docs.docker.com/engine/reference/builder/#entrypoint) for
the official Node image to be `npm` instead of their `docker-entrypoint.sh`
script. This makes executing commands in the container a little easier for me,
since I tend to use NPM scripts for all my tasks. So I'll add this to my
`docker-compose.yml`:

```yaml
frontend:
    # ...
    entrypoint: ["npm"]
    command: ["run", "dev"]
```

By default, the container will run `npm run dev`, but I can easily run other
commands such as `npm install` by just passing the subcommand (`install` in this
case) directly to the image when I run it. So installing dependencies is simply:

```bash
docker-compose run --rm frontend install
```

Alternatively, leave the `entrypoint` alone and just set up the command to be
whatever you like:

```yaml
frontend:
    # ...
    command: ["npm", "run", "dev"]
```

And installing dependencies looks like:

```bash
docker-compose run --rm frontend npm install
```

## Moving the NPM Cache

This is the big "gotcha" with using Docker for a Node dev environment and is the
reason I decided to write all of this nonsense down. It took me what seemed like
ages to figure out a solution to this problem.

Because of how the official Node Docker image is configured, NPM tries to put
its cache of packages in `/.npm/`. Unless you're running as `root`, you will get
an error from NPM whenever you try to install packages. One way around this is
to always run `npm install` as `root` (`docker-compose run --rm -u root frontend
install`), but then you have to `sudo chown` your `node_modules/` directory
after every install or update.

I think a better solution is to move where NPM puts its cache to somewhere you
have permission to write. Fortunately, NPM allows you to [set environment
variables for any config
parameters](https://docs.npmjs.com/cli/v6/using-npm/config#environment-variables)
just by prefixing them with `NPM_CONFIG_`. So we don't have to run `npm config
cache` to change the cache directory, we can just set `NPM_CONFIG_CACHE` to the
desired location in our `docker-compose.yaml`.

```yaml
frontend:
    # ...
    environment:
        - NPM_CONFIG_CACHE=/home/node/app/.npm-cache-docker/
```

I like to give it a name that makes it very clear that this is a directory
created by the Docker container, just to be safe.

You may have noticed that we're putting the NPM cache directory in the directory
that we've mounted our `src/` directory over, which means that the the NPM cache
will end up on the host filesystem in `src/.npm-cache-docker`, so you'll want to
remember to **add `./src/.npm-cache-docker` to your `.gitignore`**.

Other than having to add the NPM cache to your `.gitignore`, the only other
disadvantage that I can think of with this approach is that you can't take
advantage of a system-wide cache for NPM. So if you have multiple projects that
have some of the same dependencies (likely), they'll be fetching and caching
them per-project instead of sharing them.

In practice, this has never been a problem for me, but if you have a better
solution to this problem, I'd love to hear about it, so [send me a
webmention](/weblog/webmentions/).

## Wrapping Up

And that pretty much does it.

With all of this set up in Docker Compose, my `README` usually contains
instructions that look something like this to get a new development environment
started:

<figure>

```bash
echo "UID=$(id -u)" >> .env
echo "GID=$(id -g)" >> .env
docker-compose run --rm frontend install
docker-compose up
```

<figcaption>Sample "getting started" section of a README</figcaption>
</figure>

<figure>

```yaml
version: 3.8

frontend:
    image: "node:14.18.1-alpine"
    volumes:
        - "./src/:/home/node/app/"
    environment:
        - NPM_CONFIG_CACHE=/home/node/app/.npm-cache-docker/
    ports:
        - "8080:8080"
    user: ${UID}:${GID}
    entrypoint: ["npm"]
    command: ["run", "dev"]

# Other services ...
```

<figcaption>Sample docker-compose.yml</figcaption>
</figure>

<figure>

```bash
UID=1000
GID=1000
```

<figcaption>Sample .env</figcaption>
</figure>

<figure>

```bash
.env
src/.npm-cache-docker
```

<figcaption>Sample .gitignore</figcaption>
</figure>
