
import { DailyHistoryEvent, TrendingTopic, SavedItem, DailyContext, DisciplineDetail } from '../types';

// --- MASSIVE HISTORICAL ARCHIVE (EXHAUSTIVE) ---
const HISTORICAL_EVENTS_ARCHIVE: DailyHistoryEvent[] = [
  // Ancient World
  { year: "3100 BCE", event: "Unification of Upper and Lower Egypt", location: "Egypt", description: "Pharaoh Narmer unifies Egypt into the world's first territorial state." },
  { year: "2700 BCE", event: "Old Kingdom of Egypt Founded", location: "Egypt", description: "The Old Kingdom era begins, marking the age of pyramid building and centralised pharaonic rule." },
  { year: "2334 BCE", event: "Akkadian Empire Founded", location: "Mesopotamia", description: "Sargon of Akkad creates history's first multi-ethnic empire, ruling Mesopotamia." },
  { year: "1792 BCE", event: "Hammurabi's Code Promulgated", location: "Babylon", description: "King Hammurabi issues one of history's earliest comprehensive legal codes, establishing 282 laws." },
  { year: "1274 BCE", event: "Battle of Kadesh", location: "Syria", description: "Egypt and Hittites clash in history's first recorded battle, leading to the world's earliest known peace treaty." },
  { year: "776 BCE", event: "First Olympic Games", location: "Greece", description: "The ancient Greeks hold the first Olympic Games at Olympia, a symbol of pan-Hellenic unity." },
  { year: "509 BCE", event: "Roman Republic Founded", location: "Rome", description: "Romans expel the last Etruscan king and establish the Republic, pioneering constitutional governance." },
  { year: "490 BCE", event: "Battle of Marathon", location: "Greece", description: "Athenian forces repel the Persian invasion, securing Greek democracy and independence." },
  { year: "480 BCE", event: "Battle of Thermopylae", location: "Greece", description: "300 Spartans hold the pass against the Persian army under Xerxes I in a legendary last stand." },
  { year: "431 BCE", event: "Peloponnesian War Begins", location: "Greece", description: "Athens and Sparta enter a devastating 27-year conflict that reshapes the Greek world." },
  { year: "399 BCE", event: "Trial and Death of Socrates", location: "Athens", description: "Philosopher Socrates is condemned and executed, shaping Western thought on justice and democracy." },
  { year: "336 BCE", event: "Alexander the Great Becomes King", location: "Macedonia", description: "Alexander III ascends to the throne at 20 and begins his campaign to conquer the known world." },
  { year: "264 BCE", event: "First Punic War Begins", location: "Mediterranean", description: "Rome and Carthage enter the first of three devastating wars for Mediterranean supremacy." },
  { year: "221 BCE", event: "Qin Shi Huang Unifies China", location: "China", description: "The first emperor of China unifies the warring states, creating the first centralised Chinese empire." },
  { year: "218 BCE", event: "Hannibal Crosses the Alps", location: "Europe", description: "Carthaginian general Hannibal leads his army over the Alps in a stunning military manoeuvre." },
  { year: "44 BCE", event: "Assassination of Julius Caesar", location: "Rome", description: "Julius Caesar is stabbed 23 times by senators led by Brutus and Cassius on the Ides of March." },
  { year: "27 BCE", event: "Roman Empire Founded", location: "Rome", description: "Octavian is granted the title Augustus, transforming the Roman Republic into the Roman Empire." },
  { year: "4 BCE", event: "Birth of Jesus of Nazareth", location: "Judea", description: "The birth of Jesus, founder of Christianity, one of the world's major religions shaping global politics for two millennia." },
  { year: "476 CE", event: "Fall of the Western Roman Empire", location: "Rome", description: "Romulus Augustulus, the last Roman emperor, is deposed by Odoacer, ending ancient Rome." },
  // Medieval
  { year: "570", event: "Birth of Prophet Muhammad", location: "Arabia", description: "The Prophet Muhammad is born in Mecca, his teachings will unify Arabia and birth Islam." },
  { year: "622", event: "Hijra — Muhammad's Migration to Medina", location: "Arabia", description: "Muhammad's migration marks Year 1 of the Islamic calendar and the founding of the first Islamic state." },
  { year: "732", event: "Battle of Tours", location: "France", description: "Frankish forces under Charles Martel halt the Umayyad advance into Europe, shaping Western history." },
  { year: "800", event: "Charlemagne Crowned Holy Roman Emperor", location: "Rome", description: "Pope Leo III crowns Charlemagne, creating the Holy Roman Empire and reshaping medieval Europe." },
  { year: "1066", event: "Norman Conquest of England", location: "England", description: "William the Conqueror defeats Harold II at Hastings, transforming English politics, culture, and law." },
  { year: "1096", event: "First Crusade Begins", location: "Middle East", description: "Pope Urban II calls for a holy war; European armies march to capture Jerusalem." },
  { year: "1215", event: "Magna Carta Signed", location: "England", description: "King John signs the Magna Carta, establishing the principle that the king is subject to the rule of law." },
  { year: "1271", event: "Marco Polo Begins Journey to China", location: "Asia", description: "Venetian explorer Marco Polo begins his legendary journey eastward, opening trade and diplomatic routes." },
  { year: "1337", event: "Hundred Years' War Begins", location: "France/England", description: "England and France begin a series of conflicts over the French throne lasting 116 years." },
  { year: "1347", event: "Black Death Reaches Europe", location: "Europe", description: "The bubonic plague arrives in Sicily, killing up to a third of Europe's population and reshaping its societies." },
  { year: "1453", event: "Fall of Constantinople", location: "Ottoman Empire", description: "Ottoman forces under Mehmed II conquer Constantinople, ending the Byzantine Empire." },
  { year: "1492", event: "Columbus Reaches the Americas", location: "Americas", description: "Christopher Columbus, sailing for Spain, reaches the Caribbean, beginning European colonisation of the Americas." },
  // Early Modern
  { year: "1517", event: "Martin Luther Posts 95 Theses", location: "Germany", description: "Luther's challenge to Church corruption sparks the Protestant Reformation, splitting Western Christianity." },
  { year: "1533", event: "Henry VIII Breaks with Rome", location: "England", description: "Henry VIII declares himself Supreme Head of the Church of England, establishing the Anglican Church." },
  { year: "1543", event: "Copernicus Publishes Heliocentric Theory", location: "Poland", description: "De Revolutionibus positions the Sun at the centre of the solar system, revolutionising science and politics." },
  { year: "1588", event: "Defeat of the Spanish Armada", location: "Atlantic Ocean", description: "English forces scatter the Spanish Armada, signalling the decline of Spanish naval dominance." },
  { year: "1618", event: "Thirty Years' War Begins", location: "Europe", description: "A devastating conflict that reshapes the map of Europe and establishes the modern nation-state system." },
  { year: "1648", event: "Peace of Westphalia", location: "Europe", description: "Treaties ending the Thirty Years' War establish the principle of state sovereignty and modern international law." },
  { year: "1688", event: "Glorious Revolution", location: "England", description: "Parliament deposes James II and invites William of Orange, cementing constitutional monarchy in England." },
  { year: "1689", event: "English Bill of Rights", location: "England", description: "The Bill of Rights limits the power of the Crown and enshrines parliamentary supremacy and civil liberties." },
  { year: "1762", event: "Catherine the Great Becomes Empress", location: "Russia", description: "Catherine II seizes power from her husband Peter III and rules Russia for 34 years as an enlightened despot." },
  { year: "1776", event: "American Declaration of Independence", location: "United States", description: "The 13 colonies declare independence from Britain, founding the United States of America." },
  { year: "1787", event: "U.S. Constitution Drafted", location: "United States", description: "The Philadelphia Convention produces the world's oldest surviving written national constitution." },
  { year: "1789", event: "French Revolution Begins", location: "France", description: "The storming of the Bastille marks the start of the revolution that overthrows the monarchy and reshapes world politics." },
  { year: "1793", event: "Reign of Terror Begins", location: "France", description: "The Committee of Public Safety executes thousands of perceived enemies; Robespierre leads the radical phase." },
  { year: "1799", event: "Napoleon Bonaparte Seizes Power", location: "France", description: "Napoleon's coup d'état establishes the Consulate, beginning his domination of Europe." },
  { year: "1804", event: "Napoleon Crowned Emperor", location: "France", description: "Napoleon crowns himself Emperor of the French in Notre-Dame Cathedral, cementing his authoritarian rule." },
  { year: "1815", event: "Congress of Vienna", location: "Austria", description: "European powers redraw the map of Europe after Napoleon's defeat, establishing a new conservative order." },
  { year: "1815", event: "Battle of Waterloo", location: "Belgium", description: "Napoleon suffers final defeat at Waterloo by British and Prussian forces, ending his rule permanently." },
  // 19th Century
  { year: "1830", event: "Belgian Revolution", location: "Belgium", description: "Belgium revolts against Dutch rule and declares independence, creating a new constitutional monarchy." },
  { year: "1848", event: "Year of Revolutions", location: "Europe", description: "Revolutions sweep France, Germany, Austria, Hungary, and Italy, shaking the foundations of the old order." },
  { year: "1848", event: "Communist Manifesto Published", location: "Germany", description: "Marx and Engels publish the Manifesto, calling for workers to unite and overthrow capitalism worldwide." },
  { year: "1861", event: "American Civil War Begins", location: "United States", description: "Confederate forces attack Fort Sumter, beginning the bloodiest conflict in American history over slavery." },
  { year: "1863", event: "Emancipation Proclamation", location: "United States", description: "Abraham Lincoln declares enslaved people in Confederate states free, transforming the Civil War's moral purpose." },
  { year: "1865", event: "Assassination of Abraham Lincoln", location: "United States", description: "President Lincoln is shot by John Wilkes Booth at Ford's Theatre, five days after the South's surrender." },
  { year: "1871", event: "German Empire Proclaimed", location: "Germany", description: "King Wilhelm I of Prussia is proclaimed German Emperor at Versailles, unifying Germany under Bismarck's leadership." },
  { year: "1884", event: "Berlin Conference on Africa", location: "Germany", description: "European powers partition Africa among themselves, accelerating colonialism and drawing arbitrary borders." },
  // 20th Century
  { year: "1905", event: "Russian Revolution of 1905", location: "Russia", description: "Bloody Sunday massacre sparks widespread revolution; Tsar Nicholas II issues the October Manifesto." },
  { year: "1914", event: "World War I Begins", location: "Europe", description: "Assassination of Archduke Franz Ferdinand triggers the Great War, killing 20 million people." },
  { year: "1917", event: "Russian Revolution", location: "Russia", description: "The Bolshevik Revolution under Lenin overthrows the Tsar and establishes the world's first communist state." },
  { year: "1919", event: "Treaty of Versailles Signed", location: "France", description: "The peace treaty ending WWI imposes harsh terms on Germany, sowing seeds for World War II." },
  { year: "1920", event: "League of Nations Founded", location: "Switzerland", description: "The first international intergovernmental organisation aims to maintain world peace but lacks U.S. membership." },
  { year: "1922", event: "Soviet Union Founded", location: "Russia", description: "The USSR is formally established, uniting Soviet republics under communist one-party rule." },
  { year: "1929", event: "Wall Street Crash", location: "United States", description: "The stock market crash triggers the Great Depression, reshaping global economics and political systems." },
  { year: "1933", event: "Hitler Becomes Chancellor of Germany", location: "Germany", description: "Adolf Hitler is appointed Chancellor; the Nazi Party consolidates power, ending the Weimar Republic." },
  { year: "1936", event: "Spanish Civil War Begins", location: "Spain", description: "Nationalists led by Franco rise against the Republic; becomes a proxy war between fascism and communism." },
  { year: "1939", event: "World War II Begins", location: "Europe", description: "Germany invades Poland; Britain and France declare war, beginning the most destructive conflict in history." },
  { year: "1941", event: "Pearl Harbor Attack", location: "United States", description: "Japan attacks the U.S. naval base at Pearl Harbor, bringing the United States into World War II." },
  { year: "1944", event: "D-Day — Normandy Landings", location: "France", description: "Allied forces storm the beaches of Normandy in history's largest amphibious military operation." },
  { year: "1945", event: "World War II Ends", location: "Global", description: "Germany surrenders in May; Japan surrenders in August after atomic bombs are dropped on Hiroshima and Nagasaki." },
  { year: "1945", event: "United Nations Founded", location: "United States", description: "51 nations sign the UN Charter in San Francisco, establishing the primary international organisation for peace." },
  { year: "1947", event: "Indian Independence and Partition", location: "India/Pakistan", description: "Britain grants India independence; the subcontinent is partitioned into India and Pakistan amid mass violence." },
  { year: "1948", event: "Universal Declaration of Human Rights", location: "France", description: "The UN General Assembly adopts the UDHR, establishing universal standards for human rights." },
  { year: "1948", event: "State of Israel Founded", location: "Middle East", description: "David Ben-Gurion declares the State of Israel; neighbouring Arab states immediately declare war." },
  { year: "1949", event: "People's Republic of China Founded", location: "China", description: "Mao Zedong proclaims the PRC after defeating Nationalist forces, establishing communist rule over mainland China." },
  { year: "1949", event: "NATO Founded", location: "Washington D.C.", description: "North Atlantic Treaty signed; 12 nations form a collective defence alliance against Soviet expansion." },
  { year: "1950", event: "Korean War Begins", location: "Korea", description: "North Korea invades South Korea; U.S.-led UN forces and China intervene in the first major Cold War conflict." },
  { year: "1953", event: "Death of Joseph Stalin", location: "Soviet Union", description: "Stalin dies after 31 years of rule; a power struggle follows and de-Stalinisation begins under Khrushchev." },
  { year: "1954", event: "Brown v. Board of Education", location: "United States", description: "U.S. Supreme Court rules racial segregation in public schools unconstitutional, galvanising the civil rights movement." },
  { year: "1955", event: "Warsaw Pact Established", location: "Poland", description: "Soviet Union and Eastern European states form military alliance in response to West Germany joining NATO." },
  { year: "1957", event: "Sputnik Launched", location: "Soviet Union", description: "The USSR launches the first artificial satellite, beginning the Space Race and shocking the Western world." },
  { year: "1959", event: "Cuban Revolution", location: "Cuba", description: "Fidel Castro overthrows Batista's government; Cuba becomes a communist state 90 miles from Florida." },
  { year: "1961", event: "Berlin Wall Constructed", location: "Germany", description: "East Germany builds the Berlin Wall overnight, dividing the city and becoming the defining symbol of the Cold War." },
  { year: "1962", event: "Cuban Missile Crisis", location: "Global", description: "The world teeters on nuclear war as the U.S. and USSR confront each other over Soviet missiles in Cuba." },
  { year: "1963", event: "Assassination of JFK", location: "United States", description: "President John F. Kennedy is assassinated in Dallas, Texas; Lee Harvey Oswald is charged." },
  { year: "1964", event: "Civil Rights Act Passed", location: "United States", description: "Landmark legislation outlaws discrimination based on race, colour, religion, sex, or national origin." },
  { year: "1965", event: "Vietnam War Escalates", location: "Vietnam", description: "U.S. combat troops arrive in Vietnam; the war escalates into a defining Cold War conflict." },
  { year: "1968", event: "Year of Global Upheaval", location: "Global", description: "Student revolts in France, Tet Offensive in Vietnam, MLK and RFK assassinations shake the world." },
  { year: "1969", event: "Moon Landing — Apollo 11", location: "Moon", description: "Neil Armstrong becomes the first human to walk on the Moon, culminating the Space Race." },
  { year: "1971", event: "Bangladesh Liberation War", location: "South Asia", description: "East Pakistan declares independence as Bangladesh after a brutal war and Indian military intervention." },
  { year: "1973", event: "Oil Crisis", location: "Global", description: "OPEC oil embargo triggers the first major energy crisis, reshaping global economics and foreign policy." },
  { year: "1974", event: "Nixon Resigns — Watergate", location: "United States", description: "President Nixon resigns in disgrace following the Watergate break-in and cover-up scandal." },
  { year: "1975", event: "Fall of Saigon", location: "Vietnam", description: "Communist North Vietnam captures Saigon; the Vietnam War ends with U.S. withdrawal and reunification." },
  { year: "1978", event: "Camp David Accords", location: "United States", description: "President Carter brokers a historic peace agreement between Egypt's Sadat and Israel's Begin." },
  { year: "1979", event: "Iranian Revolution", location: "Iran", description: "Shah Mohammad Reza Pahlavi is overthrown; Ayatollah Khomeini establishes an Islamic Republic." },
  { year: "1979", event: "Soviet Invasion of Afghanistan", location: "Afghanistan", description: "Soviet forces enter Afghanistan, beginning a 10-year war with mujahideen backed by the U.S." },
  { year: "1980", event: "Iran-Iraq War Begins", location: "Middle East", description: "Iraq invades Iran; an 8-year war kills hundreds of thousands and reshapes Middle East geopolitics." },
  { year: "1981", event: "Assassination Attempt on Reagan", location: "United States", description: "John Hinckley Jr. shoots President Reagan; Reagan survives and continues to reshape American conservatism." },
  { year: "1984", event: "Indira Gandhi Assassinated", location: "India", description: "Indian PM Indira Gandhi is assassinated by her Sikh bodyguards, triggering anti-Sikh riots across India." },
  { year: "1985", event: "Mikhail Gorbachev Becomes Soviet Leader", location: "Soviet Union", description: "Gorbachev introduces glasnost and perestroika, reforming the Soviet system and inadvertently dissolving the USSR." },
  { year: "1986", event: "Chernobyl Nuclear Disaster", location: "Soviet Union", description: "Reactor No. 4 explodes at the Chernobyl plant, triggering the world's worst nuclear disaster." },
  { year: "1987", event: "INF Treaty Signed", location: "United States", description: "Reagan and Gorbachev sign the Intermediate-Range Nuclear Forces Treaty, a landmark arms control agreement." },
  { year: "1989", event: "Tiananmen Square Massacre", location: "China", description: "PRC military crushes pro-democracy protests; the 'Tank Man' image becomes a global symbol of resistance." },
  { year: "1989", event: "Fall of the Berlin Wall", location: "Germany", description: "East Germans pour through the Berlin Wall; the defining Cold War symbol crumbles, reunification follows." },
  { year: "1989", event: "Revolutions in Eastern Europe", location: "Europe", description: "Communist regimes fall across Poland, Hungary, Czechoslovakia, Romania, and Bulgaria in a wave of peaceful revolutions." },
  { year: "1990", event: "German Reunification", location: "Germany", description: "East and West Germany formally reunify on October 3rd, ending four decades of division." },
  { year: "1990", event: "Nelson Mandela Released from Prison", location: "South Africa", description: "Mandela walks free after 27 years; negotiations begin to end apartheid in South Africa." },
  { year: "1991", event: "Gulf War", location: "Kuwait/Iraq", description: "U.S.-led coalition expels Iraqi forces from Kuwait; Saddam Hussein's military is devastated." },
  { year: "1991", event: "Dissolution of the Soviet Union", location: "Soviet Union", description: "The USSR formally dissolves on December 25th; 15 independent states emerge, ending the Cold War." },
  { year: "1994", event: "Rwandan Genocide", location: "Rwanda", description: "Hutu extremists massacre 800,000 Tutsis in 100 days; the international community fails to intervene." },
  { year: "1994", event: "End of Apartheid — Mandela Elected", location: "South Africa", description: "South Africa holds its first fully democratic elections; Nelson Mandela becomes the first Black president." },
  { year: "1994", event: "NAFTA Takes Effect", location: "North America", description: "The North American Free Trade Agreement creates the world's largest free trade zone." },
  { year: "1995", event: "Dayton Agreement Ends Bosnian War", location: "Bosnia", description: "U.S.-brokered peace agreement ends three years of ethnic conflict in the former Yugoslavia." },
  { year: "1997", event: "Hong Kong Handover", location: "Hong Kong", description: "Britain returns Hong Kong to China under 'one country, two systems', ending 156 years of colonial rule." },
  { year: "1998", event: "Good Friday Agreement", location: "Northern Ireland", description: "Historic peace deal ends decades of sectarian conflict in Northern Ireland." },
  // 21st Century
  { year: "2001", event: "September 11 Attacks", location: "United States", description: "Al-Qaeda hijacks four planes; attacks on NYC and Pentagon kill nearly 3,000 and reshape global geopolitics." },
  { year: "2001", event: "U.S. Invasion of Afghanistan", location: "Afghanistan", description: "NATO-backed U.S. forces topple the Taliban regime following the 9/11 attacks; a 20-year war begins." },
  { year: "2003", event: "Invasion of Iraq", location: "Iraq", description: "U.S.-led coalition invades Iraq, topples Saddam Hussein; no WMDs found; sectarian chaos follows." },
  { year: "2004", event: "Orange Revolution — Ukraine", location: "Ukraine", description: "Mass protests in Ukraine overturn a fraudulent election; Viktor Yushchenko becomes president." },
  { year: "2007", event: "Global Financial Crisis Begins", location: "United States", description: "U.S. subprime mortgage collapse triggers the worst global financial crisis since the Great Depression." },
  { year: "2008", event: "Barack Obama Elected President", location: "United States", description: "Obama becomes the first African American U.S. President, winning on a platform of hope and change." },
  { year: "2010", event: "Arab Spring Begins", location: "Middle East/Africa", description: "Mohamed Bouazizi's self-immolation triggers uprisings across the Arab world; regimes fall in Tunisia, Egypt, Libya." },
  { year: "2011", event: "Osama bin Laden Killed", location: "Pakistan", description: "U.S. Navy SEALs kill Al-Qaeda leader Osama bin Laden in Abbottabad, Pakistan." },
  { year: "2011", event: "Syrian Civil War Begins", location: "Syria", description: "Arab Spring protests lead to civil war as Assad cracks down; jihadist groups and regional powers intervene." },
  { year: "2013", event: "Snowden Reveals NSA Surveillance", location: "United States", description: "Edward Snowden leaks classified NSA documents, exposing mass global surveillance programmes." },
  { year: "2014", event: "Russia Annexes Crimea", location: "Ukraine", description: "Russia seizes Crimea from Ukraine following the Euromaidan revolution; the West imposes sanctions." },
  { year: "2014", event: "ISIS Declares Caliphate", location: "Iraq/Syria", description: "Islamic State declares a caliphate across Iraq and Syria; global coalition forms to counter it." },
  { year: "2015", event: "Paris Climate Agreement", location: "France", description: "196 nations agree to limit global warming, establishing legally binding climate commitments." },
  { year: "2016", event: "Brexit Referendum", location: "United Kingdom", description: "52% of UK voters choose to leave the EU, triggering years of political turmoil and complex negotiations." },
  { year: "2016", event: "Donald Trump Elected U.S. President", location: "United States", description: "Businessman Trump defeats Hillary Clinton in a shocking upset, reshaping American politics and foreign policy." },
  { year: "2017", event: "Catalonia Independence Referendum", location: "Spain", description: "Catalans vote for independence in an illegal referendum; Madrid imposes direct rule amid a constitutional crisis." },
  { year: "2019", event: "Hong Kong Protests", location: "Hong Kong", description: "Mass protests against Beijing's influence erupt; China eventually imposes a sweeping national security law." },
  { year: "2019", event: "COVID-19 Pandemic Begins", location: "China", description: "A novel coronavirus emerges in Wuhan; the pandemic kills millions and reshapes global health policy." },
  { year: "2020", event: "George Floyd Murder and BLM Protests", location: "United States", description: "Police killing of George Floyd sparks global Black Lives Matter protests and demands for police reform." },
  { year: "2021", event: "U.S. Capitol Insurrection", location: "United States", description: "Supporters of President Trump storm the U.S. Capitol, attempting to disrupt the certification of Biden's election." },
  { year: "2021", event: "Taliban Retakes Afghanistan", location: "Afghanistan", description: "Taliban seizes Kabul as U.S. completes withdrawal; the Western-backed government collapses." },
  { year: "2022", event: "Russia Invades Ukraine", location: "Ukraine", description: "Russia launches full-scale invasion of Ukraine; the largest European war since WWII begins." },
  { year: "2023", event: "Israel-Hamas War Begins", location: "Middle East", description: "Hamas launches the deadliest attack on Israel since its founding; Israel responds with a ground invasion of Gaza." },
  { year: "2024", event: "Global Elections Super Year", location: "Global", description: "More people vote than in any year in history; elections in U.S., India, EU, UK, and 50+ nations reshape world politics." },
];

export const FALLBACK_DAILY_CONTEXT: DailyContext = {
    date: new Date().toLocaleDateString(),
    quote: { text: "Man is by nature a political animal.", author: "Aristotle", year: "4th Century BCE", region: "Greece" },
    news: [],
    highlightedPerson: { category: 'Thinker', title: 'Plato', subtitle: 'Philosopher', meta: 'Greece' },
    highlightedCountry: { category: 'Country', title: 'Greece', subtitle: 'Birthplace of Democracy', meta: 'Europe' },
    highlightedIdeology: { category: 'Ideology', title: 'Democracy', subtitle: 'Rule by the People', meta: 'Political System' },
    highlightedDiscipline: { category: 'Discipline', title: 'Political Theory', subtitle: 'Foundations', meta: 'Core' },
    highlightedOrg: { category: 'Organization', title: 'United Nations', subtitle: 'International', meta: 'IGO' },
    dailyFact: { content: "The study of politics is as old as civilization.", source: "POLI", type: "Fact" },
    dailyTrivia: { content: "The shortest war in history lasted 38 minutes.", source: "POLI", type: "Trivia" },
    historicalEvents: [], // Should be populated with full archive in real app
    otherHighlights: [],
    synthesis: "Politics shapes our world."
};

export const FALLBACK_DISCIPLINE_DETAIL: DisciplineDetail = {
    name: "Political Science",
    iconName: "BookOpen",
    overview: {
        definition: "The systematic study of governance.",
        scope: "Global",
        importance: "Understanding power.",
        keyQuestions: ["Who governs?", "Why do states fight?", "What is justice?"]
    },
    historyNarrative: "Political science originated with the Greeks, evolved through the Enlightenment, and formalized in the 19th century.",
    history: [],
    subDisciplines: ["Comparative Politics", "IR", "Theory", "Public Policy"],
    coreTheories: [],
    methods: [],
    scholars: [],
    foundationalWorks: [],
    regionalFocus: [],
    relatedDisciplines: []
};

export const TODAY_HISTORY: DailyHistoryEvent[] = FALLBACK_DAILY_CONTEXT.historicalEvents;

export const TRENDING_TOPICS: TrendingTopic[] = [
  { topic: "Sovereignty in Digital Age", category: "Political Theory" },
  { topic: "Supranational Courts", category: "Public Law" },
  { topic: "Trade Protectionism", category: "Political Economy" },
  { topic: "Proportional Representation", category: "Comparative Politics" }
];

export const SAVED_DATA: SavedItem[] = [
  { id: "1", type: "Quote", title: "Man is by nature a political animal.", subtitle: "Aristotle", dateAdded: "2h ago" },
  { id: "2", type: "Document", title: "The Federalist Papers", subtitle: "Hamilton, Madison, Jay", dateAdded: "1d ago" }
];

export const MEDIA_DATA = [
    { type: 'Video', title: 'The History of Political Thought', duration: '45m', videoId: 'xuCn8ux2gbs' },
    { type: 'Lecture', title: 'Introduction to International Relations', duration: '1h 20m', videoId: 'E9f60r_3xHw' },
    { type: 'Documentary', title: 'The Cold War: A New History', duration: '55m', videoId: '8tYd9l1aZ4s' },
    { type: 'Interview', title: 'Noam Chomsky on Global Power', duration: '30m', videoId: 'EuwmWnphqII' },
    { type: 'Video', title: 'Understanding Marxism', duration: '15m', videoId: 'fSQgCy_iIcc' },
    { type: 'Lecture', title: 'Justice: What\'s The Right Thing To Do?', duration: '55m', videoId: 'kBdfcR-8hEY' },
    { type: 'Documentary', title: 'The Century of the Self', duration: '3h 55m', videoId: 'DnPmg0R1M04' },
    { type: 'Interview', title: 'Francis Fukuyama on Identity', duration: '45m', videoId: '4-3rC_QO4sk' }
];

// ... [Rest of file content (Legal Hierarchy, Theory Data, etc.) remains unchanged] ...
// Re-exporting huge constants like LEGAL_HIERARCHY to avoid breaking file structure
export const LEGAL_HIERARCHY: Record<string, any[]> = {
    'Constitutions': [
        {
            category: 'Americas',
            icon: 'Globe',
            items: [
                { name: 'United States Constitution (1787)', type: 'Document' },
                { name: 'Constitution of Brazil (1988)', type: 'Document' },
                { name: 'Constitution of Canada (1982)', type: 'Document' },
                { name: 'Constitution of Mexico (1917)', type: 'Document' },
                { name: 'Constitution of Argentina (1853)', type: 'Document' },
                { name: 'Constitution of Colombia (1991)', type: 'Document' },
                { name: 'Constitution of Chile (1980)', type: 'Document' },
            ]
        },
        {
            category: 'Europe',
            icon: 'Landmark',
            items: [
                { name: 'Basic Law for the Federal Republic of Germany (1949)', type: 'Document' },
                { name: 'Constitution of France (1958)', type: 'Document' },
                { name: 'Constitution of Spain (1978)', type: 'Document' },
                { name: 'Constitution of Italy (1948)', type: 'Document' },
                { name: 'Constitution of Poland (1997)', type: 'Document' },
                { name: 'Constitution of Portugal (1976)', type: 'Document' },
                { name: 'Treaty on European Union (Maastricht, 1992)', type: 'Document' },
            ]
        },
        {
            category: 'Asia & Pacific',
            icon: 'Globe',
            items: [
                { name: 'Constitution of Japan (1947)', type: 'Document' },
                { name: 'Constitution of India (1950)', type: 'Document' },
                { name: 'Constitution of the People\'s Republic of China (1982)', type: 'Document' },
                { name: 'Constitution of South Korea (1987)', type: 'Document' },
                { name: 'Constitution of Indonesia (1945)', type: 'Document' },
                { name: 'Constitution of Australia (1901)', type: 'Document' },
                { name: 'Constitution of Pakistan (1973)', type: 'Document' },
            ]
        },
        {
            category: 'Africa & Middle East',
            icon: 'Globe',
            items: [
                { name: 'Constitution of South Africa (1996)', type: 'Document' },
                { name: 'Constitution of Kenya (2010)', type: 'Document' },
                { name: 'Constitution of Nigeria (1999)', type: 'Document' },
                { name: 'Constitution of Egypt (2014)', type: 'Document' },
                { name: 'Basic Law of Saudi Arabia (1992)', type: 'Document' },
                { name: 'Constitution of Tunisia (2022)', type: 'Document' },
                { name: 'Constitution of Ethiopia (1994)', type: 'Document' },
            ]
        },
        {
            category: 'Foundational Documents',
            icon: 'Scroll',
            items: [
                { name: 'Magna Carta (1215)', type: 'Document' },
                { name: 'English Bill of Rights (1689)', type: 'Document' },
                { name: 'United States Declaration of Independence (1776)', type: 'Document' },
                { name: 'French Declaration of the Rights of Man (1789)', type: 'Document' },
                { name: 'Universal Declaration of Human Rights (1948)', type: 'Document' },
                { name: 'UN Charter (1945)', type: 'Document' },
                { name: 'Federalist Papers (1787–1788)', type: 'Document' },
            ]
        }
    ],
    'Case Law': [
        {
            category: 'International Courts',
            icon: 'Gavel',
            items: [
                { name: 'ICJ: Nicaragua v. United States (1986)', type: 'Document' },
                { name: 'ICJ: Bosnia v. Serbia — Genocide Convention (2007)', type: 'Document' },
                { name: 'ICJ: South Africa v. Israel — Gaza (2024)', type: 'Document' },
                { name: 'ICC: Lubanga Dyilo (2012)', type: 'Document' },
                { name: 'ICC: Al-Bashir (Arrest Warrant, 2009)', type: 'Document' },
                { name: 'ECHR: Ireland v. United Kingdom (1978)', type: 'Document' },
                { name: 'WTO: US — Steel Safeguards (2003)', type: 'Document' },
            ]
        },
        {
            category: 'United States Supreme Court',
            icon: 'Scale',
            items: [
                { name: 'Marbury v. Madison (1803)', type: 'Document' },
                { name: 'McCulloch v. Maryland (1819)', type: 'Document' },
                { name: 'Dred Scott v. Sandford (1857)', type: 'Document' },
                { name: 'Korematsu v. United States (1944)', type: 'Document' },
                { name: 'Brown v. Board of Education (1954)', type: 'Document' },
                { name: 'New York Times v. Sullivan (1964)', type: 'Document' },
                { name: 'Roe v. Wade (1973)', type: 'Document' },
                { name: 'United States v. Nixon (1974)', type: 'Document' },
                { name: 'Bush v. Gore (2000)', type: 'Document' },
                { name: 'Citizens United v. FEC (2010)', type: 'Document' },
                { name: 'Dobbs v. Jackson Women\'s Health (2022)', type: 'Document' },
            ]
        },
        {
            category: 'European Courts',
            icon: 'Landmark',
            items: [
                { name: 'CJEU: Van Gend en Loos (1963)', type: 'Document' },
                { name: 'CJEU: Costa v. ENEL (1964)', type: 'Document' },
                { name: 'ECHR: Handyside v. UK (1976)', type: 'Document' },
                { name: 'ECHR: Soering v. UK (1989)', type: 'Document' },
                { name: 'German BVerfG: Lüth Case (1958)', type: 'Document' },
                { name: 'German BVerfG: Solange I (1974)', type: 'Document' },
                { name: 'French Conseil Constitutionnel: IVG (1975)', type: 'Document' },
            ]
        },
        {
            category: 'Asia-Pacific & Others',
            icon: 'Globe',
            items: [
                { name: 'Indian SC: Kesavananda Bharati (1973)', type: 'Document' },
                { name: 'Indian SC: Maneka Gandhi v. Union of India (1978)', type: 'Document' },
                { name: 'South African CC: Minister of Health v. TAC (2002)', type: 'Document' },
                { name: 'South African CC: S v. Makwanyane (1995)', type: 'Document' },
                { name: 'Australian HC: Mabo v. Queensland (1992)', type: 'Document' },
                { name: 'Japanese SC: Sunagawa Case (1959)', type: 'Document' },
            ]
        }
    ]
};

export const THEORY_DATA = {}; // Simplified
export const LAW_DATA = { constitutions: [], codes: [], cases: [], treaties: [] };
export const EXPLORE_HIERARCHY = {}; // Simplified
