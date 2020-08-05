export default {
  showTagReplacement,
  arrayUnique,
  formatVariableTags,
  getDecimalCount,
}

function showTagReplacement(tag) {
  return tag != "firstName" && tag != "lastName"
}

function arrayUnique(array) {
  const a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1)
    }
  }

  return a
}

function formatVariableTags(tagKeys, tagObject) {
  const allTagObject = []
  tagKeys.forEach(tagKey => {
    if (tagObject[tagKey]) {
      allTagObject.push(tagObject[tagKey])
    } else {
      allTagObject.push({
        tag: tagKey,
        description: "Custom variable will use the value provided under this name in a csv file",
      })
    }
  })
  return allTagObject
}

function getDecimalCount(value) {
  if (!value) return 0
  if (Math.floor(value) === value) return 0
  return value.toString().split(".")[1].length || 0
}
