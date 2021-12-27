<!-- ABOUT THE PROJECT -->
## Project Overview


Test project to implement an HTTP Notification System.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Node js](https://nodejs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [MySQL](https://www.mysql.com/)
* [Objection ORM](https://vincit.github.io/objection.js/)

<p align="right">(<a href="#top">back to top</a>)</p>


### Running the project

1. Clone the repo. 
2. Make sure you have node and MySQL installed
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure your environment. Run the command below to make an env file
   ```sh
   npm run env:copy
   ```
5. Update the env file with the config as stated
6. Run database migrations
   ```sh
   npm run migrate
   ```
7. Run the command below to start the project from the project root
   ```sh
   ./start-server.sh or npm start
   ```

### Running Tests

Kindly create a database name `pangaea_test`
```sh
Run Test: npm run test
Run test coverage: npm run test:coverage
```

<p align="right">(<a href="#top">back to top</a>)</p>

### What has been covered.

The API service implements 3 endpoints:
   ```sh
   NOTE: all endpoints are POST requests.
   ```

#### Subscribe
The subscribe's endpoint allows you to create a subscriber to a particular topic:
   ```sh
      http://localhost:8000/subscribe/topic1
      sample data: {url:"http://localhost:9000/test3"}
   ```

#### Publish
The publish endpoint allows you to publish messages to subscribers of a topic:
   ```sh
      http://localhost:8000/publish/topic1
      sample data: {name:"Alan Ross", "score":100}
   ```


#### Resend
The resend endpoint allows you to resend pending messages:
   ```sh
      http://localhost:8000/resend
   ```


#### Thank you for the oppurtunity and Happy Holidays :tada:
