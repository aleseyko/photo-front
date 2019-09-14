import axios from "axios";
import {SET_LOCATIONS, UPDATE_LOCATION} from "./mutations";

export const getAllLocations =(context) => {
  return axios.
    get('http://localhost:3000/locations')
    .then(response => {
      context.commit(SET_LOCATIONS, response.data)
    })
}
export const sendComment =(context, comment) => {
  return axios.
    post(`http://localhost:3000/locations/${comment.locationId}/comment`, comment)
    .then(response => {
      context.commit(UPDATE_LOCATION, response.data)
      console.log(response)
    })
}