import gql from "graphql-tag";

export const GET_ALL_CARS = gql`
  query GetCars {
    cars {
      id
      name
      carType
      year
      City
      thumbnailUrl
      dailyPrice
      hourlyPrice
      monthlyPrice
      gearType
      color
      photos
      isAvailable
      gas
      features
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: String!) {
    car(id: $id) {
      id
      name
      carType
      year
      City
      gas
      features
      thumbnailUrl
      dailyPrice
      hourlyPrice
      monthlyPrice
      gearType
      color
      isAvailable
      photos
      owner{
      id
      displayName
      contactNumber
      email
      photoLink
      }

      location{
        id
        city
        longitude
        latitude
        }
    }
  }

`;


export const GET_NEAREST_CARS = gql`
  query GetNearestCars($latitude: Float!, $longitude: Float!) {
    nearestCars(latitude: $latitude, longitude: $longitude) {
      id
      name
      monthlyPrice
      dailyPrice
      hourlyPrice
      City
      gearType
      carType
      thumbnailUrl
      photos
      year
      color
      features
      isAvailable
 
      location {
        id
        city
        latitude
        longitude
      }
    }
  }
`;




export const FETCH_CHATS = gql`
query FetchChats($userId: String!) {
  FetchChats(userId: $userId) {
    id
    chatName
    users {
      id
      displayName
      email
      photoLink
      
    }
    latestMessage
    {
    content
    sender
    {
    id
    displayName
    } 
    createdAt

    }

    createdAt
  }
}
`;




export const ALL_MESSAGES = gql`
  query AllMessages($chatId: String!) {
    allMessages(chatId: $chatId) {
      content
      id
      createdAt

    
    
      chat
      {
        id
  chatName

     

      }
      createdAt

      sender
      {
  id
  displayName
  photoLink
      }



    }




  }
`;


export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: String!) {
    user(id: $id) { 
      id
      googleId
      displayName
      email
      cnic
      contactNumber
      isVerified
      photoLink
      cars {
        id
      }
      bookings {
        id
      }
      reviews {
        id
      }
    }
  }
`;



export const GET_USER_QUERY_BY_GOOGLE_ID = gql`
query userByGoogleId($id: String!) {
  userByGoogleId(googleId: $id) {
      id
      googleId
      photoLink
      isVerified
      displayName
      email
      contactNumber
      cnic
    }
  }
`;




