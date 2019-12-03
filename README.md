# Maana Q AI Simulator

A web application for running simulations to develop and drive Q-based intelligent agents. Each simulator is custom-coded but follows a similar patterns and therefore easy to reuse and extend components.

## Functionality

User must login to a Q instance. It is assumed that URIs refer to this instance and the authentication token will be reused. Otherwise, it is up to the user and individual simulator/agent to supply the correct access tokens. Q instance is configured in the environment settings.

Each simulator must have an accessible GraphQL endpoint URI and associated token. If no token is provided, the Q instance auth token is used if the base URI matches the Q instance.

Each simulator will require GraphQL endpoint information for each agent, which, again, is assumed to be Q-based and will reuse the token for the signed-in instance unless overridden with a custom key.

## Env variables that must be set

These must be set for the web app to communicate with the auth provider. (Auth provodier will always be set to either 'auth0' or 'keycloak')

- REACT_APP_AUTH_PROVIDER=
- REACT_APP_AUTH_AUDIENCE=
- REACT_APP_PORTAL_AUTH_IDENTIFIER=
- REACT_APP_PORTAL_AUTH_CLIENT_ID=
- REACT_APP_PORTAL_AUTH_DOMAIN=

An example for keycloak:

- REACT_APP_AUTH_PROVIDER=keycloak
- REACT_APP_AUTH_AUDIENCE=(The audience on your JWT)
- REACT_APP_PORTAL_AUTH_IDENTIFIER=(This is your 'realm' name)
- REACT_APP_PORTAL_AUTH_CLIENT_ID=(Client name)
- REACT_APP_PORTAL_AUTH_DOMAIN=(Key cloak url, usually ending in your port number)

Copy the `.env.template` file to a `.env` file (excluded from Git) and add the correct settings.

## Build

To build the simulator UI, simply change to the root directory of the repository and:

```bash
npm i
```

## Build Docker

To create a Docker image:

```bash
docker build -t maana-ai-simulator-app:v1 .
```

## Run

```bash
npm start
```

and visit (http://localhost:3000)[http://localhost:3000], if not taken there automatically.

## Run Docker

```bash
docker run -it -v ${PWD}:/app -v /app/node_modules -p 3000:80 --rm maana-ai-simulator-app:v1
```

and visit (http://localhost:3000)[http://localhost:3000]

The standard method of deploying a Q service to a Kubernetes cluster is to use the [Maana Q CLI's `mdeploy` command](https://github.com/maana-io/q-cli#cli-mdeploy):

```bash
gql mdeploy
```

and follow the prompts, resulting in something resembling:

```bash
Deploying the service maana-ai-simulator-app:v1.0.5
Located in .
Publishing to services.azurecr.io
Number Of Pods: 1
Exposing port 80
```
