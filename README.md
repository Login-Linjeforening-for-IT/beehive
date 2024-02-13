# Frontend
Our frontend is made using ReactJS 

TODO: Write more about React and a local development environment

## Setting up a development environment

In order to follow these steps you need to install docker on your machine.
Here are guides for installation on some common systems:
* [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* [Fedora](https://docs.docker.com/engine/install/fedora/)
* [Mac](https://docs.docker.com/desktop/mac/install/)
* [Windows](https://docs.docker.com/desktop/windows/install/)

You will also need docker-compose (it is included in Docker Desktop for Mac and Windows):
https://docs.docker.com/compose/install/

Once you have installed the docker-engine and docker-compose on your machine you can follow the following steps in order to set up the development environment:

1. Clone git repository.<br/>
    `git@git.logntnu.no:tekkom/web/beehive/frontend.git`
2. Move to the cloned repository.<br/>
    `cd frontend`
3. Change to desired branch.<br/>
    e.g. `git checkout dev` or `git checkout -b <branch name>` for new branch
4. Start the development server using docker-compose<br/>
    `docker-compose --profile dev up`