import axios from "axios";
import {SET_LOCATIONS, UPDATE_LOCATION} from "./mutations";

export const getAllLocations =(context) => {
  return axios.
    get('http://192.168.43.210:3000/locations')
    .then(response => {
      context.commit(SET_LOCATIONS, response.data)
    })
}
export const sendComment =(context, comment) => {
  return axios.
    post(`http://192.168.43.210:3000/locations/${comment.locationId}/comment`, comment)
    .then(response => {
      context.commit(UPDATE_LOCATION, response.data)
      console.log(response)
    })
}