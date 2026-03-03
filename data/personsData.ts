
import { PersonNode, PersonCategory } from '../types';

// --- DATA HELPERS ---
const createPerson = (name: string, role: string, country: string, era: string): PersonNode => ({
    name, role, country, era, type: "Person"
});

const createFolder = (name: string, items: PersonNode[]): PersonNode => ({
    name, type: "Folder", items
});

const createCountry = (name: string, currentLeaders: {n:string, r:string}[], history: {n:string, r:string, e:string}[] = []): PersonNode => ({
    name,
    type: "Folder",
    country: name,
    items: [
        {
            name: "Current Leadership",
            type: "Folder",
            items: currentLeaders.map(l => createPerson(l.n, l.r, name, "Modern"))
        },
        {
            name: "Historical Figures",
            type: "Folder",
            items: history.map(h => createPerson(h.n, h.r, name, h.e))
        }
    ]
});

// --- REAL WORLD HIERARCHY ---
export const PERSONS_HIERARCHY: PersonNode[] = [
    {
        name: "World Leaders (By Region)",
        type: "Folder",
        items: [
            {
                name: "Africa",
                type: "Folder",
                items: [
                    {
                        name: "Northern Africa",
                        type: "Folder",
                        items: [
                            createCountry("Algeria", [{n:"Abdelmadjid Tebboune", r:"President"}, {n:"Nadir Larbaoui", r:"PM"}], [{n:"Ahmed Ben Bella", r:"President", e:"1960s"}, {n:"Houari Boumediene", r:"President", e:"1970s"}]),
                            createCountry("Egypt", [{n:"Abdel Fattah el-Sisi", r:"President"}, {n:"Mostafa Madbouly", r:"PM"}], [{n:"Gamal Abdel Nasser", r:"President", e:"1950s"}, {n:"Anwar Sadat", r:"President", e:"1970s"}, {n:"Hosni Mubarak", r:"President", e:"1980s-2000s"}, {n:"Cleopatra VII", r:"Pharaoh", e:"Ancient"}, {n:"Ramses II", r:"Pharaoh", e:"Ancient"}]),
                            createCountry("Libya", [{n:"Mohamed al-Menfi", r:"Chairman"}, {n:"Abdul Hamid Dbeibeh", r:"PM"}], [{n:"Muammar Gaddafi", r:"Brotherly Leader", e:"1969-2011"}, {n:"King Idris I", r:"King", e:"1950s"}]),
                            createCountry("Morocco", [{n:"Mohammed VI", r:"King"}, {n:"Aziz Akhannouch", r:"PM"}], [{n:"Hassan II", r:"King", e:"1960s-90s"}, {n:"Ismail Ibn Sharif", r:"Sultan", e:"17th Century"}]),
                            createCountry("Sudan", [{n:"Abdel Fattah al-Burhan", r:"Chairman"}], [{n:"Omar al-Bashir", r:"President", e:"1989-2019"}, {n:"Gaafar Nimeiry", r:"President", e:"1970s"}]),
                            createCountry("Tunisia", [{n:"Kais Saied", r:"President"}, {n:"Ahmed Hachani", r:"PM"}], [{n:"Habib Bourguiba", r:"President", e:"Independence"}, {n:"Zine El Abidine Ben Ali", r:"President", e:"1987-2011"}])
                        ]
                    },
                    {
                        name: "Western Africa",
                        type: "Folder",
                        items: [
                            createCountry("Benin", [{n:"Patrice Talon", r:"President"}]),
                            createCountry("Burkina Faso", [{n:"Ibrahim Traoré", r:"Interim President"}], [{n:"Thomas Sankara", r:"President", e:"1980s"}, {n:"Blaise Compaoré", r:"President", e:"1987-2014"}]),
                            createCountry("Cape Verde", [{n:"José Maria Neves", r:"President"}]),
                            createCountry("Côte d'Ivoire", [{n:"Alassane Ouattara", r:"President"}], [{n:"Félix Houphouët-Boigny", r:"President", e:"Independence"}]),
                            createCountry("Gambia", [{n:"Adama Barrow", r:"President"}], [{n:"Yahya Jammeh", r:"President", e:"1994-2017"}]),
                            createCountry("Ghana", [{n:"Nana Akufo-Addo", r:"President"}], [{n:"Kwame Nkrumah", r:"President", e:"Independence"}, {n:"Jerry Rawlings", r:"President", e:"1980s-90s"}]),
                            createCountry("Guinea", [{n:"Mamady Doumbouya", r:"Interim President"}], [{n:"Ahmed Sékou Touré", r:"President", e:"Independence"}]),
                            createCountry("Guinea-Bissau", [{n:"Umaro Sissoco Embaló", r:"President"}]),
                            createCountry("Liberia", [{n:"Joseph Boakai", r:"President"}], [{n:"Ellen Johnson Sirleaf", r:"President", e:"2000s"}, {n:"Charles Taylor", r:"President", e:"1990s"}]),
                            createCountry("Mali", [{n:"Assimi Goïta", r:"Interim President"}], [{n:"Mansa Musa", r:"Emperor", e:"Medieval"}, {n:"Modibo Keïta", r:"President", e:"Independence"}]),
                            createCountry("Mauritania", [{n:"Mohamed Ould Ghazouani", r:"President"}]),
                            createCountry("Niger", [{n:"Abdourahamane Tchiani", r:"President of CNSP"}]),
                            createCountry("Nigeria", [{n:"Bola Tinubu", r:"President"}], [{n:"Muhammadu Buhari", r:"President", e:"2010s"}, {n:"Goodluck Jonathan", r:"President", e:"2010s"}, {n:"Olusegun Obasanjo", r:"President", e:"2000s"}, {n:"Nnamdi Azikiwe", r:"President", e:"Independence"}]),
                            createCountry("Senegal", [{n:"Bassirou Diomaye Faye", r:"President"}, {n:"Ousmane Sonko", r:"PM"}], [{n:"Léopold Sédar Senghor", r:"President", e:"Independence"}, {n:"Macky Sall", r:"President", e:"2010s"}]),
                            createCountry("Sierra Leone", [{n:"Julius Maada Bio", r:"President"}]),
                            createCountry("Togo", [{n:"Faure Gnassingbé", r:"President"}])
                        ]
                    },
                    {
                        name: "Central Africa",
                        type: "Folder",
                        items: [
                            createCountry("Angola", [{n:"João Lourenço", r:"President"}], [{n:"José Eduardo dos Santos", r:"President", e:"1979-2017"}, {n:"Agostinho Neto", r:"President", e:"Independence"}]),
                            createCountry("Cameroon", [{n:"Paul Biya", r:"President"}]),
                            createCountry("Central African Republic", [{n:"Faustin-Archange Touadéra", r:"President"}], [{n:"Jean-Bédel Bokassa", r:"Emperor", e:"1970s"}]),
                            createCountry("Chad", [{n:"Mahamat Déby", r:"President"}], [{n:"Idriss Déby", r:"President", e:"1990-2021"}]),
                            createCountry("Congo (Republic)", [{n:"Denis Sassou Nguesso", r:"President"}]),
                            createCountry("DR Congo", [{n:"Félix Tshisekedi", r:"President"}], [{n:"Joseph Kabila", r:"President", e:"2000s"}, {n:"Laurent-Désiré Kabila", r:"President", e:"1990s"}, {n:"Mobutu Sese Seko", r:"President", e:"1965-1997"}, {n:"Patrice Lumumba", r:"PM", e:"Independence"}]),
                            createCountry("Equatorial Guinea", [{n:"Teodoro Obiang Nguema Mbasogo", r:"President"}]),
                            createCountry("Gabon", [{n:"Brice Oligui Nguema", r:"Interim President"}], [{n:"Ali Bongo Ondimba", r:"President", e:"2009-2023"}]),
                            createCountry("São Tomé and Príncipe", [{n:"Carlos Vila Nova", r:"President"}])
                        ]
                    },
                    {
                        name: "Eastern Africa",
                        type: "Folder",
                        items: [
                            createCountry("Burundi", [{n:"Évariste Ndayishimiye", r:"President"}]),
                            createCountry("Comoros", [{n:"Azali Assoumani", r:"President"}]),
                            createCountry("Djibouti", [{n:"Ismaïl Omar Guelleh", r:"President"}]),
                            createCountry("Eritrea", [{n:"Isaias Afwerki", r:"President"}]),
                            createCountry("Ethiopia", [{n:"Sahle-Work Zewde", r:"President"}, {n:"Abiy Ahmed", r:"PM"}], [{n:"Haile Selassie", r:"Emperor", e:"20th Century"}, {n:"Menelik II", r:"Emperor", e:"19th Century"}, {n:"Meles Zenawi", r:"PM", e:"1990s-2000s"}]),
                            createCountry("Kenya", [{n:"William Ruto", r:"President"}], [{n:"Uhuru Kenyatta", r:"President", e:"2010s"}, {n:"Jomo Kenyatta", r:"President", e:"Independence"}, {n:"Daniel arap Moi", r:"President", e:"1978-2002"}]),
                            createCountry("Madagascar", [{n:"Andry Rajoelina", r:"President"}]),
                            createCountry("Malawi", [{n:"Lazarus Chakwera", r:"President"}]),
                            createCountry("Mauritius", [{n:"Prithvirajsing Roopun", r:"President"}]),
                            createCountry("Mozambique", [{n:"Filipe Nyusi", r:"President"}], [{n:"Samora Machel", r:"President", e:"Independence"}]),
                            createCountry("Rwanda", [{n:"Paul Kagame", r:"President"}], [{n:"Juvénal Habyarimana", r:"President", e:"pre-1994"}]),
                            createCountry("Seychelles", [{n:"Wavel Ramkalawan", r:"President"}]),
                            createCountry("Somalia", [{n:"Hassan Sheikh Mohamud", r:"President"}], [{n:"Siad Barre", r:"President", e:"1969-1991"}]),
                            createCountry("South Sudan", [{n:"Salva Kiir Mayardit", r:"President"}]),
                            createCountry("Tanzania", [{n:"Samia Suluhu Hassan", r:"President"}], [{n:"Julius Nyerere", r:"President", e:"Independence"}]),
                            createCountry("Uganda", [{n:"Yoweri Museveni", r:"President"}], [{n:"Idi Amin", r:"President", e:"1970s"}, {n:"Milton Obote", r:"President", e:"1960s/80s"}]),
                            createCountry("Zambia", [{n:"Hakainde Hichilema", r:"President"}], [{n:"Kenneth Kaunda", r:"President", e:"Independence"}]),
                            createCountry("Zimbabwe", [{n:"Emmerson Mnangagwa", r:"President"}], [{n:"Robert Mugabe", r:"President", e:"1980-2017"}, {n:"Joshua Nkomo", r:"VP", e:"Independence"}])
                        ]
                    },
                    {
                        name: "Southern Africa",
                        type: "Folder",
                        items: [
                            createCountry("Botswana", [{n:"Mokgweetsi Masisi", r:"President"}], [{n:"Seretse Khama", r:"President", e:"Independence"}]),
                            createCountry("Eswatini", [{n:"Mswati III", r:"King"}]),
                            createCountry("Lesotho", [{n:"Letsie III", r:"King"}]),
                            createCountry("Namibia", [{n:"Nangolo Mbumba", r:"President"}], [{n:"Sam Nujoma", r:"President", e:"Independence"}]),
                            createCountry("South Africa", [{n:"Cyril Ramaphosa", r:"President"}], [{n:"Nelson Mandela", r:"President", e:"1994-1999"}, {n:"Thabo Mbeki", r:"President", e:"1999-2008"}, {n:"Jacob Zuma", r:"President", e:"2009-2018"}, {n:"F.W. de Klerk", r:"State President", e:"1989-1994"}, {n:"P.W. Botha", r:"State President", e:"1984-1989"}, {n:"Jan Smuts", r:"PM", e:"WWII Era"}, {n:"Shaka Zulu", r:"King", e:"19th Century"}])
                        ]
                    }
                ]
            },
            {
                name: "Americas",
                type: "Folder",
                items: [
                    {
                        name: "North America",
                        type: "Folder",
                        items: [
                            createCountry("Canada", [{n:"Justin Trudeau", r:"PM"}, {n:"Pierre Poilievre", r:"Opposition Leader"}], [{n:"Stephen Harper", r:"PM", e:"2006-2015"}, {n:"Jean Chrétien", r:"PM", e:"1993-2003"}, {n:"Brian Mulroney", r:"PM", e:"1984-1993"}, {n:"Pierre Trudeau", r:"PM", e:"1968-1984"}, {n:"Lester B. Pearson", r:"PM", e:"1963-1968"}, {n:"John A. Macdonald", r:"PM", e:"19th Century"}]),
                            createCountry("Mexico", [{n:"Andrés Manuel López Obrador", r:"President"}, {n:"Claudia Sheinbaum", r:"President-Elect"}], [{n:"Enrique Peña Nieto", r:"President", e:"2012-2018"}, {n:"Felipe Calderón", r:"President", e:"2006-2012"}, {n:"Vicente Fox", r:"President", e:"2000-2006"}, {n:"Lázaro Cárdenas", r:"President", e:"1930s"}, {n:"Porfirio Díaz", r:"President", e:"19th/20th Century"}, {n:"Benito Juárez", r:"President", e:"19th Century"}]),
                            createCountry("United States", [{n:"Joe Biden", r:"President"}, {n:"Kamala Harris", r:"VP"}, {n:"Mike Johnson", r:"Speaker"}, {n:"Antony Blinken", r:"SecState"}], [
                                {n:"Donald Trump", r:"President", e:"2017-2021"}, {n:"Barack Obama", r:"President", e:"2009-2017"}, {n:"George W. Bush", r:"President", e:"2001-2009"}, {n:"Bill Clinton", r:"President", e:"1993-2001"},
                                {n:"Ronald Reagan", r:"President", e:"1981-1989"}, {n:"Jimmy Carter", r:"President", e:"1977-1981"}, {n:"Richard Nixon", r:"President", e:"1969-1974"}, {n:"Lyndon B. Johnson", r:"President", e:"1963-1969"},
                                {n:"John F. Kennedy", r:"President", e:"1961-1963"}, {n:"Dwight D. Eisenhower", r:"President", e:"1953-1961"}, {n:"Harry S. Truman", r:"President", e:"1945-1953"}, {n:"Franklin D. Roosevelt", r:"President", e:"1933-1945"},
                                {n:"Theodore Roosevelt", r:"President", e:"1901-1909"}, {n:"Abraham Lincoln", r:"President", e:"1861-1865"}, {n:"Thomas Jefferson", r:"President", e:"1801-1809"}, {n:"George Washington", r:"President", e:"1789-1797"}
                            ])
                        ]
                    },
                    {
                        name: "Central America",
                        type: "Folder",
                        items: [
                            createCountry("Belize", [{n:"Johnny Briceño", r:"PM"}]),
                            createCountry("Costa Rica", [{n:"Rodrigo Chaves Robles", r:"President"}]),
                            createCountry("El Salvador", [{n:"Nayib Bukele", r:"President"}], [{n:"Óscar Romero", r:"Archbishop", e:"1970s"}]),
                            createCountry("Guatemala", [{n:"Bernardo Arévalo", r:"President"}]),
                            createCountry("Honduras", [{n:"Xiomara Castro", r:"President"}]),
                            createCountry("Nicaragua", [{n:"Daniel Ortega", r:"President"}], [{n:"Anastasio Somoza", r:"Dictator", e:"20th Century"}, {n:"Augusto César Sandino", r:"Revolutionary", e:"1930s"}]),
                            createCountry("Panama", [{n:"Laurentino Cortizo", r:"President"}], [{n:"Manuel Noriega", r:"Dictator", e:"1980s"}])
                        ]
                    },
                    {
                        name: "Caribbean",
                        type: "Folder",
                        items: [
                            createCountry("Antigua and Barbuda", [{n:"Gaston Browne", r:"PM"}]),
                            createCountry("Bahamas", [{n:"Philip Davis", r:"PM"}]),
                            createCountry("Barbados", [{n:"Mia Mottley", r:"PM"}]),
                            createCountry("Cuba", [{n:"Miguel Díaz-Canel", r:"President"}], [{n:"Fidel Castro", r:"President", e:"1959-2008"}, {n:"Raúl Castro", r:"President", e:"2008-2018"}, {n:"Che Guevara", r:"Minister", e:"Revolution"}, {n:"Fulgencio Batista", r:"President", e:"pre-1959"}]),
                            createCountry("Dominican Republic", [{n:"Luis Abinader", r:"President"}], [{n:"Rafael Trujillo", r:"Dictator", e:"1930-1961"}]),
                            createCountry("Grenada", [{n:"Dickon Mitchell", r:"PM"}], [{n:"Maurice Bishop", r:"PM", e:"1979-1983"}]),
                            createCountry("Haiti", [{n:"Edgard Leblanc Fils", r:"CPT President"}], [{n:"Jean-Bertrand Aristide", r:"President", e:"1990s/2000s"}, {n:"François Duvalier", r:"Dictator", e:"1957-1971"}, {n:"Toussaint Louverture", r:"Leader", e:"Revolution"}]),
                            createCountry("Jamaica", [{n:"Andrew Holness", r:"PM"}], [{n:"Michael Manley", r:"PM", e:"1970s"}]),
                            createCountry("Saint Kitts and Nevis", [{n:"Terrance Drew", r:"PM"}]),
                            createCountry("Saint Lucia", [{n:"Philip J. Pierre", r:"PM"}]),
                            createCountry("Saint Vincent and the Grenadines", [{n:"Ralph Gonsalves", r:"PM"}]),
                            createCountry("Trinidad and Tobago", [{n:"Keith Rowley", r:"PM"}, {n:"Christine Kangaloo", r:"President"}], [{n:"Eric Williams", r:"PM", e:"Independence"}])
                        ]
                    },
                    {
                        name: "South America",
                        type: "Folder",
                        items: [
                            createCountry("Argentina", [{n:"Javier Milei", r:"President"}], [{n:"Alberto Fernández", r:"President", e:"2019-2023"}, {n:"Mauricio Macri", r:"President", e:"2015-2019"}, {n:"Cristina Fernández de Kirchner", r:"President", e:"2007-2015"}, {n:"Néstor Kirchner", r:"President", e:"2003-2007"}, {n:"Juan Perón", r:"President", e:"1946-1974"}, {n:"Eva Perón", r:"First Lady", e:"1946-1952"}]),
                            createCountry("Bolivia", [{n:"Luis Arce", r:"President"}], [{n:"Evo Morales", r:"President", e:"2006-2019"}]),
                            createCountry("Brazil", [{n:"Luiz Inácio Lula da Silva", r:"President"}], [{n:"Jair Bolsonaro", r:"President", e:"2019-2022"}, {n:"Dilma Rousseff", r:"President", e:"2011-2016"}, {n:"Fernando Henrique Cardoso", r:"President", e:"1995-2002"}, {n:"Getúlio Vargas", r:"President", e:"20th Century"}, {n:"Pedro II", r:"Emperor", e:"19th Century"}]),
                            createCountry("Chile", [{n:"Gabriel Boric", r:"President"}], [{n:"Sebastián Piñera", r:"President", e:"2010s/20s"}, {n:"Michelle Bachelet", r:"President", e:"2000s/10s"}, {n:"Augusto Pinochet", r:"Dictator", e:"1973-1990"}, {n:"Salvador Allende", r:"President", e:"1970-1973"}]),
                            createCountry("Colombia", [{n:"Gustavo Petro", r:"President"}], [{n:"Iván Duque", r:"President", e:"2018-2022"}, {n:"Juan Manuel Santos", r:"President", e:"2010-2018"}, {n:"Álvaro Uribe", r:"President", e:"2002-2010"}, {n:"Pablo Escobar", r:"Cartel Leader", e:"1980s"}, {n:"Simón Bolívar", r:"Liberator", e:"19th Century"}]),
                            createCountry("Ecuador", [{n:"Daniel Noboa", r:"President"}], [{n:"Rafael Correa", r:"President", e:"2007-2017"}]),
                            createCountry("Guyana", [{n:"Irfaan Ali", r:"President"}]),
                            createCountry("Paraguay", [{n:"Santiago Peña", r:"President"}], [{n:"Alfredo Stroessner", r:"Dictator", e:"1954-1989"}]),
                            createCountry("Peru", [{n:"Dina Boluarte", r:"President"}], [{n:"Pedro Castillo", r:"President", e:"2021-2022"}, {n:"Alberto Fujimori", r:"President", e:"1990-2000"}]),
                            createCountry("Suriname", [{n:"Chan Santokhi", r:"President"}]),
                            createCountry("Uruguay", [{n:"Luis Lacalle Pou", r:"President"}], [{n:"José Mujica", r:"President", e:"2010-2015"}]),
                            createCountry("Venezuela", [{n:"Nicolás Maduro", r:"President"}], [{n:"Hugo Chávez", r:"President", e:"1999-2013"}, {n:"Simón Bolívar", r:"Liberator", e:"19th Century"}])
                        ]
                    }
                ]
            },
            {
                name: "Asia",
                type: "Folder",
                items: [
                    {
                        name: "East Asia",
                        type: "Folder",
                        items: [
                            createCountry("China", [{n:"Xi Jinping", r:"President"}, {n:"Li Qiang", r:"Premier"}], [
                                {n:"Hu Jintao", r:"President", e:"2003-2013"}, {n:"Jiang Zemin", r:"President", e:"1993-2003"}, 
                                {n:"Deng Xiaoping", r:"Paramount Leader", e:"1978-1989"}, {n:"Mao Zedong", r:"Chairman", e:"1949-1976"},
                                {n:"Chiang Kai-shek", r:"President (ROC)", e:"1928-1975"}, {n:"Sun Yat-sen", r:"President", e:"1912"},
                                {n:"Empress Dowager Cixi", r:"Regent", e:"Qing Dynasty"}, {n:"Kangxi Emperor", r:"Emperor", e:"Qing Dynasty"},
                                {n:"Qin Shi Huang", r:"Emperor", e:"Qin Dynasty"}
                            ]),
                            createCountry("Japan", [{n:"Fumio Kishida", r:"PM"}, {n:"Naruhito", r:"Emperor"}], [
                                {n:"Shinzo Abe", r:"PM", e:"2012-2020"}, {n:"Junichiro Koizumi", r:"PM", e:"2001-2006"},
                                {n:"Akihito", r:"Emperor", e:"1989-2019"}, {n:"Hirohito", r:"Emperor", e:"1926-1989"},
                                {n:"Hideki Tojo", r:"PM", e:"WWII"}, {n:"Meiji", r:"Emperor", e:"19th Century"},
                                {n:"Tokugawa Ieyasu", r:"Shogun", e:"Edo Period"}, {n:"Oda Nobunaga", r:"Daimyo", e:"Sengoku Period"}
                            ]),
                            createCountry("Mongolia", [{n:"Ukhnaagiin Khürelsükh", r:"President"}], [{n:"Genghis Khan", r:"Khagan", e:"Medieval"}, {n:"Kublai Khan", r:"Khagan", e:"Medieval"}]),
                            createCountry("North Korea", [{n:"Kim Jong Un", r:"Supreme Leader"}], [{n:"Kim Jong Il", r:"Leader", e:"1994-2011"}, {n:"Kim Il Sung", r:"President", e:"1948-1994"}]),
                            createCountry("South Korea", [{n:"Yoon Suk-yeol", r:"President"}], [{n:"Moon Jae-in", r:"President", e:"2017-2022"}, {n:"Park Geun-hye", r:"President", e:"2013-2017"}, {n:"Kim Dae-jung", r:"President", e:"1998-2003"}, {n:"Park Chung-hee", r:"President", e:"1963-1979"}, {n:"Syngman Rhee", r:"President", e:"1948-1960"}]),
                            createCountry("Taiwan", [{n:"Lai Ching-te", r:"President"}, {n:"Tsai Ing-wen", r:"Former President"}], [{n:"Lee Teng-hui", r:"President", e:"1988-2000"}, {n:"Chiang Ching-kuo", r:"President", e:"1978-1988"}])
                        ]
                    },
                    {
                        name: "Southeast Asia",
                        type: "Folder",
                        items: [
                            createCountry("Brunei", [{n:"Hassanal Bolkiah", r:"Sultan"}]),
                            createCountry("Cambodia", [{n:"Hun Manet", r:"PM"}], [{n:"Hun Sen", r:"PM", e:"1985-2023"}, {n:"Pol Pot", r:"Leader", e:"Khmer Rouge"}, {n:"Norodom Sihanouk", r:"King", e:"20th Century"}]),
                            createCountry("East Timor", [{n:"José Ramos-Horta", r:"President"}, {n:"Xanana Gusmão", r:"PM"}]),
                            createCountry("Indonesia", [{n:"Joko Widodo", r:"President"}, {n:"Prabowo Subianto", r:"President-Elect"}], [{n:"Susilo Bambang Yudhoyono", r:"President", e:"2004-2014"}, {n:"Megawati Sukarnoputri", r:"President", e:"2001-2004"}, {n:"Suharto", r:"President", e:"1967-1998"}, {n:"Sukarno", r:"President", e:"1945-1967"}, {n:"Gajah Mada", r:"Prime Minister", e:"Majapahit"}]),
                            createCountry("Laos", [{n:"Thongloun Sisoulith", r:"President"}]),
                            createCountry("Malaysia", [{n:"Anwar Ibrahim", r:"PM"}, {n:"Ibrahim Iskandar", r:"King"}], [{n:"Mahathir Mohamad", r:"PM", e:"1981-2003/2018-2020"}, {n:"Najib Razak", r:"PM", e:"2009-2018"}]),
                            createCountry("Myanmar", [{n:"Min Aung Hlaing", r:"Chairman"}], [{n:"Aung San Suu Kyi", r:"State Counsellor", e:"2016-2021"}, {n:"Ne Win", r:"Dictator", e:"1962-1988"}]),
                            createCountry("Philippines", [{n:"Ferdinand Marcos Jr.", r:"President"}, {n:"Sara Duterte", r:"VP"}], [
                                {n:"Rodrigo Duterte", r:"President", e:"2016-2022"}, {n:"Benigno Aquino III", r:"President", e:"2010-2016"},
                                {n:"Gloria Macapagal Arroyo", r:"President", e:"2001-2010"}, {n:"Joseph Estrada", r:"President", e:"1998-2001"},
                                {n:"Fidel V. Ramos", r:"President", e:"1992-1998"}, {n:"Corazon Aquino", r:"President", e:"1986-1992"},
                                {n:"Ferdinand Marcos Sr.", r:"President", e:"1965-1986"}, {n:"Ramon Magsaysay", r:"President", e:"1953-1957"},
                                {n:"Manuel L. Quezon", r:"President", e:"Commonwealth"}, {n:"Emilio Aguinaldo", r:"President", e:"First Republic"},
                                {n:"Jose Rizal", r:"National Hero", e:"19th Century"}, {n:"Lapu-Lapu", r:"Datu", e:"16th Century"}
                            ]),
                            createCountry("Singapore", [{n:"Tharman Shanmugaratnam", r:"President"}, {n:"Lawrence Wong", r:"PM"}], [{n:"Lee Hsien Loong", r:"PM", e:"2004-2024"}, {n:"Goh Chok Tong", r:"PM", e:"1990-2004"}, {n:"Lee Kuan Yew", r:"PM", e:"1959-1990"}]),
                            createCountry("Thailand", [{n:"Maha Vajiralongkorn", r:"King"}, {n:"Srettha Thavisin", r:"PM"}], [{n:"Bhumibol Adulyadej", r:"King", e:"1946-2016"}, {n:"Thaksin Shinawatra", r:"PM", e:"2001-2006"}, {n:"Chulalongkorn", r:"King", e:"19th Century"}]),
                            createCountry("Vietnam", [{n:"To Lam", r:"President"}, {n:"Pham Minh Chinh", r:"PM"}], [{n:"Ho Chi Minh", r:"President", e:"1945-1969"}, {n:"Vo Nguyen Giap", r:"General", e:"20th Century"}, {n:"Ngo Dinh Diem", r:"President (South)", e:"1955-1963"}])
                        ]
                    },
                    {
                        name: "South Asia",
                        type: "Folder",
                        items: [
                            createCountry("Afghanistan", [{n:"Hibatullah Akhundzada", r:"Supreme Leader"}], [{n:"Ashraf Ghani", r:"President", e:"2014-2021"}, {n:"Hamid Karzai", r:"President", e:"2001-2014"}, {n:"Mohammad Najibullah", r:"President", e:"1987-1992"}, {n:"Zahir Shah", r:"King", e:"1933-1973"}]),
                            createCountry("Bangladesh", [{n:"Sheikh Hasina", r:"PM"}], [{n:"Sheikh Mujibur Rahman", r:"President", e:"Independence"}, {n:"Ziaur Rahman", r:"President", e:"1977-1981"}]),
                            createCountry("Bhutan", [{n:"Jigme Khesar Namgyel Wangchuck", r:"King"}]),
                            createCountry("India", [{n:"Narendra Modi", r:"PM"}, {n:"Droupadi Murmu", r:"President"}], [
                                {n:"Manmohan Singh", r:"PM", e:"2004-2014"}, {n:"Atal Bihari Vajpayee", r:"PM", e:"1998-2004"},
                                {n:"Rajiv Gandhi", r:"PM", e:"1984-1989"}, {n:"Indira Gandhi", r:"PM", e:"1966-1984"},
                                {n:"Jawaharlal Nehru", r:"PM", e:"1947-1964"}, {n:"Mahatma Gandhi", r:"Leader", e:"Independence"},
                                {n:"B.R. Ambedkar", r:"Minister", e:"Independence"}, {n:"Akbar", r:"Emperor", e:"Mughal"}, {n:"Ashoka", r:"Emperor", e:"Maurya"}
                            ]),
                            createCountry("Maldives", [{n:"Mohamed Muizzu", r:"President"}]),
                            createCountry("Nepal", [{n:"Pushpa Kamal Dahal", r:"PM"}]),
                            createCountry("Pakistan", [{n:"Shehbaz Sharif", r:"PM"}, {n:"Asif Ali Zardari", r:"President"}], [{n:"Imran Khan", r:"PM", e:"2018-2022"}, {n:"Pervez Musharraf", r:"President", e:"2001-2008"}, {n:"Benazir Bhutto", r:"PM", e:"1990s"}, {n:"Zulfikar Ali Bhutto", r:"PM", e:"1970s"}, {n:"Muhammad Ali Jinnah", r:"Governor-General", e:"Independence"}]),
                            createCountry("Sri Lanka", [{n:"Ranil Wickremesinghe", r:"President"}], [{n:"Mahinda Rajapaksa", r:"President", e:"2005-2015"}])
                        ]
                    },
                    {
                        name: "Central Asia",
                        type: "Folder",
                        items: [
                            createCountry("Kazakhstan", [{n:"Kassym-Jomart Tokayev", r:"President"}], [{n:"Nursultan Nazarbayev", r:"President", e:"1991-2019"}]),
                            createCountry("Kyrgyzstan", [{n:"Sadyr Japarov", r:"President"}]),
                            createCountry("Tajikistan", [{n:"Emomali Rahmon", r:"President"}]),
                            createCountry("Turkmenistan", [{n:"Serdar Berdimuhamedow", r:"President"}], [{n:"Gurbanguly Berdimuhamedow", r:"President", e:"2006-2022"}, {n:"Saparmurat Niyazov", r:"President", e:"1991-2006"}]),
                            createCountry("Uzbekistan", [{n:"Shavkat Mirziyoyev", r:"President"}], [{n:"Islam Karimov", r:"President", e:"1991-2016"}, {n:"Timur (Tamerlane)", r:"Emir", e:"Medieval"}])
                        ]
                    },
                    {
                        name: "West Asia (Middle East)",
                        type: "Folder",
                        items: [
                            createCountry("Bahrain", [{n:"Hamad bin Isa Al Khalifa", r:"King"}]),
                            createCountry("Iran", [{n:"Ali Khamenei", r:"Supreme Leader"}], [{n:"Hassan Rouhani", r:"President", e:"2013-2021"}, {n:"Mahmoud Ahmadinejad", r:"President", e:"2005-2013"}, {n:"Ruhollah Khomeini", r:"Supreme Leader", e:"1979-1989"}, {n:"Mohammad Reza Pahlavi", r:"Shah", e:"1941-1979"}, {n:"Mohammad Mossadegh", r:"PM", e:"1950s"}]),
                            createCountry("Iraq", [{n:"Abdul Latif Rashid", r:"President"}, {n:"Mohammed Shia' Al Sudani", r:"PM"}], [{n:"Saddam Hussein", r:"President", e:"1979-2003"}, {n:"Faisal I", r:"King", e:"1920s"}]),
                            createCountry("Israel", [{n:"Benjamin Netanyahu", r:"PM"}, {n:"Isaac Herzog", r:"President"}], [{n:"Yitzhak Rabin", r:"PM", e:"1990s"}, {n:"Menachem Begin", r:"PM", e:"1970s"}, {n:"Golda Meir", r:"PM", e:"1969-1974"}, {n:"David Ben-Gurion", r:"PM", e:"1948-1963"}]),
                            createCountry("Jordan", [{n:"Abdullah II", r:"King"}], [{n:"Hussein", r:"King", e:"1952-1999"}]),
                            createCountry("Kuwait", [{n:"Mishal Al-Ahmad Al-Jaber Al-Sabah", r:"Emir"}]),
                            createCountry("Lebanon", [{n:"Najib Mikati", r:"PM"}]),
                            createCountry("Oman", [{n:"Haitham bin Tariq", r:"Sultan"}], [{n:"Qaboos bin Said", r:"Sultan", e:"1970-2020"}]),
                            createCountry("Palestine", [{n:"Mahmoud Abbas", r:"President"}], [{n:"Yasser Arafat", r:"Chairman", e:"1969-2004"}]),
                            createCountry("Qatar", [{n:"Tamim bin Hamad Al Thani", r:"Emir"}]),
                            createCountry("Saudi Arabia", [{n:"Salman", r:"King"}, {n:"Mohammed bin Salman", r:"Crown Prince"}], [{n:"Abdullah", r:"King", e:"2005-2015"}, {n:"Faisal", r:"King", e:"1964-1975"}, {n:"Ibn Saud", r:"King", e:"1932-1953"}]),
                            createCountry("Syria", [{n:"Bashar al-Assad", r:"President"}], [{n:"Hafez al-Assad", r:"President", e:"1971-2000"}]),
                            createCountry("Turkey", [{n:"Recep Tayyip Erdoğan", r:"President"}], [{n:"Mustafa Kemal Atatürk", r:"President", e:"1923-1938"}, {n:"Suleiman the Magnificent", r:"Sultan", e:"Ottoman"}]),
                            createCountry("UAE", [{n:"Mohamed bin Zayed Al Nahyan", r:"President"}], [{n:"Zayed bin Sultan Al Nahyan", r:"President", e:"1971-2004"}]),
                            createCountry("Yemen", [{n:"Rashad al-Alimi", r:"Chairman"}], [{n:"Ali Abdullah Saleh", r:"President", e:"1990-2012"}])
                        ]
                    }
                ]
            },
            {
                name: "Europe",
                type: "Folder",
                items: [
                    {
                        name: "Western Europe",
                        type: "Folder",
                        items: [
                            createCountry("Austria", [{n:"Karl Nehammer", r:"Chancellor"}]),
                            createCountry("Belgium", [{n:"Alexander De Croo", r:"PM"}, {n:"Philippe", r:"King"}]),
                            createCountry("France", [{n:"Emmanuel Macron", r:"President"}, {n:"Gabriel Attal", r:"PM"}], [
                                {n:"François Hollande", r:"President", e:"2012-2017"}, {n:"Nicolas Sarkozy", r:"President", e:"2007-2012"},
                                {n:"Jacques Chirac", r:"President", e:"1995-2007"}, {n:"François Mitterrand", r:"President", e:"1981-1995"},
                                {n:"Charles de Gaulle", r:"President", e:"1959-1969"}, {n:"Napoleon Bonaparte", r:"Emperor", e:"19th Century"},
                                {n:"Louis XIV", r:"King", e:"17th Century"}
                            ]),
                            createCountry("Germany", [{n:"Olaf Scholz", r:"Chancellor"}, {n:"Frank-Walter Steinmeier", r:"President"}], [
                                {n:"Angela Merkel", r:"Chancellor", e:"2005-2021"}, {n:"Gerhard Schröder", r:"Chancellor", e:"1998-2005"},
                                {n:"Helmut Kohl", r:"Chancellor", e:"1982-1998"}, {n:"Willy Brandt", r:"Chancellor", e:"1969-1974"},
                                {n:"Konrad Adenauer", r:"Chancellor", e:"1949-1963"}, {n:"Adolf Hitler", r:"Fuhrer", e:"1933-1945"},
                                {n:"Otto von Bismarck", r:"Chancellor", e:"19th Century"}, {n:"Frederick the Great", r:"King", e:"18th Century"}
                            ]),
                            createCountry("Netherlands", [{n:"Mark Rutte", r:"PM"}, {n:"Willem-Alexander", r:"King"}]),
                            createCountry("Switzerland", [{n:"Federal Council", r:"Collective Head"}])
                        ]
                    },
                    {
                        name: "Eastern Europe",
                        type: "Folder",
                        items: [
                            createCountry("Belarus", [{n:"Alexander Lukashenko", r:"President"}]),
                            createCountry("Hungary", [{n:"Viktor Orbán", r:"PM"}]),
                            createCountry("Poland", [{n:"Andrzej Duda", r:"President"}, {n:"Donald Tusk", r:"PM"}], [{n:"Lech Wałęsa", r:"President", e:"1990-1995"}, {n:"Józef Piłsudski", r:"Marshal", e:"1920s"}]),
                            createCountry("Romania", [{n:"Klaus Iohannis", r:"President"}], [{n:"Nicolae Ceaușescu", r:"President", e:"1965-1989"}]),
                            createCountry("Russia", [{n:"Vladimir Putin", r:"President"}, {n:"Mikhail Mishustin", r:"PM"}], [
                                {n:"Dmitry Medvedev", r:"President", e:"2008-2012"}, {n:"Boris Yeltsin", r:"President", e:"1991-1999"},
                                {n:"Mikhail Gorbachev", r:"President", e:"USSR"}, {n:"Leonid Brezhnev", r:"Gen Sec", e:"USSR"},
                                {n:"Nikita Khrushchev", r:"First Sec", e:"USSR"}, {n:"Joseph Stalin", r:"Gen Sec", e:"USSR"},
                                {n:"Vladimir Lenin", r:"Chairman", e:"USSR"}, {n:"Nicholas II", r:"Tsar", e:"Imperial"},
                                {n:"Peter the Great", r:"Emperor", e:"Imperial"}, {n:"Catherine the Great", r:"Empress", e:"Imperial"}
                            ]),
                            createCountry("Ukraine", [{n:"Volodymyr Zelenskyy", r:"President"}], [{n:"Petro Poroshenko", r:"President", e:"2014-2019"}, {n:"Viktor Yanukovych", r:"President", e:"2010-2014"}, {n:"Leonid Kravchuk", r:"President", e:"1991-1994"}])
                        ]
                    },
                    {
                        name: "Northern Europe",
                        type: "Folder",
                        items: [
                            createCountry("Denmark", [{n:"Mette Frederiksen", r:"PM"}]),
                            createCountry("Finland", [{n:"Alexander Stubb", r:"President"}]),
                            createCountry("Iceland", [{n:"Bjarni Benediktsson", r:"PM"}]),
                            createCountry("Ireland", [{n:"Simon Harris", r:"Taoiseach"}]),
                            createCountry("Norway", [{n:"Jonas Gahr Støre", r:"PM"}]),
                            createCountry("Sweden", [{n:"Ulf Kristersson", r:"PM"}]),
                            createCountry("United Kingdom", [{n:"Rishi Sunak", r:"PM"}, {n:"Keir Starmer", r:"Opposition Leader"}, {n:"Charles III", r:"King"}], [
                                {n:"Elizabeth II", r:"Queen", e:"1952-2022"}, {n:"Boris Johnson", r:"PM", e:"2019-2022"},
                                {n:"Theresa May", r:"PM", e:"2016-2019"}, {n:"David Cameron", r:"PM", e:"2010-2016"},
                                {n:"Tony Blair", r:"PM", e:"1997-2007"}, {n:"Margaret Thatcher", r:"PM", e:"1979-1990"},
                                {n:"Winston Churchill", r:"PM", e:"1940-1945/1951-1955"}, {n:"Clement Attlee", r:"PM", e:"1945-1951"},
                                {n:"Neville Chamberlain", r:"PM", e:"1937-1940"}, {n:"Queen Victoria", r:"Queen", e:"19th Century"}
                            ])
                        ]
                    },
                    {
                        name: "Southern Europe",
                        type: "Folder",
                        items: [
                            createCountry("Greece", [{n:"Kyriakos Mitsotakis", r:"PM"}], [{n:"Pericles", r:"Statesman", e:"Ancient"}, {n:"Eleftherios Venizelos", r:"PM", e:"20th Century"}]),
                            createCountry("Italy", [{n:"Giorgia Meloni", r:"PM"}, {n:"Sergio Mattarella", r:"President"}], [{n:"Silvio Berlusconi", r:"PM", e:"1994-2011"}, {n:"Benito Mussolini", r:"PM", e:"1922-1943"}, {n:"Giuseppe Garibaldi", r:"General", e:"19th Century"}, {n:"Julius Caesar", r:"Dictator", e:"Rome"}, {n:"Augustus", r:"Emperor", e:"Rome"}]),
                            createCountry("Portugal", [{n:"Luís Montenegro", r:"PM"}]),
                            createCountry("Spain", [{n:"Pedro Sánchez", r:"PM"}, {n:"Felipe VI", r:"King"}], [{n:"Francisco Franco", r:"Dictator", e:"1939-1975"}, {n:"Isabella I", r:"Queen", e:"15th Century"}]),
                            createCountry("Vatican City", [{n:"Pope Francis", r:"Pope"}], [{n:"Benedict XVI", r:"Pope", e:"2005-2013"}, {n:"John Paul II", r:"Pope", e:"1978-2005"}])
                        ]
                    }
                ]
            },
            {
                name: "Oceania",
                type: "Folder",
                items: [
                    createCountry("Australia", [{n:"Anthony Albanese", r:"PM"}], [{n:"Scott Morrison", r:"PM", e:"2018-2022"}, {n:"John Howard", r:"PM", e:"1996-2007"}, {n:"Bob Hawke", r:"PM", e:"1983-1991"}, {n:"Robert Menzies", r:"PM", e:"20th Century"}]),
                    createCountry("New Zealand", [{n:"Christopher Luxon", r:"PM"}], [{n:"Jacinda Ardern", r:"PM", e:"2017-2023"}]),
                    createCountry("Fiji", [{n:"Sitiveni Rabuka", r:"PM"}]),
                    createCountry("Papua New Guinea", [{n:"James Marape", r:"PM"}])
                ]
            }
        ]
    },
    {
        name: "Political Scientists & Philosophers",
        type: "Folder",
        items: [
            {
                name: "Ancient & Classical",
                type: "Folder",
                items: [
                    { name: "Plato", role: "Philosopher", country: "Greece", era: "Ancient", type: "Person" },
                    { name: "Aristotle", role: "Philosopher", country: "Greece", era: "Ancient", type: "Person" },
                    { name: "Thucydides", role: "Historian", country: "Greece", era: "Ancient", type: "Person" },
                    { name: "Confucius", role: "Philosopher", country: "China", era: "Ancient", type: "Person" },
                    { name: "Sun Tzu", role: "Strategist", country: "China", era: "Ancient", type: "Person" },
                    { name: "Mencius", role: "Philosopher", country: "China", era: "Ancient", type: "Person" },
                    { name: "Han Feizi", role: "Legalist", country: "China", era: "Ancient", type: "Person" },
                    { name: "Cicero", role: "Statesman", country: "Rome", era: "Ancient", type: "Person" },
                    { name: "Marcus Aurelius", role: "Emperor", country: "Rome", era: "Ancient", type: "Person" },
                    { name: "Kautilya", role: "Philosopher", country: "India", era: "Ancient", type: "Person" }
                ]
            },
            {
                name: "Medieval & Renaissance",
                type: "Folder",
                items: [
                    { name: "Niccolò Machiavelli", role: "Diplomat", country: "Italy", era: "Renaissance", type: "Person" },
                    { name: "Thomas Aquinas", role: "Theologian", country: "Italy", era: "Medieval", type: "Person" },
                    { name: "Ibn Khaldun", role: "Historian", country: "Tunisia", era: "Medieval", type: "Person" },
                    { name: "Al-Farabi", role: "Philosopher", country: "Central Asia", era: "Medieval", type: "Person" },
                    { name: "Marsilius of Padua", role: "Scholar", country: "Italy", era: "Medieval", type: "Person" },
                    { name: "Jean Bodin", role: "Jurist", country: "France", era: "Renaissance", type: "Person" },
                    { name: "Thomas More", role: "Philosopher", country: "England", era: "Renaissance", type: "Person" }
                ]
            },
            {
                name: "Enlightenment",
                type: "Folder",
                items: [
                    { name: "Thomas Hobbes", role: "Philosopher", country: "UK", era: "17th Century", type: "Person" },
                    { name: "John Locke", role: "Philosopher", country: "UK", era: "17th Century", type: "Person" },
                    { name: "Jean-Jacques Rousseau", role: "Philosopher", country: "France", era: "18th Century", type: "Person" },
                    { name: "Montesquieu", role: "Philosopher", country: "France", era: "18th Century", type: "Person" },
                    { name: "Voltaire", role: "Philosopher", country: "France", era: "18th Century", type: "Person" },
                    { name: "Immanuel Kant", role: "Philosopher", country: "Germany", era: "18th Century", type: "Person" },
                    { name: "Adam Smith", role: "Economist", country: "Scotland", era: "18th Century", type: "Person" },
                    { name: "Edmund Burke", role: "Philosopher", country: "Ireland/UK", era: "18th Century", type: "Person" },
                    { name: "Mary Wollstonecraft", role: "Philosopher", country: "UK", era: "18th Century", type: "Person" },
                    { name: "Thomas Paine", role: "Revolutionary", country: "USA/UK", era: "18th Century", type: "Person" }
                ]
            },
            {
                name: "Modern (19th-20th Century)",
                type: "Folder",
                items: [
                    { name: "Karl Marx", role: "Theorist", country: "Germany", era: "19th Century", type: "Person" },
                    { name: "Friedrich Engels", role: "Theorist", country: "Germany", era: "19th Century", type: "Person" },
                    { name: "John Stuart Mill", role: "Philosopher", country: "UK", era: "19th Century", type: "Person" },
                    { name: "Alexis de Tocqueville", role: "Diplomat", country: "France", era: "19th Century", type: "Person" },
                    { name: "Max Weber", role: "Sociologist", country: "Germany", era: "19th/20th Century", type: "Person" },
                    { name: "Hannah Arendt", role: "Theorist", country: "USA", era: "20th Century", type: "Person" },
                    { name: "Carl Schmitt", role: "Jurist", country: "Germany", era: "20th Century", type: "Person" },
                    { name: "Hans Morgenthau", role: "Realist", country: "USA", era: "20th Century", type: "Person" },
                    { name: "Isaiah Berlin", role: "Philosopher", country: "UK", era: "20th Century", type: "Person" },
                    { name: "John Rawls", role: "Philosopher", country: "USA", era: "20th Century", type: "Person" },
                    { name: "Robert Nozick", role: "Philosopher", country: "USA", era: "20th Century", type: "Person" },
                    { name: "Michel Foucault", role: "Philosopher", country: "France", era: "20th Century", type: "Person" },
                    { name: "Antonio Gramsci", role: "Theorist", country: "Italy", era: "20th Century", type: "Person" },
                    { name: "Frantz Fanon", role: "Psychiatrist", country: "Algeria", era: "20th Century", type: "Person" }
                ]
            },
            {
                name: "Contemporary (21st Century)",
                type: "Folder",
                items: [
                    { name: "Francis Fukuyama", role: "Theorist", country: "USA", era: "Modern", type: "Person" },
                    { name: "John Mearsheimer", role: "Realist", country: "USA", era: "Modern", type: "Person" },
                    { name: "Joseph Nye", role: "Theorist", country: "USA", era: "Modern", type: "Person" },
                    { name: "Alexander Wendt", role: "Constructivist", country: "USA", era: "Modern", type: "Person" },
                    { name: "Judith Butler", role: "Philosopher", country: "USA", era: "Modern", type: "Person" },
                    { name: "Jürgen Habermas", role: "Philosopher", country: "Germany", era: "Modern", type: "Person" },
                    { name: "Slavoj Žižek", role: "Philosopher", country: "Slovenia", era: "Modern", type: "Person" },
                    { name: "Noam Chomsky", role: "Linguist", country: "USA", era: "Modern", type: "Person" },
                    { name: "Amartya Sen", role: "Economist", country: "India", era: "Modern", type: "Person" },
                    { name: "Martha Nussbaum", role: "Philosopher", country: "USA", era: "Modern", type: "Person" }
                ]
            }
        ]
    },
    {
        name: "Fictional Universes",
        type: "Folder",
        items: [
            {
                name: "Naruto (Shinobi World)",
                type: "Folder",
                items: [
                    {
                        name: "Konohagakure (Hidden Leaf)",
                        type: "Folder",
                        items: [
                            createFolder("Hokages", [
                                { name: "Hashirama Senju", role: "1st Hokage", country: "Konoha", era: "Founding", type: "Person" },
                                { name: "Tobirama Senju", role: "2nd Hokage", country: "Konoha", era: "Founding", type: "Person" },
                                { name: "Hiruzen Sarutobi", role: "3rd Hokage", country: "Konoha", era: "Modern", type: "Person" },
                                { name: "Minato Namikaze", role: "4th Hokage", country: "Konoha", era: "Pre-Shippuden", type: "Person" },
                                { name: "Tsunade Senju", role: "5th Hokage", country: "Konoha", era: "Shippuden", type: "Person" },
                                { name: "Kakashi Hatake", role: "6th Hokage", country: "Konoha", era: "Blank Period", type: "Person" },
                                { name: "Naruto Uzumaki", role: "7th Hokage", country: "Konoha", era: "Boruto", type: "Person" },
                                { name: "Shikamaru Nara", role: "8th Hokage", country: "Konoha", era: "Boruto TBV", type: "Person" }
                            ]),
                            createFolder("Elders & Advisors", [
                                { name: "Danzo Shimura", role: "Leader of Root", country: "Konoha", era: "Shippuden", type: "Person" },
                                { name: "Homura Mitokado", role: "Elder", country: "Konoha", era: "Modern", type: "Person" },
                                { name: "Koharu Utatane", role: "Elder", country: "Konoha", era: "Modern", type: "Person" }
                            ]),
                            createFolder("Legends", [
                                { name: "Madara Uchiha", role: "Legend", country: "Konoha", era: "Founding", type: "Person" },
                                { name: "Jiraiya", role: "Sannin", country: "Konoha", era: "Shippuden", type: "Person" },
                                { name: "Orochimaru", role: "Sannin", country: "Konoha", era: "Shippuden", type: "Person" },
                                { name: "Itachi Uchiha", role: "Akatsuki", country: "Konoha", era: "Shippuden", type: "Person" },
                                { name: "Sasuke Uchiha", role: "Shadow Hokage", country: "Konoha", era: "Boruto", type: "Person" }
                            ])
                        ]
                    },
                    {
                        name: "Sunagakure (Hidden Sand)",
                        type: "Folder",
                        items: [
                            createFolder("Kazekages", [
                                { name: "Reto", role: "1st Kazekage", country: "Suna", era: "Founding", type: "Person" },
                                { name: "Shamon", role: "2nd Kazekage", country: "Suna", era: "Founding", type: "Person" },
                                { name: "Rasa", role: "4th Kazekage", country: "Suna", era: "Pre-Shippuden", type: "Person" },
                                { name: "Gaara", role: "5th Kazekage", country: "Suna", era: "Modern", type: "Person" }
                            ])
                        ]
                    },
                    {
                        name: "Kumogakure (Hidden Cloud)",
                        type: "Folder",
                        items: [
                            createFolder("Raikages", [
                                { name: "A (1st)", role: "1st Raikage", country: "Kumo", era: "Founding", type: "Person" },
                                { name: "A (3rd)", role: "3rd Raikage", country: "Kumo", era: "Pre-Shippuden", type: "Person" },
                                { name: "A (4th)", role: "4th Raikage", country: "Kumo", era: "Modern", type: "Person" },
                                { name: "Darui", role: "5th Raikage", country: "Kumo", era: "Boruto", type: "Person" }
                            ])
                        ]
                    },
                    {
                        name: "Kirigakure (Hidden Mist)",
                        type: "Folder",
                        items: [
                            createFolder("Mizukages", [
                                { name: "Byakuren", role: "1st Mizukage", country: "Kiri", era: "Founding", type: "Person" },
                                { name: "Gengetsu Hozuki", role: "2nd Mizukage", country: "Kiri", era: "Founding", type: "Person" },
                                { name: "Yagura Karatachi", role: "4th Mizukage", country: "Kiri", era: "Pre-Shippuden", type: "Person" },
                                { name: "Mei Terumi", role: "5th Mizukage", country: "Kiri", era: "Modern", type: "Person" },
                                { name: "Chojuro", role: "6th Mizukage", country: "Kiri", era: "Boruto", type: "Person" }
                            ])
                        ]
                    },
                    {
                        name: "Iwagakure (Hidden Stone)",
                        type: "Folder",
                        items: [
                            createFolder("Tsuchikages", [
                                { name: "Ishikawa", role: "1st Tsuchikage", country: "Iwa", era: "Founding", type: "Person" },
                                { name: "Mu", role: "2nd Tsuchikage", country: "Iwa", era: "Founding", type: "Person" },
                                { name: "Onoki", role: "3rd Tsuchikage", country: "Iwa", era: "Modern", type: "Person" },
                                { name: "Kurotsuchi", role: "4th Tsuchikage", country: "Iwa", era: "Boruto", type: "Person" }
                            ])
                        ]
                    },
                    {
                        name: "Akatsuki",
                        type: "Folder",
                        items: [
                            { name: "Pain (Nagato)", role: "Leader", country: "Amegakure", era: "Shippuden", type: "Person" },
                            { name: "Konan", role: "Angel", country: "Amegakure", era: "Shippuden", type: "Person" },
                            { name: "Obito Uchiha", role: "True Leader", country: "None", era: "Shippuden", type: "Person" },
                            { name: "Zetsu", role: "Member", country: "None", era: "Shippuden", type: "Person" },
                            { name: "Kisame Hoshigaki", role: "Member", country: "Kiri", era: "Shippuden", type: "Person" },
                            { name: "Sasori", role: "Member", country: "Suna", era: "Shippuden", type: "Person" },
                            { name: "Deidara", role: "Member", country: "Iwa", era: "Shippuden", type: "Person" },
                            { name: "Kakuzu", role: "Member", country: "Taki", era: "Shippuden", type: "Person" },
                            { name: "Hidan", role: "Member", country: "Yuga", era: "Shippuden", type: "Person" }
                        ]
                    }
                ]
            },
            {
                name: "One Piece",
                type: "Folder",
                items: [
                    createFolder("World Government", [
                        { name: "Imu", role: "King of the World", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "St. Jaygarcia Saturn", role: "Elder Star", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "St. Marcus Mars", role: "Elder Star", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "St. Topman Warcury", role: "Elder Star", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "St. Ethanbaron V. Nusjuro", role: "Elder Star", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "St. Shepherd Ju Peter", role: "Elder Star", country: "Mary Geoise", era: "Current", type: "Person" },
                        { name: "Kong", role: "Commander-in-Chief", country: "Mary Geoise", era: "Current", type: "Person" }
                    ]),
                    createFolder("Marines", [
                        { name: "Sakazuki (Akainu)", role: "Fleet Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Borsalino (Kizaru)", role: "Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Issho (Fujitora)", role: "Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Aramaki (Ryokugyu)", role: "Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Sengoku", role: "Inspector General", country: "Marines", era: "Current", type: "Person" },
                        { name: "Monkey D. Garp", role: "Vice Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Tsuru", role: "Vice Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Smoker", role: "Vice Admiral", country: "Marines", era: "Current", type: "Person" },
                        { name: "Koby", role: "Captain", country: "SWORD", era: "Current", type: "Person" }
                    ]),
                    createFolder("Emperors (Yonko)", [
                        { name: "Shanks", role: "Yonko", country: "Red Hair Pirates", era: "Current", type: "Person" },
                        { name: "Marshall D. Teach", role: "Yonko", country: "Blackbeard Pirates", era: "Current", type: "Person" },
                        { name: "Monkey D. Luffy", role: "Yonko", country: "Straw Hat Pirates", era: "Current", type: "Person" },
                        { name: "Buggy", role: "Yonko", country: "Cross Guild", era: "Current", type: "Person" },
                        { name: "Kaido", role: "Former Yonko", country: "Beast Pirates", era: "Wano", type: "Person" },
                        { name: "Charlotte Linlin", role: "Former Yonko", country: "Big Mom Pirates", era: "Wano", type: "Person" },
                        { name: "Edward Newgate", role: "Former Yonko", country: "Whitebeard Pirates", era: "Marineford", type: "Person" }
                    ]),
                    createFolder("Revolutionary Army", [
                        { name: "Monkey D. Dragon", role: "Supreme Commander", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Sabo", role: "Chief of Staff", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Emporio Ivankov", role: "Commander", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Belo Betty", role: "Commander", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Morley", role: "Commander", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Lindbergh", role: "Commander", country: "Revolutionaries", era: "Current", type: "Person" },
                        { name: "Karasu", role: "Commander", country: "Revolutionaries", era: "Current", type: "Person" }
                    ]),
                    createFolder("Warlords (Shichibukai - Former)", [
                        { name: "Dracule Mihawk", role: "Warlord", country: "None", era: "Pre-Abolition", type: "Person" },
                        { name: "Boa Hancock", role: "Empress", country: "Amazon Lily", era: "Pre-Abolition", type: "Person" },
                        { name: "Bartholomew Kuma", role: "Warlord", country: "Sorbet Kingdom", era: "Pre-Abolition", type: "Person" },
                        { name: "Donquixote Doflamingo", role: "King", country: "Dressrosa", era: "Pre-Dressrosa", type: "Person" },
                        { name: "Crocodile", role: "Warlord", country: "Alabasta", era: "Pre-Alabasta", type: "Person" },
                        { name: "Gecko Moria", role: "Warlord", country: "Thriller Bark", era: "Pre-Marineford", type: "Person" },
                        { name: "Jinbe", role: "Warlord", country: "Fishman Island", era: "Pre-Marineford", type: "Person" }
                    ])
                ]
            },
            {
                name: "Star Wars",
                type: "Folder",
                items: [
                    createFolder("Galactic Republic", [
                        { name: "Finis Valorum", role: "Supreme Chancellor", country: "Coruscant", era: "Prequel", type: "Person" },
                        { name: "Sheev Palpatine", role: "Supreme Chancellor", country: "Naboo", era: "Prequel", type: "Person" },
                        { name: "Padmé Amidala", role: "Senator", country: "Naboo", era: "Prequel", type: "Person" },
                        { name: "Bail Organa", role: "Senator", country: "Alderaan", era: "Prequel", type: "Person" },
                        { name: "Mon Mothma", role: "Senator", country: "Chandrila", era: "Prequel", type: "Person" },
                        { name: "Mas Amedda", role: "Vice Chair", country: "Champala", era: "Prequel", type: "Person" }
                    ]),
                    createFolder("Galactic Empire", [
                        { name: "Sheev Palpatine", role: "Emperor", country: "Empire", era: "Imperial", type: "Person" },
                        { name: "Darth Vader", role: "Supreme Commander", country: "Empire", era: "Imperial", type: "Person" },
                        { name: "Wilhuff Tarkin", role: "Grand Moff", country: "Eriadu", era: "Imperial", type: "Person" },
                        { name: "Thrawn", role: "Grand Admiral", country: "Chiss", era: "Imperial", type: "Person" },
                        { name: "Gallius Rax", role: "Counselor", country: "Jakku", era: "Imperial", type: "Person" },
                        { name: "Rae Sloane", role: "Grand Admiral", country: "Empire", era: "Post-Endor", type: "Person" }
                    ]),
                    createFolder("Confederacy (CIS)", [
                        { name: "Count Dooku", role: "Head of State", country: "Serenno", era: "Clone Wars", type: "Person" },
                        { name: "General Grievous", role: "Supreme Commander", country: "Kaleesh", era: "Clone Wars", type: "Person" },
                        { name: "Nute Gunray", role: "Viceroy", country: "Trade Federation", era: "Clone Wars", type: "Person" },
                        { name: "Wat Tambor", role: "Foreman", country: "Techno Union", era: "Clone Wars", type: "Person" },
                        { name: "San Hill", role: "Chairman", country: "Banking Clan", era: "Clone Wars", type: "Person" }
                    ]),
                    createFolder("Rebel Alliance / New Republic", [
                        { name: "Mon Mothma", role: "Chancellor", country: "New Republic", era: "Civil War", type: "Person" },
                        { name: "Leia Organa", role: "Princess/General", country: "Alderaan", era: "Civil War", type: "Person" },
                        { name: "Gial Ackbar", role: "Admiral", country: "Mon Cala", era: "Civil War", type: "Person" }
                    ]),
                    createFolder("Jedi Order (Council)", [
                        { name: "Yoda", role: "Grand Master", country: "Jedi", era: "Prequel", type: "Person" },
                        { name: "Mace Windu", role: "Master of the Order", country: "Jedi", era: "Prequel", type: "Person" },
                        { name: "Ki-Adi-Mundi", role: "Master", country: "Jedi", era: "Prequel", type: "Person" },
                        { name: "Plo Koon", role: "Master", country: "Jedi", era: "Prequel", type: "Person" }
                    ])
                ]
            },
            {
                name: "Game of Thrones (Westeros)",
                type: "Folder",
                items: [
                    createFolder("House Targaryen", [
                        { name: "Daenerys Targaryen", role: "Queen", country: "Dragonstone", era: "GoT", type: "Person" },
                        { name: "Aerys II Targaryen", role: "Mad King", country: "King's Landing", era: "Pre-Rebellion", type: "Person" },
                        { name: "Rhaegar Targaryen", role: "Prince", country: "Dragonstone", era: "Pre-Rebellion", type: "Person" },
                        { name: "Aegon I Targaryen", role: "Conqueror", country: "Westeros", era: "Conquest", type: "Person" }
                    ]),
                    createFolder("House Stark", [
                        { name: "Eddard Stark", role: "Warden of the North", country: "Winterfell", era: "GoT", type: "Person" },
                        { name: "Robb Stark", role: "King in the North", country: "Winterfell", era: "War of 5 Kings", type: "Person" },
                        { name: "Jon Snow", role: "King in the North", country: "Winterfell", era: "Post-Bolton", type: "Person" },
                        { name: "Sansa Stark", role: "Queen in the North", country: "Winterfell", era: "Endgame", type: "Person" }
                    ]),
                    createFolder("House Lannister", [
                        { name: "Tywin Lannister", role: "Hand of the King", country: "Casterly Rock", era: "GoT", type: "Person" },
                        { name: "Cersei Lannister", role: "Queen Regent", country: "King's Landing", era: "GoT", type: "Person" },
                        { name: "Joffrey Baratheon", role: "King", country: "King's Landing", era: "War of 5 Kings", type: "Person" },
                        { name: "Tyrion Lannister", role: "Hand of the Queen", country: "Casterly Rock", era: "GoT", type: "Person" }
                    ]),
                    createFolder("House Baratheon", [
                        { name: "Robert Baratheon", role: "King", country: "King's Landing", era: "GoT", type: "Person" },
                        { name: "Stannis Baratheon", role: "King", country: "Dragonstone", era: "War of 5 Kings", type: "Person" },
                        { name: "Renly Baratheon", role: "King", country: "Storm's End", era: "War of 5 Kings", type: "Person" }
                    ])
                ]
            }
        ]
    }
];

export const PERSONS_DATA: PersonCategory[] = [];
