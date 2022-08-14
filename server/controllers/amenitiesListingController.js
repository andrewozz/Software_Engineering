/* 
Algorithm: 

1. require axios
2. Get the blockName from the request
3. use OneMap REST API -> retrieve longitude and latitude 
*/

const axios = require("axios");
const geoApifyApiKey = process.env.GEOAPIFY_API_KEY;
const getAmenities = async (req, res) => {
  const { blockNum, streetName, distRange, resLimit } = req.query;
  const blockNumStreetName = blockNum.concat(" ", streetName);
  //   console.log(blockNumStreetName);
  let addressDataArr, oneMapResponseData;
  try {
    const oneMapResponse = await axios.get(
      `https://developers.onemap.sg/commonapi/search?searchVal=${blockNumStreetName}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    oneMapResponseData = oneMapResponse.data;
    // res.status(200).json(oneMapResponseData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  addressDataArr = oneMapResponseData["results"][0];
  const { LONGITUDE, LATITUDE } = addressDataArr;
  //   console.log(`Longitude: ${LONGITUDE}`);
  //   console.log(`Latitude: ${LATITUDE}`);
  //   console.log(addressDataArr);
  /* Amenities Queries needed:
    
    commercial.shopping_mall,
    commercial.supermarket,
    sport.sports_centre
    public_transport.train
    public_transport.bus

    distRange (in metres)
    filter: circle by radius
    limit: number of results returned
    */
  const cSMall = "commercial.shopping_mall";
  const cSMarket = "commercial.supermarket";
  const sSCentre = "sport.sports_centre";
  const pTTrain = "public_transport.train";
  const pTBus = "public_transport.bus";
  const eSchool = "education.school";

  const filter = `circle:${LONGITUDE},${LATITUDE},${distRange}`;

  try {
    const geoApifySMallResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${cSMall}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifyCSMarketResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${cSMarket}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifySSCentreResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${sSCentre}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifyPTBusResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${pTBus}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifyPTTrainResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${pTTrain}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifyESchoolResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${eSchool}&filter=${filter}&limit=${resLimit}&apiKey=${geoApifyApiKey}`
    );
    const geoApifySMallResponseData = geoApifySMallResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    const geoApifyCSMarketResponseData = geoApifyCSMarketResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    const geoApifySSCentreResponseData = geoApifySSCentreResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    const geoApifyPTBusResponseData = geoApifyPTBusResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    const geoApifyPTTrainResponseData = geoApifyPTTrainResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    const geoApifyESchoolResponseData = geoApifyESchoolResponse["data"][
      "features"
    ].map((item) => {
      const itemProperties = item.properties;
      return {
        name: itemProperties.name,
        formatted: itemProperties.formatted,
        longitude: itemProperties.lon,
        latitude: itemProperties.lat,
        categories: itemProperties.categories,
      };
    });
    geoApifyApiKey;
    const placesResults = {
      shoppingMall: geoApifySMallResponseData,
      superMarket: geoApifyCSMarketResponseData,
      sportsCentre: geoApifySSCentreResponseData,
      publicTransportBus: geoApifyPTBusResponseData,
      publicTransportTrain: geoApifyPTTrainResponseData,
      schools: geoApifyESchoolResponseData,
      longitude: LONGITUDE,
      latitude: LATITUDE,
    };

    res.status(200).json(placesResults);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  getAmenities,
};
