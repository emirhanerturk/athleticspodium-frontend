
export function GenerateQuerySring(object: Object){

  return Object.keys(object).filter(key => object[key] !== undefined).map(key => key + '=' + object[key]).join('&');

}
