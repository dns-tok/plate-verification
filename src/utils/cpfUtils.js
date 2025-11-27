// Função para aplicar máscara de CPF (formato: 999.999.999-99)
export const applyCpfMask = (value) => {
  // Remove tudo que não é número
  const onlyNumbers = value.replace(/\D/g, '');
  
  // Limita a 11 números
  const limited = onlyNumbers.slice(0, 11);
  
  // Aplica a máscara
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
  }
};

// Função para remover a máscara e retornar apenas números
export const removeCpfMask = (value) => {
  return value.replace(/\D/g, '');
};

// Função para validar CPF
export const validateCpf = (cpf) => {
  const cleanCpf = removeCpfMask(cpf);
  
  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) return false;
  
  // Verifica se todos os números são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  // Validação dos dígitos verificadores
  let sum = 0;
  let remainder;
  
  // Primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(9, 10))) return false;
  
  // Segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(10, 11))) return false;
  
  return true;
};