# Coschedual_code_challange_2

## About
I took on a challenging project as part of a job interview, where I had just one week to develop a full-stack application. The task was to create an application using a set of specified APIs, and I chose to work with the NY Times API. 

The concept behind my project was to build a "Book Club" app, allowing users to log in, search for NY Times articles by category, and add selected books to their personal collection. 

While the project isn't yet complete and there are some loose ends to tie up, I intentionally decided to leave it in its current state. I believe this reflects my abilities as a developer under pressure. This project showcases my dedication and what I can achieve when working within tight timelines. It demonstrates my commitment to problem-solving and my willingness to take on challenges head-on.

## Technology 
* Javascript
* React
* Express
* Prisma w/sqlite
  

## Setup Instructions 
* Clone repo to your computer
* Open Terminal
   ### Inside Api folder 
1. Navigate to the API directory and run the following command `npm install` to install the project dependencies:
2. In the root directory of the API, locate the .env file and add your API_KEY obtained from https://developer.nytimes.com/apis
3. Run the following command 'npx prisma migrate dev --name init` to create a SQLite database (Note: This may take a few minutes to run the seed.js file):
4. Finally, start the server by running: `npm start`
5. This will start the server running on port 3001

    ### Inside Client folder
* Continuing with the setup of your project, follow these additional steps:
7. Open a separate terminal and navigate to the "client" directory within your project. Run the following command `npm install` to install the client-side dependencies:
8. Once the dependencies are installed, start the app by running the following command in the same terminal: `npm start`
9. This will start the client side running on port 3000
10. Open up a web browser and navigate to `localhost:3000` to run the application


## Application Instructions
    
   ### Home
1. On home page register for free account or login 

   ### Dashboard
2. Once on dashboard, click dropdown to select a catagory of books and hit Search NYT best sellers button. 
3. A List of books will appear, click on a book to see more details. 
4. Here you can see the weekly rankings of each book, visit links to buy the book, or add book to libary. 
5. Click Add to library on a book. 
6. On header click 'Profile" to visit your personal profile. 

   ### Profile
7. Here you can edit your location, bio, and hobbies. 
8. Any books you add from the dashboard will appear here. 
9. Clicking on a book will allow you to add a rating out of 10 and a small review of the book so other users know what you thought. 
10. Your profile also shows your recent activity in the Forum.

   ### Fourm
11. Clicking on the Fourm in the header brings you to the public fourm. 
12. You can browse the catagories set up by the seed.js file when migrating the database. 
13. The seed file created 100 random users from https://www.randomuser.me API
14. Each Catagory was seeded with 11 random post using the https://uselessfacts.jsph.pl/api/v2/facts/random" API
15. Each Post was seeded with 11 random comments using the same useless facts API 
16. Feel free to create your own post or add a comment to one.

