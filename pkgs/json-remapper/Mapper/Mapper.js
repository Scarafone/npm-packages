const getValueFromKeyPath = require('keypather/get')
// Sample POC of how mapping could work 
/**
 * Mapper
 * 
 * Given an array of objects and a key map
 * return an array of converted objects
 */
function Mapper(objectsToMap, keyMap, options = null) {
  printVerbose("Mapping started: ", Date())
  if (keyMap == null) {
    return objectsToMap
  }

  let objs = []
  for (let index in objectsToMap) {
    const objectToMap = objectsToMap[index]
    let obj = serializeObjFromMap(objectToMap, keyMap)
    objs.push(obj)
  }
  
  function serializeObjFromMap(objToConvert, map) {
    if (!objToConvert || !map) return null
      let newObj = {}
      Object.keys(map).map( key => {
        const valueKey = map[key]
        if (valueKey) {
          let valueWeWant = getValueFromObjectForKeyPath(objToConvert, valueKey)
          newObj[key] = valueWeWant
        } else {
          newObj[key] = objToConvert[valueKey]
        }
      })
      return newObj
    }
    
  function getValueFromObjectForKeyPath(targetObj, keypath) {
    if (!keypath || !targetObj) { return null }
    return getValueFromKeyPath(targetObj, keypath) 
  }

  function printVerbose(message, ...args) {
    if(options && options.verbose) {
      console.info(message, ...args)
    }
  }

  printVerbose("Mapping finished:", Date())  
  return objs

}

module.exports = Mapper