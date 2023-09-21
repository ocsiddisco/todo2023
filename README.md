<h1 align='center'> <img src="todo-frontend/src/Images/pen.png ">
My Personal Todo List<img src="todo-frontend/src/Images/pen.png ">
</h1>

## Tech Stack

**Client:** HTML, CSS, React, React-router, Material UI, React Hot Toast

**Server:** Node, Express, Bcrypt, Cors, JWT

**Database:** MongoDB, Mongoose

**Test:** Jest, Supertest, Postman

**Deployment:** Render

## Objective

<b>For the Backend:</b>
Creating a server that will handle the requests from the Frontend, the connection with the database and the Google authentication. It should make use of controllers to handle requests and models to perfom actions on the database.

<b>For the Frontend:</b>
Aside from allowing the user to log in and add tasks, my goal was to offer them a stressless experience with the app. I paid attention to the aesthetic, added some visual notifications using Toast and Material UI.
While I heard a lot about accessibility, I deplore that my projects so far did not offer a good experience. This time, I made a conscious effort to adhere to HTML semantic markup, add hidden label tag above inputs for screen readers.

## Difficulties Encountered

I took a step back in this project by letting the Oauth2 authentication go. While I could log in and out using OAuth2, I have not succed in keeping the session alive with the user authenticated. After pending quite some time to debug this, I felt I could not use the Oauth2 properly enough to guarantee the safety of the user's credentials.
<b>-> Replace with a register/login form and the use of JSON Web Token.</b>

Deploy to render was quite the challenge, and I did not expect it! While the Frontend was deployed, it could not communicate with the Backend due to Cors issue and 502 gateway error. It appears Render takes the lead to secure all websites and web services.
<b>-> It was all good after switching my code from creating an https server to an http server.</b>

## Command

```bash
  npm start
```

## Place for Improvements

- Research to improve accessibility
- Connection to the Backend is currently quite slow, this is due to Render
- Limit the number of tasks to be updated at once at a time
