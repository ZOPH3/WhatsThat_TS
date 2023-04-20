/**
 * Used to replace {value} with value given in {valueName: value}
 * @param templateString 
 * @param obj 
 * @returns 
 */
export default function StringBuilder(templateString : string, obj : any){
    let s = templateString;

    for (const prop in obj) {

      s = s.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
    }
    
    return s;
  }
