export default function translateDate(dataString: string) {
    // Cria um objeto de data a partir da string
    const data = new Date(dataString);
  
    // Configuração das opções para a formatação em português

  
    // Cria um objeto de formatação de data em português
    const formatadorData = new Intl.DateTimeFormat('pt-BR');
  
    // Formata a data e retorna a string formatada
    return formatadorData.format(data);
  }
  