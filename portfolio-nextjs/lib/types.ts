// Repositório GitHub (resposta da API)
export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  owner: {
    login: string;
  };
}

// Mídia extraída do README
export interface RepoMedia {
  url: string;
  type: 'image' | 'video';
}

// Mensagem do chatbot
export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
}

// Resposta do chatbot backend
export interface ChatbotResponse {
  response: string;
}

// Dados do clima (OpenWeather API)
export interface WeatherAPIResponse {
  cod: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  message?: string;
}

// Dados de câmbio (AwesomeAPI)
export interface CurrencyPair {
  code: string;
  bid: string;
  varBid: string;
}

export interface CurrencyAPIResponse {
  USDBRL: CurrencyPair;
  EURBRL: CurrencyPair;
}

// Idioma suportado
export type SupportedLanguage = 'pt' | 'en' | 'es';

// Resposta da API MyMemory
export interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
}
