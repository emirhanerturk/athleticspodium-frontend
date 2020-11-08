
export function GenerateQueryString(queries: Object): string {

  if (queries){
    return Object.keys(queries).filter(key => queries[key] !== undefined).map(key => key + '=' + queries[key]).join('&');
  } else {
    return '';
  }
  
}

export function ArrayPaginate(array: any[], pageSize: number, page: number): any[] {

  return array.slice((page - 1) * pageSize, page * pageSize);

}

export function WindowScroll(top: number = 0): void {

  window.scroll({
    top: top, 
    left: 0, 
    behavior: 'smooth'
  });

}

export function StripHtmlTags(value: string): string {

  return value.replace(/(<([^>]+)>)/ig,"");

}
