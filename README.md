# The Travel Buddy

The Travel Buddy is meant to help make it easier to plan out your travel plans (or your every day adventures).

It's an app with the ability to search for places to go and add it to a personalized to-do list that you can check off. 

You can also mark off the visited location and add it to the "Places I've Been" list and add comments/notes about the place (e.g., in case you need to remember that this location had the best view in the city, or to let a friend know of the best dish to order at the restaurant, or if you need to remember to never come back to this place again)
___

## The Story Behind The App
When I make plans to go travel somewhere, I find that I use various apps to search for places I want to go, things I want to see, restaurants I want to eat at, etc.

Each time I identify a place I'm interested in, I find myself using my Notes app on my phone to type out the place to visit and save it for later. Then I switch back to the search/travel apps to continue looking.

I also have experiences where I go to a restaurant and I order something delicious and I think to myself, "I'm going to have to order this again the next time I back". However, when the next time comes around, I don't even remember what it was I ordered and that's what I get for trying to trust my memory.

The Travel Buddy is my attempt to trim the information and functionality packed features from other travel and search applications and combine it with a to-do list like system to provide an app that completes just 3 primary functions.
1. Search for places to go
2. Add to lists of places to go / places I've been
3. Make notes/comments
___

## User Stories
- As a user, I want to be able to create a personalized account so that I can track/save my lists
- As a user, I want to be able to add to/remove from a list of "Places I Want To Go"
- As a user, I want to be able to add to/remove from a list of "Places That I've Been".
- As a user, I want to be able to add notes on the "Places that I've been"
___

## Routing Chart
| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | / | Home - login page
| GET | /new | Page to create a new user
| POST | /new | Adds new user created to database
| GET | /user | Displays user's main page with a search bar shown and nav bar of "Places To Go" / "Places I've Been"
| PUT | /user | Edit user's information
| GET | /user/profile | Page with user's profile information
| GET | /user/results | Generates a list from the user's search
| POST | /user/results | Adds the chosen location from the generated search list to the user's "Places To Go" or "Places I've Been" list.
| GET | /user/togo | Page with list of user's "Places To Go"
| POST | /user/togo/ | Add the selected location from user's "Places To Go" list into the "Places I've Been" list
| DELETE | /user/togo/ | Deletes a location added to the user's "Places To Go" list and redirects to /user/togo
| GET | /user/togo/:id | Page with specifically chosen location from "Places To Go" list
| GET | /user/been | Page with list of user's "Places I've Been"
| DELETE | /user/been/ | Deletes a location added to the user's "Places I've Been" list and redirects to /user/been
| GET | /user/been/:id | Page with specifically chosen location from "Places I've Been" list


___

## Wire Frames

___
## Tech Utilized
- HTML
- CSS
- JavaScript
- Bootstrap
- PostgreSQL
- Node.js
- Express
- Sequelize
___

## MVP Checklist
- [] All links/nav bar work appropriately to navigate from one page to another
- [] Logging in will allow you to save to a list of "Places To Go" and/or "Places I've Been"
- [] Completing a search for a place to go will accurately redirect/return to a page with results
- [] Deleting from a list will accurately remove the location from the database and then redirect the user to the list page
- [] Users have the ability to attach notes/comments to the locations they've saved/added
- [] Users have the ability to edit their profiles
___

## Stetch Goals
- [] Add comments/notes functionality to the "Places To Go" list
- [] Implement a map API
- [] Create a social page to share thoughts/ideas/opinions/reviews about visited locations
___

## Code Highlights

___

## Resources
- https://www.yelp.com/developers/documentation/v3/get_started
- https://github.com/Yelp/yelp-fusion#code-samples
- https://github.com/tonybadguy/yelp-fusion
