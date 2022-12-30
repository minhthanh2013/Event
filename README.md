<html>
  <body>
    <h1>Welcome to Zoom Events</h1>
    <p>This is a platform for hosting and attending online events via Zoom. With Zoom Events, users can purchase tickets to attend events and participate online, or host their own events and sell tickets. Additionally, event hosts can sell recordings of their events after they have taken place.</p>
    <h2>Tech Stack</h2>
    <ul>
      <li>NextJS</li>
      <li>NestJS</li>
      <li>Nginx</li>
      <li>Postgres</li>
      <li>Digital Ocean</li>
      <li>Cloudinary</li>
      <li>Sendgrid</li>
      <li>Docker</li>
      <li> Domain(deactivated): Google Domain https://evenity.page </li>
    </ul>
    <h2>Features</h2>
    <ul>
      <li>Host and attend online events via Zoom</li>
      <li>Purchase tickets to attend events</li>
      <li>Host your own events and sell tickets</li>
      <li>Sell recordings of events after they have ended</li>
    </ul>
    <h2>Getting Started</h2>
    <p>To get started with Zoom Events, you will need to sign up for an account. Once you have an account, you can start hosting or attending events.</p>
    <h2>Support</h2>
    <p>Reference to Zoom SDK: <link>https://marketplace.zoom.us/docs/sdk/native-sdks/introduction/</link></p> 
    <p>Reference to Zoom API: <link>https://marketplace.zoom.us/docs/api-reference/zoom-api/</link></p> 
    <h2>Overview</ht>
       <p>The application consists of several services, including a PostgreSQL database (<code>postgres</code>), a Redis cache (<code>redis</code>), a frontend client (<code>frontend</code>), a core API (<code>core-api</code>), a payment service (<code>payment</code>), a Zoom integration service (<code>zoom</code>), and a web server (<code>webserver</code>). The <code>certbot</code> service is used for managing SSL/TLS certificates for the application.</p>
    <p>The web application is built using NextJS and NestJS, and is served using Nginx. The database is Postgres, and the application is hosted on Digital Ocean. Cloudinary is used for storing and serving media, and Sendgrid is used for sending emails. The application is containerized using Docker.</p>
    <p>To start the application, run <code>docker-compose up</code> in the root directory of the project. This will build and start all of the necessary services. The frontend client will be available on port 8080, and the core API will be available on port 3000. The web server will be available on ports 80 and 443, and will serve the frontend client and proxy requests to the core API.</p>
  </body>
</html>
