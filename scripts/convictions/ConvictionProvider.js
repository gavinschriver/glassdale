let convictions = []

export const useConvictions = () => convictions.slice() //make a copy of convictions

export const getConvictions = () => {

    //this whole flow = grab data that's all in a string, reconfiguring it into JSON, then pass it into an array
return fetch("https://criminals.glassdale.us/crimes") // grab the raw data at this resrouce endpoint
    .then(response => response.json()) //once it's loaded, take that data and, assigning it the value of response, apply the .json method to that data to render into JSON objects for us 
    .then(parsedConvictions => {convictions = parsedConvictions}) // and then take the resulting JSON collection of objects, calling it parsedConvictons, and assign the value of the var convictions to be equal to that (array) value

}
