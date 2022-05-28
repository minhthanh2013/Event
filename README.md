# Website tổ chức sự kiến khoa học
Steps to run the project:
<ol>
  <li>Cd to the project
  <li>Run "docker compose up"
  <li>Run npx prisma migrate dev
  <li>Cd to the each module project
  <li>yarn install
  <li>Run yarn start:dev in this order: API Gateway => other modules
</ol>
<b>To run yarn db:dev:restart on Windows => In package.json change this "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && sleep 1 && yarn prisma:dev:deploy" => "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && timeout 1 && yarn prisma:dev:deploy"
