# Coschedual_code_challange_2

## Instructions 

   ### Inside Api folder 
1. Open api directory and run `npm install` to install dependancies
2. Locate the .env file in the root api directory and add your API_KEY from https://developer.nytimes.com/apis
3. Run command `npx prisma migrate dev --name init` this will create a sqlite database, **It may take a few minutes to run the seed.js file**
4. Run command `npm start` to start the server

    ### Inside Client folder
5. In a seperate terminal open client directory and run `npm install` to install dependancies
6. run command `npm start` to start the app 


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
