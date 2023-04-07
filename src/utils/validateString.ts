async function validateString(param: string){
    const urlRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi;
    if (urlRegex.test(param)) {
        return 'No se permiten URLs en el string';
    }
    return null;
}

export { validateString };