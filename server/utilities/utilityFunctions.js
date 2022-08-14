module.exports = function(input) 
{   
    fields = ["town","block","street_name","storey_range","flat_type"]
    var possiblekeys = []; // all possible keys among the grouped resale flats

    return input.reduce((acc, currentValue) => {
      let townKey = currentValue[fields[0]] ;
      let blockKey = currentValue[fields[1]] ;
      let streetNamekey = currentValue[fields[2]] ;
      let storeyRangeKey = currentValue[fields[3]] ;
      let flatTypeKey = currentValue[fields[4]] ;
      let finalkey = townKey + blockKey + streetNamekey + storeyRangeKey + flatTypeKey; // composite key here     
      if (!possiblekeys.includes(finalkey)) {
        acc[finalkey] = [];
        console.log(finalkey);
        possiblekeys.push(finalkey)
      }
      acc[finalkey].push(currentValue);
      return acc;
    }, {});
};


