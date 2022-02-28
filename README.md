# The Travel Buddy

The Travel Buddy is meant to help make it easier to plan out your travel plans (or your every day adventures).

It's an app with the ability to search for places to go and add it to a personalized to-do list that you can check off. 
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
- As a user, I want to be able to add to/remove from a list of "Places"
- As a user, I want to be able to add "Notes" on to those saved "Places"
___

## Routing Chart
| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | / | Home - login page
| GET | /new | Page to create a new user
| POST | /new | Adds new user created to database
| GET | /user | Displays user's main page with a search bar shown and nav bar
| PUT | /user | Edit user's information
| GET | /user/edit | Page to edit user's information
| GET | /user/profile | Page with user's profile information
| GET | /results | Generates a list from the user's search
| POST | /results | Adds the chosen location from the generated search list to the user's "Places" list
| GET | /places | Page with list of user's saved places to go
| DELETE | /places/ | Deletes a location added to the user's list
| GET | /places/:id | Page with specifically chosen location from "Places" list
| POST | /places | Add a "note" to one of the saved "places"
| GET | /notes | Page with list of user's saved notes
| DELETE | /notes | Delete a created note
___

## ERDs
![ERD image](The-Travel-Buddy.drawio.png)
___

## Wireframes
![wireframe image](/The-Travel-Buddy-Wireframe.drawio.png)
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
- [ ] All links/nav bar work appropriately to navigate from one page to another
- [ ] Logging in will allow you to save to a list of "Places" and add "notes"
- [ ] Completing a search for a place to go will accurately redirect/return to a page with results
- [ ] Deleting from a list will accurately remove the location from the database and then redirect the user to the list page
- [ ] Users have the ability to attach notes/comments to the locations they've saved/added
- [ ] Users have the ability to edit their profiles
___

## Stetch Goals
- [ ] Distinguish between "Places To Go" and "Places I've Been" and generate separate pages that display both types
- [ ] Implement a map API
- [ ] Create a social page to share thoughts/ideas/opinions/reviews about visited locations
___

## Code Highlights

___

## Resources
- https://www.yelp.com/developers/documentation/v3/get_started
- https://github.com/Yelp/yelp-fusion#code-samples
- https://github.com/tonybadguy/yelp-fusion
