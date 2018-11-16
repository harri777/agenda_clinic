export const cep = number => {
    if (!number) return '';
    let newNumber = number.replace(/\D/g, '');
    newNumber = newNumber.substring(0, 8);
    
      newNumber = newNumber.replace(/^(\d{5})(\d)/,"$1-$2")
  
    return newNumber;
  };
  
  export const phone = number => {
    if (!number) return '';
    let newNumber = number.replace(/\D/g, '');
    newNumber = newNumber.substring(0, 10);
  
    newNumber = newNumber.replace(/^(\d{2})(\d)/g, "($1) $2");
    newNumber = newNumber.replace(/(\d)(\d{4})$/, "$1-$2");
  
    return newNumber;
  };

  export const mobilePhone = number => {
    if (!number) return '';
    let newNumber = number.replace(/\D/g, '');
    newNumber = newNumber.substring(0, 11);
  
    newNumber = newNumber.replace(/^(\d{2})(\d)/g, "($1) $2");
    newNumber = newNumber.replace(/(\d)(\d{4})$/, "$1-$2");
  
    return newNumber;
  };
  
  export const removeNotNumber = value => value.replace(/\D/g, '');
  