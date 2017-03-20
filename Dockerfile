FROM node:7.7.1

WORKDIR /opt/app

# install yarn
RUN mkdir -p /opt
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

ADD package.json yarn.lock /tmp/

# copy cache contents (if any) from local machine
ADD .yarn-cache.tgz /

# install packages
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

# copy the code
ADD . /opt/app

CMD [ "yarn", "run", "docker-start" ]
EXPOSE 3000
