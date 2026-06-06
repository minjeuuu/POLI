
import { Quote } from '../types';

export const POLITICAL_QUOTES: Quote[] = [
  // Ancient and Classical
  { text: "Man is by nature a political animal.", author: "Aristotle", year: "4th Century BCE", region: "Greece" },
  { text: "The ruler must rule by virtue.", author: "Confucius", year: "5th Century BCE", region: "China" },
  { text: "Justice is harmony.", author: "Plato", year: "4th Century BCE", region: "Greece" },
  { text: "Government rests on moral force.", author: "Mencius", year: "4th Century BCE", region: "China" },
  { text: "Power comes from organization.", author: "Kautilya", year: "3rd Century BCE", region: "India" },
  { text: "Law restrains the strong.", author: "Cicero", year: "1st Century BCE", region: "Roman Republic" },
  { text: "Authority requires wisdom.", author: "Han Feizi", year: "3rd Century BCE", region: "China" },
  { text: "The state exists to prevent chaos.", author: "Xunzi", year: "3rd Century BCE", region: "China" },

  // Islamic and Middle Eastern
  { text: "Injustice ruins civilization.", author: "Ibn Khaldun", year: "1377", region: "Tunisia" },
  { text: "Leadership is a trust.", author: "Al-Mawardi", year: "11th Century", region: "Iraq" },
  { text: "Power without justice collapses.", author: "Al-Farabi", year: "10th Century", region: "Central Asia" },
  { text: "The state depends on solidarity.", author: "Ibn Khaldun", year: "1377", region: "Tunisia" },

  // European Political Traditions
  { text: "Where there is no law, there is no freedom.", author: "John Locke", year: "1690", region: "England" },
  { text: "Power tends to corrupt.", author: "Lord Acton", year: "1887", region: "United Kingdom" },
  { text: "Politics has its own logic.", author: "Niccolò Machiavelli", year: "1513", region: "Italy" },
  { text: "Liberty requires limits.", author: "Montesquieu", year: "1748", region: "France" },
  { text: "The state claims the monopoly of force.", author: "Max Weber", year: "1919", region: "Germany" },
  { text: "Democracy is learned by doing.", author: "Alexis de Tocqueville", year: "1835", region: "France" },
  { text: "Justice without force is powerless.", author: "Blaise Pascal", year: "1670", region: "France" },
  { text: "Politics is the art of the possible.", author: "Otto von Bismarck", year: "1867", region: "Prussia" },

  // Marxist and Critical Traditions
  { text: "The state reflects class relations.", author: "Karl Marx", year: "1848", region: "Germany" },
  { text: "Hegemony produces consent.", author: "Antonio Gramsci", year: "1930s", region: "Italy" },
  { text: "Politics is structured conflict.", author: "Nicos Poulantzas", year: "1978", region: "Greece" },
  { text: "Power works through discourse.", author: "Michel Foucault", year: "1975", region: "France" },

  // Liberal Democratic Traditions
  { text: "Representation refines public views.", author: "James Madison", year: "1787", region: "United States" },
  { text: "Democracy requires opposition.", author: "Robert Dahl", year: "1971", region: "United States" },
  { text: "Participation strengthens democracy.", author: "Sidney Verba", year: "1995", region: "United States" },
  { text: "Institutions matter.", author: "Douglass North", year: "1990", region: "United States" },

  // African Political Thought
  { text: "Freedom is responsibility.", author: "Kwame Nkrumah", year: "1961", region: "Ghana" },
  { text: "The state must serve the people.", author: "Julius Nyerere", year: "1967", region: "Tanzania" },
  { text: "Colonial borders shaped politics.", author: "Ali Mazrui", year: "1986", region: "Kenya" },
  { text: "Unity precedes development.", author: "Amílcar Cabral", year: "1970", region: "Guinea-Bissau" },
  { text: "To be free is not merely to cast off one's chains.", author: "Nelson Mandela", year: "1994", region: "South Africa" },

  // Asian and Southeast Asian
  { text: "Discipline precedes democracy.", author: "Lee Kuan Yew", year: "1960s", region: "Singapore" },
  { text: "The people are the foundation of the state.", author: "Sun Tzu", year: "5th Century BCE", region: "China" },
  { text: "Nationalism creates solidarity.", author: "Rabindranath Tagore", year: "1917", region: "India" },
  { text: "Democracy must fit culture.", author: "Benedict Anderson", year: "1983", region: "Thailand" },
  { text: "In the happiness of his subjects lies his happiness.", author: "Kautilya", year: "c. 300 BCE", region: "India" },

  // Latin American Traditions
  { text: "Democracy is built, not inherited.", author: "Fernando Henrique Cardoso", year: "1990s", region: "Brazil" },
  { text: "Power must be accountable.", author: "Guillermo O’Donnell", year: "1998", region: "Argentina" },
  { text: "Institutions limit authoritarianism.", author: "Juan Linz", year: "1978", region: "Spain/Global" },

  // Feminist and Postcolonial
  { text: "The personal is political.", author: "Carol Hanisch", year: "1969", region: "United States" },
  { text: "Politics shapes identity.", author: "Chantal Mouffe", year: "2000", region: "Belgium" },
  { text: "Colonialism reshaped governance.", author: "Frantz Fanon", year: "1961", region: "Algeria" },
];

export const getRandomQuote = (excludeIndices: number[] = []): { quote: Quote, index: number } => {
  let availableIndices = POLITICAL_QUOTES.map((_, i) => i).filter(i => !excludeIndices.includes(i));
  
  if (availableIndices.length === 0) {
      availableIndices = POLITICAL_QUOTES.map((_, i) => i);
  }
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { quote: POLITICAL_QUOTES[randomIndex], index: randomIndex };
};
