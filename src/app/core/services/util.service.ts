
export function GenerateQuerySring(queries: Object){

  if (queries){
    return Object.keys(queries).filter(key => queries[key] !== undefined).map(key => key + '=' + queries[key]).join('&');
  } else {
    return '';
  }
  
}
