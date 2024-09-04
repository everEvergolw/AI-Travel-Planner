
export const SelectTraverlesList =[
    {
        id:1,
        title:'Just Me',
        desc: 'A sole traverles in exploration',
        icon:'✈',
        people:'1'

    },
    {
        id:2,
        title:'A Couple',
        desc: 'Two traveles in tandem',
        icon:'🍻',
        people:'2 People'

    },
    {
        id:3,
        title:'Family',
        desc: 'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 people'

    },

    {
        id:4,
        title:'Friends',
        desc: 'A bunch of thrill-seekers',
        icon:'⛵',
        people:'5 to 10 people'

    },



]

export const SelectBudgetOptions=[

    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon:'💴'

    },

    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon:'💰'

    },

    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon:'💸'

    },



]

export const AI_PROMPT1 = "Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget, give me otelsoptions list with HotelName, HotelAddress, Price, hotelImageUrl, geoCoordinates, Rating, Descriptions and suggest Itinerary with placeName, laceDetails, laceImageUrl, GeoCoordinates, ticketPricing, timeTravel each of the location for {totalDays} days with each day plan with best time in a day to visit in JSON format."



export const AI_PROMPT = `
Generate a detailed travel plan for the location: "{location}" for {totalDays} days for {traveler} with a {budget} budget. Please include:
- A list of hotel options under 'hotelsOptions', each entry should include:
  - 'HotelName'
  - 'HotelAddress'
  - 'Price'
  - 'hotelImageUrl'
  - 'geoCoordinates' (with 'latitude' and 'longitude')
  - 'Rating'
  - 'Descriptions'

- A suggested itinerary , that lists 'Itinerary' for each day of the trip, details for each 'Day' should include:
  - 'BestTime' to visit
  - 'DayPlan', a list of places to visit each day with the following details:
    - 'placeName'
    - 'placeDetails'
    - 'placeImageUrl'
    - 'GeoCoordinates' (with 'latitude' and 'longitude')
    - 'ticketPricing'
    - 'timeTravel' between locations

The output should be structured in JSON format and include:
- 'userSelection' that captures:
  - 'budget'
  - 'location'
  - 'noOfDays'
  - 'traveler'


Please ensure all details are clearly and accurately formatted in JSON format.
`;
