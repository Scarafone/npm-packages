const getValueFromKeyPath = require('keypather/get')
// Sample POC of how mapping could work
/**
 * Mapper
 *
 * Given an array of objects and a key map
 * return an array of converted objects
 */
function Mapper(objectsToMap, keyMap) {
	if (keyMap == null) {
		return objectsToMap
	}
	let objs = []
	for (let index in objectsToMap) {
		const objectToMap = objectsToMap[index]
		let obj = serializeObjFromMap(objectToMap, keyMap)
		objs.push(obj)
	}
	return objs
}

function serializeObjFromMap(objToConvert, map) {
  let newObj = {}
  Object.keys(map).map((key) => {
    const valueKey = map[key]
    if (valueKey) {
      let valueWeWant = getValueFromObjectForKeyPath(objToConvert, valueKey)
      newObj[key] = valueWeWant
    }
  })
  return newObj
}

function getValueFromObjectForKeyPath(targetObj, keypath) {
  if (!keypath || !targetObj) {
    return null
  }
  return getValueFromKeyPath(targetObj, keypath)
}


module.exports = {
  Mapper,
  serializeObjFromMap,
  getValueFromObjectForKeyPath
}
