# base node image
FROM node:19-bullseye

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev

# Install openssl
RUN apt-get update && apt-get install -y openssl sqlite3

ADD . .
RUN npm install 

ENV JWT_SECRET="CHANGEME"
ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p .adminjs
RUN chown -R nextjs .adminjs
RUN chmod 755 .adminjs

USER nextjs

# ENV PORT 4200
EXPOSE 4200 3000

ENTRYPOINT ["npm", "run", "prod"]