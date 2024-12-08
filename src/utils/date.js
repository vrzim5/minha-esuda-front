// Cria função para formatar data
export const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
// Cria função para validar email
export const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/; 
    if (!regex.test(email)) {
      return false; 
    }
    return email.endsWith("@esuda.edu.br");
  };