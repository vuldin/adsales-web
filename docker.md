Your private Bluemix repository is URL: registry.ng.bluemix.net/gsc_jlp

You can choose from two ways to use the Docker CLI with IBM Containers:


Option 1: This option allows you to use 'bluemix ic' for managing containers on IBM Containers while still using the Docker CLI directly to manage your local Docker host.
	Use this Cloud Foundry IBM Containers plug-in without affecting the local Docker environment:


	Example Usage:
	bluemix ic ps
	bluemix ic images

Option 2: Use the Docker CLI directly. In this shell, override the local Docker environment to connect to IBM Containers by setting these variables. Copy and paste the following commands:
	Note: Only Docker commands followed by (Docker) are supported with this option.
 	export DOCKER_HOST=tcp://containers-api.ng.bluemix.net:8443
 	export DOCKER_CERT_PATH=/Users/joshua/.ice/certs/containers-api.ng.bluemix.net/69c0de60-8dfc-49e6-b6cd-bb689a8bcd55
 	export DOCKER_TLS_VERIFY=1

	Example Usage:
	docker ps
	docker images

https://console.ng.bluemix.net/catalog/?search=container

Push your Image
Tag the image with your private namespace in the IBM Containers Registry
docker tag image_id registry.ng.bluemix.net/registryname/image_name:image_tag
Push this image to the IBM Containers Registry
docker push registry.ng.bluemix.net/registryname/image_name:image_tag

# build
./build.sh

# run locally
docker run -p 3000:3000 -d gsc-adsales-web

# initial cf container plugin
cf ic init

# list images
docker images

# list running instances
docker ps

# tag image
docker tag bb0117f24336 registry.ng.bluemix.net/gsc_jlp/adsales-web

# push
docker push registry.ng.bluemix.net/gsc_jlp/adsales-web

# list remote images
cf ic images

https://hackernoon.com/using-yarn-with-docker-c116ad289d56#.47d28xftp
