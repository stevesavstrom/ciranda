
# Ciranda: Recycling Center Search Interface

## Description
[Ciranda](https://www.ciranda.com/) supplies brands and manufacturers with the highest quality certified organic and non-GMO ingredients. As part of its' sustainability mission, Ciranda wants to help customers properly recycle commercial shipping containers such as a metal drums, plastic drums, intermediate bulk containers (IBCs), plastic film, and cardboard.

Ciranda tasked our team with building a search engine user interface that allows customers to search for, locate, and contact recycling companies in their area to meet their needs. Ciranda Recycling Center Interface was created in partnership with [Prime Digital Academy](https://www.primeacademy.io/) by [John Idso](https://www.linkedin.com/in/johnidso/), [Kong Yang](https://www.linkedin.com/in/kong-yang-founder/), [Shawn White](https://www.linkedin.com/in/shawn-white-20a2a486/), [Matthew Bouc](https://www.linkedin.com/in/matthew-bouc/), and [Steve Savstrom](https://www.linkedin.com/in/stevesavstrom/).

- Customers can search for recycling centers based on geographic area.
- Locate recycling centers based on service area and materials they accept.
- Contact recycling centers by accessing phone, email, website, and address.
- Provide feedback to Ciranda on individual recycling companies.
- Provide feedback to Ciranda on their participation in recycling efforts and contributions to sustainability mission.

## Preview
![Preview](public/images/ciranda.gif)

## Installation
1. Create a SQL database named `ciranda` (see `database.sql` for setup instructions.)
2. Open your text editor and run `npm install` in Terminal.
3. Run `npm run server` in Terminal.
4. Run `npm run client` in another Terminal to view React application.

## Usage

Users:
- Users can search for recycling centers by state and materials to return a list of local and national recycling centers that serve their area and accept the materials they wish to recycle.
- Users can view details including contact information by expanding the collapsible list to reveal additional information.
- Users can provide feedback on specific recycling companies by clicking the `feedback` button in the details view including their experience or information that needs to be updated (i.e. hours, address, materials accepted, etc.)
- Users can provide Ciranda with feedback on how often and how much they are recycling by clicking the `click here` link in the alert at the top of the search page.

Admin:
- Superuser can create additional admin/employee accounts by completing the `register user` form.
- Admins can post new recycling centers to the database by clicking `add recycler` in navigation bar when logged in.
- Admins can view feedback by clicking `feedback` in the navigation bar.
- On feedback page, admins can view company feedback and recycling feedback by toggling between the feedback views.
- On the search page, admins can search by location and materials to view company details.
- On the company details view, admins can edit company details by clicking the `edit` button.
- On company details view, admins can delete a company by clicking the `delete` button.

## Built With
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/)
- [Material-UI](https://material-ui.com/)
- [VS Code](https://code.visualstudio.com/)

## Acknowledgement
Thank you to [Ciranda](https://www.ciranda.com/) and [Prime Digital Academy](https://www.primeacademy.io/) for partnering to build this application. &copy; 2021 Ciranda, Inc. All Rights Reserved.

## Support
If you need support or have suggestions, please contact [hello@primeacademy.io](hello@primeacademy.io)
