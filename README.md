## About

The app, known as FamFlock, is built to centralize information, logistics, and operations relating to group travel planning with a focus on families. 

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called travel: `create database travel`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

- This app uses Puaher API. Go to https://dashboard.pusher.com/accounts/sign_up and create a free Pusher account got to channels, then click on manage, create app then create a channels app. From the left side navigation click App keys and copy these keys into your `.env` file
- This app uses Yelp Fusion API. Go to https://www.yelp.com/login?return_url=%2Fdevelopers%2Fv3%2Fmanage_app and create an account/login. Then create an app, go to "Manage App", copy your API key and paste it in your `.env` file.
- This app uses Open Cage API. Go https://opencagedata.com/ and create account/login. Then go to geocoding API and copy your API key in your `.env` file.

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=travel
  DB_PASS=YOURPASSWORD
  SECRET_KEY=A_STRING
  YELP_API_KEY=YOURYELPAPIKEY
  OCD_API_KEY=YOUROPENCAGEAPIKEY
  PUSHER_KEY=YOURPUSHERKEY
  PUSHER_SECRET=YOURPUSHERSECRETKEY
```

- Add a second `.env` file in the client folder with the following keys
- Add pusher key to client `.env`

```bash
REACT_APP_PUSHER_KEY=YOURPUSHERKEY
OCD_API_KEY=
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create tables 'budget', 'itinerary', 'listItems', 'lists', 'messages', 'messagesReactions', 'tripAddresses', 'tripGroups', 'trips', 'users' and a junction table called 'users_tripGroups' in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Database Design

https://dbdesigner.page.link/MxyD23HGVUDv1LDd9

## API Routes Design

https://drive.google.com/file/d/19zGUrjMNTJZ33VV4Svowy6uglP0bejZQ/view?usp=sharing

## Demo



https://user-images.githubusercontent.com/105108470/185666400-7c1a8ec6-8af6-4eb4-91e2-b9d73772d08b.mov



## Future Features

- Getting directions to and from addresses saved on the map
- Adding each traveller's location of origin to the map
- Integrate a more in-depth expense tracking feature with a third-party API (like Splitwise/Tricount)
- Document storage (ex. travel documents, activity tickets)
- Save and share itineraries for other families to enjoy
- Web scraping city pages for useful information (ex. how to access public transit, recommended events or activities)
- Different user accreditations & abilities (ex. trip admin, trip viewer)

## Technologies Used

- Express.js
- MySQL
- Postman
- Node.js
- Yelp API
- Pusher API
- Opencage API
- React DnD
- Json web token
- Bcrypt
- Javascript
- React
- React Router
- Leaflet
- HTML 5
- CSS
- Sass
- Bootstrap
- Tailwind


_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
