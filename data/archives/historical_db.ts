
import { DailyHistoryEvent } from "../../types";

const ANCIENT_EVENTS: DailyHistoryEvent[] = [
    { year: "3200 BCE", event: "Unification of Upper and Lower Egypt", location: "Egypt", description: "Narmer unifies the kingdoms, establishing the First Dynasty." },
    { year: "2600 BCE", event: "Construction of the Great Pyramid", location: "Giza", description: "Khufu commissions the massive structure." },
    { year: "1754 BCE", event: "Code of Hammurabi", location: "Babylon", description: "King Hammurabi enacts one of the earliest legal codes." },
    { year: "1274 BCE", event: "Battle of Kadesh", location: "Syria", description: "Ramses II fights the Hittites in the largest chariot battle ever." },
    { year: "776 BCE", event: "First Olympic Games", location: "Greece", description: "Held in Olympia, marking a calendar epoch." },
    { year: "753 BCE", event: "Founding of Rome", location: "Italy", description: "Legendary founding by Romulus." },
    { year: "509 BCE", event: "Roman Republic Established", location: "Rome", description: "Expulsion of the last king, Tarquin the Proud." },
    { year: "490 BCE", event: "Battle of Marathon", location: "Greece", description: "Athenians defeat the first Persian invasion." },
    { year: "323 BCE", event: "Death of Alexander the Great", location: "Babylon", description: "Triggering the Wars of the Diadochi." },
    { year: "221 BCE", event: "Qin Unification", location: "China", description: "Qin Shi Huang becomes the first Emperor of a unified China." },
    { year: "44 BCE", event: "Assassination of Julius Caesar", location: "Rome", description: "Senators stab the Dictator Perpetuo on the Ides of March." },
    { year: "27 BCE", event: "Rise of Augustus", location: "Rome", description: "The Roman Empire officially begins." }
];

const MEDIEVAL_EVENTS: DailyHistoryEvent[] = [
    { year: "476", event: "Fall of Western Rome", location: "Ravenna", description: "Odoacer deposes Romulus Augustulus." },
    { year: "622", event: "The Hijra", location: "Arabia", description: "Muhammad migrates from Mecca to Medina." },
    { year: "732", event: "Battle of Tours", location: "France", description: "Charles Martel halts the Umayyad advance into Europe." },
    { year: "800", event: "Charlemagne Crowned", location: "Rome", description: "Crowned Emperor of the Romans by Pope Leo III." },
    { year: "1066", event: "Battle of Hastings", location: "England", description: "William the Conqueror defeats Harold Godwinson." },
    { year: "1095", event: "Council of Clermont", location: "France", description: "Pope Urban II calls for the First Crusade." },
    { year: "1215", event: "Magna Carta", location: "England", description: "King John agrees to limit royal power." },
    { year: "1453", event: "Fall of Constantinople", location: "Turkey", description: "The Ottoman Empire captures the Byzantine capital." }
];

const MODERN_EVENTS: DailyHistoryEvent[] = [
    { year: "1517", event: "95 Theses", location: "Germany", description: "Martin Luther sparks the Protestant Reformation." },
    { year: "1648", event: "Peace of Westphalia", location: "Europe", description: "Ending the Thirty Years' War and establishing state sovereignty." },
    { year: "1776", event: "Declaration of Independence", location: "USA", description: "Thirteen colonies declare separation from Britain." },
    { year: "1789", event: "Storming of the Bastille", location: "France", description: "Beginning of the French Revolution." },
    { year: "1815", event: "Battle of Waterloo", location: "Belgium", description: "Napoleon's final defeat." },
    { year: "1914", event: "Assassination of Archduke Franz Ferdinand", location: "Sarajevo", description: "Triggering World War I." },
    { year: "1945", event: "Founding of the UN", location: "USA", description: "Replacing the League of Nations." },
    { year: "1969", event: "Apollo 11 Landing", location: "Moon", description: "Neil Armstrong walks on the Moon." },
    { year: "1989", event: "Fall of the Berlin Wall", location: "Germany", description: "Symbolizing the end of the Cold War." },
    { year: "1991", event: "Dissolution of the USSR", location: "Russia", description: "The Soviet Union formally ceases to exist." },
    { year: "2001", event: "September 11 Attacks", location: "USA", description: "Terrorist attacks trigger the War on Terror." },
    { year: "2008", event: "Global Financial Crisis", location: "Global", description: "Collapse of Lehman Brothers triggers recession." },
    { year: "2011", event: "Arab Spring", location: "Middle East", description: "Wave of protests and revolutions across the region." },
    { year: "2016", event: "Brexit Vote", location: "UK", description: "UK votes to leave the European Union." },
    { year: "2020", event: "COVID-19 Pandemic Declared", location: "Global", description: "WHO declares global pandemic." },
    { year: "2022", event: "Invasion of Ukraine", location: "Ukraine", description: "Russia launches full-scale invasion." },
    { year: "2024", event: "Global Election Super-Year", location: "Global", description: "Historic number of voters head to polls worldwide." }
];

export const getMassiveArchive = (): DailyHistoryEvent[] => {
    return [...ANCIENT_EVENTS, ...MEDIEVAL_EVENTS, ...MODERN_EVENTS];
};
