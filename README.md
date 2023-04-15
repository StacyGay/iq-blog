# IqBlog

Iq-Blog is an over engineered demo blog platform built with Nx, NestJS and NextJS. 
This project is a work in progress and is only meant for demo purposes.
A sqlite database is included from source and is set to sync on startup.
You may run into some issues with server side rendering or hydration. 
You can usually get around this by logging in again.

## Running the project
To start the dev server run the following commands:
``` 
npm install
npm run dev 
```

## Accessing various features
Load the project by visiting:
```
http://localhost:4200
```

New users can be created by visitng the 'Sign Up' link from the menu button at the top left.
After creating a user you can view the current database by visitng:
```
http://localhost:4200/api/admin
```

You can view a rough document of the api by visiting:
```
http://localhost:4200/api/swagger
```

## Testing
Testing is currently a work in progress but you can run test suites by running the following:

### api
```
npm run test:api
```

### frontend
```
npm run test:frontend
```

## Production build
```
npm run prod:api
npm run prod:frontend
```

## Deploying to Docker
This is a work in progress. Note that the resulting docker image is not optimized at all.
It is only meant as an example for deploying iq-blog to docker.

### Build the image
After you have run a production build you can run the following command to build the docker image
```
npm run docker:build
```
Then to run the resulting docker image
```
npm run docker:run
```
The entire build and run process can be accomplished by running the following
```
npm run docker
```

Alternatively a docker-compose.yml is provided. 
If you have already run the production builds you can build and run the image using the following
```
docker compose up
```

After running, the container can be accessed by navigating to http://localhost:4200
