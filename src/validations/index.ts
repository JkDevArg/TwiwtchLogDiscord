export function validateParams(params: any){
    if(!params.active){
        return 'Los parametros son obligatorios'
    }
    for (const param of params.params) {
        const paramName = Object.keys(param)[0];
        const paramType = param[paramName];
        const paramValue = param.date;
        if (typeof paramValue !== paramType) {
          return `El parametro '${paramName}' debe ser de tipo ${paramType}`;
        }
        return true;
    }
}