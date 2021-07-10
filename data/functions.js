export const hasOccurrence = (searchIndex, query) =>{
  const queryParts = query.toLowerCase().split(' ')
  if(queryParts.length > 0){
    return queryParts.map(
      x => searchIndex.indexOf(x) > -1)
      .reduce((prev, curr) => prev && curr
      )
  }

  return true
}
