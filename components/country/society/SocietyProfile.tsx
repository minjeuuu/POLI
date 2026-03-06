import React, { useState } from 'react';
import { Users, Utensils, Music, BookOpen, Shield, BarChart2, Home, Heart, Globe, AlertTriangle, Briefcase } from 'lucide-react';

const Sec: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2 bg-stone-50/50 dark:bg-stone-800/30">
            {icon}<span className="font-bold text-xs uppercase tracking-wider text-stone-600 dark:text-stone-300">{title}</span>
        </div>
        <div className="p-4">{children}</div>
    </div>
);
const Row: React.FC<{ label: string; value?: string; hi?: boolean }> = ({ label, value, hi }) => {
    if (!value) return null;
    return <div className={`flex justify-between items-start py-1 border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${hi?'bg-purple-50/60 dark:bg-purple-900/10 -mx-1 px-1 rounded':''}`}>
        <span className="text-xs text-stone-500 flex-1 pr-2">{label}</span>
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[55%]">{value}</span>
    </div>;
};
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='red'?'bg-red-50 dark:bg-red-900/20 text-red-700 border-red-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':c==='orange'?'bg-orange-50 dark:bg-orange-900/20 text-orange-700 border-orange-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','indicators','demographics','gender','lgbtq','labor','protection','crime','housing','media','religion','cohesion'];

export const SocietyProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.cuisine&&<div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><h5 className="flex items-center gap-2 font-bold text-sm mb-2"><Utensils className="w-4 h-4 text-orange-500"/>Cuisine</h5><p className="text-xs font-serif text-stone-600 dark:text-stone-400 leading-relaxed">{d.cuisine}</p>{d.dishes?.length>0&&<div className="mt-2 flex flex-wrap">{d.dishes.map((dish:string,i:number)=><Tag key={i} t={dish} c="orange"/>)}</div>}</div>}
                {d.arts&&<div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><h5 className="flex items-center gap-2 font-bold text-sm mb-2"><Music className="w-4 h-4 text-pink-500"/>Arts & Media</h5><p className="text-xs font-serif text-stone-600 dark:text-stone-400 leading-relaxed">{d.arts}</p>{d.mediaFreedom&&<div className="mt-3 p-2 bg-stone-50 dark:bg-stone-800 rounded"><span className="text-[10px] font-bold uppercase text-stone-400">Media Freedom: </span><span className="text-xs">{d.mediaFreedom}</span></div>}</div>}
            </div>
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-purple-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.socialIndicators&&<Sec title="Social Indicators" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}><Row label="HDI" value={d.socialIndicators.humanDevelopmentIndex} hi/><Row label="HDI Rank" value={d.socialIndicators.hdiRank}/><Row label="Gini Coefficient" value={d.socialIndicators.giniCoefficient}/><Row label="Poverty Rate" value={d.socialIndicators.povertyRate}/><Row label="Happiness Index" value={d.socialIndicators.happinessIndex}/><Row label="Happiness Rank" value={d.socialIndicators.happinessRank}/><Row label="Social Progress Index" value={d.socialIndicators.socialProgressIndex}/></Sec>}
                {d.demographics&&<Sec title="Demographics Overview" icon={<Users className="w-4 h-4 text-purple-500"/>}><Row label="Median Age" value={d.demographics.medianAge}/><Row label="Urbanization Rate" value={d.demographics.urbanizationRate} hi/><Row label="Urban Population" value={d.demographics.urbanPopulation}/><Row label="Rural Population" value={d.demographics.ruralPopulation}/><Row label="Population Growth Rate" value={d.demographics.populationGrowthRate}/><Row label="Immigrant Population %" value={d.demographics.immigrantPopulationPercent}/></Sec>}
            </div>}

            {tab==='indicators' && d.socialIndicators && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Human Development" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="HDI" value={d.socialIndicators.humanDevelopmentIndex} hi/><Row label="HDI Rank" value={d.socialIndicators.hdiRank}/><Row label="Gini Coefficient" value={d.socialIndicators.giniCoefficient}/><Row label="Poverty Rate" value={d.socialIndicators.povertyRate}/><Row label="Extreme Poverty Rate" value={d.socialIndicators.extremePovertyRate}/><Row label="Social Mobility Index" value={d.socialIndicators.socialMobilityIndex}/><Row label="Social Mobility Rank" value={d.socialIndicators.socialMobilityRank}/><Row label="Happiness Index" value={d.socialIndicators.happinessIndex}/><Row label="Happiness Rank" value={d.socialIndicators.happinessRank}/><Row label="Quality of Life Index" value={d.socialIndicators.qualityOfLifeIndex}/><Row label="Prosperity Index" value={d.socialIndicators.prosperityIndex}/><Row label="Social Progress Index" value={d.socialIndicators.socialProgressIndex}/><Row label="Trust in Institutions" value={d.socialIndicators.trustInInstitutions}/><Row label="Volunteering Rate" value={d.socialIndicators.volunteeringRate}/>
                </Sec>
            </div>}

            {tab==='demographics' && d.demographics && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Population Structure" icon={<Users className="w-4 h-4 text-purple-500"/>}>
                    <Row label="Median Age" value={d.demographics.medianAge}/><Row label="Urbanization Rate" value={d.demographics.urbanizationRate} hi/><Row label="Urban Population" value={d.demographics.urbanPopulation}/><Row label="Rural Population" value={d.demographics.ruralPopulation}/><Row label="Population Growth Rate" value={d.demographics.populationGrowthRate}/><Row label="Net Migration Rate" value={d.demographics.netMigrationRate}/><Row label="Immigrant Population %" value={d.demographics.immigrantPopulationPercent}/><Row label="Emigrant Diaspora" value={d.demographics.emigrantDiaspora}/><Row label="Dependency Ratio" value={d.demographics.dependencyRatio}/>
                    {d.demographics.ageDistribution&&<><Row label="Under 15 %" value={d.demographics.ageDistribution.under15}/><Row label="15-64 %" value={d.demographics.ageDistribution["15to64"]}/><Row label="Over 65 %" value={d.demographics.ageDistribution.over65}/></>}
                </Sec>
                {d.demographics.topCities?.length>0&&<Sec title="Top Cities" icon={<Home className="w-4 h-4 text-stone-500"/>}>{d.demographics.topCities.map((city:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="font-bold">{i+1}. {city.city}</span><span className="text-stone-500">{city.population} — {city.role}</span></div>)}</Sec>}
            </div>}

            {tab==='gender' && d.genderAndEquality && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Gender Equality" icon={<Heart className="w-4 h-4 text-pink-500"/>}>
                    <Row label="Gender Inequality Index" value={d.genderAndEquality.genderInequalityIndex} hi/><Row label="GII Rank" value={d.genderAndEquality.giiRank}/><Row label="Global Gender Gap Rank" value={d.genderAndEquality.globalGenderGapRank}/><Row label="Women in Parliament" value={d.genderAndEquality.womensParliamentSeats}/><Row label="Women in Workforce" value={d.genderAndEquality.womenInWorkforce}/><Row label="Gender Pay Gap" value={d.genderAndEquality.genderPayGap}/><Row label="Women's Education Parity" value={d.genderAndEquality.womensEducationParity}/><Row label="Maternity Leave" value={d.genderAndEquality.maternityLeaveWeeks}/><Row label="Paternity Leave" value={d.genderAndEquality.paternityLeaveWeeks}/><Row label="GBV Rate" value={d.genderAndEquality.genderBasedViolenceRate}/><Row label="Women in Leadership" value={d.genderAndEquality.womenInLeadership}/><Row label="Feminist Movement" value={d.genderAndEquality.feministMovement}/>
                </Sec>
            </div>}

            {tab==='lgbtq' && d.lgbtqRights && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="LGBTQ+ Rights" icon={<Heart className="w-4 h-4 text-rainbow-500"/>}>
                    <Row label="Same-Sex Marriage" value={d.lgbtqRights.sameSeMarriage} hi/><Row label="Adoption Rights" value={d.lgbtqRights.adoptionRights}/><Row label="Anti-Discrimination Laws" value={d.lgbtqRights.lgbtqAntiDiscriminationLaw}/><Row label="Protection Laws" value={d.lgbtqRights.lgbtqProtectionLaws}/><Row label="Gender Identity Recognition" value={d.lgbtqRights.genderIdentityRecognition}/><Row label="Military Service" value={d.lgbtqRights.lgbtqMilitaryService}/><Row label="Acceptance Level" value={d.lgbtqRights.lgbtqAcceptanceLevel}/><Row label="Activism Status" value={d.lgbtqRights.lgbtqActivism}/>
                </Sec>
            </div>}

            {tab==='labor' && d.laborAndEmployment && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Labor & Employment" icon={<Briefcase className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Unemployment Rate" value={d.laborAndEmployment.unemploymentRate} hi/><Row label="Youth Unemployment" value={d.laborAndEmployment.youthUnemploymentRate}/><Row label="Female Unemployment" value={d.laborAndEmployment.femaleUnemploymentRate}/><Row label="Labor Force Participation" value={d.laborAndEmployment.laborForceParticipationRate}/><Row label="Minimum Wage" value={d.laborAndEmployment.minimumWage}/><Row label="Avg Monthly Wage" value={d.laborAndEmployment.avgMonthlyWage}/><Row label="Weekly Working Hours" value={d.laborAndEmployment.weeklyWorkingHours}/><Row label="Paid Vacation Days" value={d.laborAndEmployment.paidVacationDays}/><Row label="Trade Union Membership" value={d.laborAndEmployment.tradeUnionMembership}/><Row label="Gig Economy Size" value={d.laborAndEmployment.gigEconomySize}/><Row label="Informal Employment" value={d.laborAndEmployment.informalEmploymentRate}/><Row label="Labor Rights Index" value={d.laborAndEmployment.laborRightsIndex}/>
                </Sec>
            </div>}

            {tab==='protection' && d.socialProtection && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Social Protection" icon={<Shield className="w-4 h-4 text-green-500"/>}>
                    <Row label="Coverage" value={d.socialProtection.socialProtectionCoverage} hi/><Row label="Pension System" value={d.socialProtection.pensionSystem}/><Row label="Pension Age" value={d.socialProtection.pensionAge}/><Row label="Unemployment Benefits" value={d.socialProtection.unemploymentBenefits}/><Row label="Child Allowance" value={d.socialProtection.childAllowance}/><Row label="Housing Subsidies" value={d.socialProtection.housingSubsidies}/><Row label="Disability Benefits" value={d.socialProtection.disabilityBenefits}/><Row label="Social Spending (% GDP)" value={d.socialProtection.socialSpendingGDP}/>
                    {d.socialProtection.foodAssistancePrograms?.length>0&&<div className="mt-3">{d.socialProtection.foodAssistancePrograms.map((p:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {p}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='crime' && d.crime && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Crime & Safety" icon={<AlertTriangle className="w-4 h-4 text-red-500"/>}>
                    <Row label="Homicide Rate (/100k)" value={d.crime.homicideRate} hi/><Row label="Crime Index" value={d.crime.crimeIndex}/><Row label="Safety Index" value={d.crime.safetyIndex}/><Row label="Safety Rank" value={d.crime.safetyRank}/><Row label="Prison Population Rate" value={d.crime.prisonPopulationRate}/><Row label="Recidivism Rate" value={d.crime.recidivismRate}/><Row label="Organized Crime" value={d.crime.organizedCrime}/><Row label="Corruption Perception Index" value={d.crime.corruptionPerceptionIndex}/><Row label="CPI Rank" value={d.crime.cpiRank}/><Row label="Drug Policy" value={d.crime.drugPolicy}/><Row label="Domestic Violence Rate" value={d.crime.domesticViolenceRate}/><Row label="Police per 100k" value={d.crime.policePer100k}/>
                </Sec>
            </div>}

            {tab==='housing' && d.housing && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Housing" icon={<Home className="w-4 h-4 text-stone-500"/>}>
                    <Row label="Home Ownership Rate" value={d.housing.homeOwnershipRate} hi/><Row label="Housing Affordability Index" value={d.housing.housingAffordabilityIndex}/><Row label="Price-to-Income Ratio" value={d.housing.averageHousePriceToIncomeRatio}/><Row label="Homelessness Rate" value={d.housing.homelessnessRate}/><Row label="Social Housing" value={d.housing.socialHousing}/><Row label="Housing Quality Index" value={d.housing.housingQualityIndex}/><Row label="Overcrowding Rate" value={d.housing.overcrowdingRate}/><Row label="Mortgage Market" value={d.housing.mortgageMarket}/>
                </Sec>
            </div>}

            {tab==='media' && d.media && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Media Landscape" icon={<BookOpen className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Press Freedom Index" value={d.media.pressFreedomIndex} hi/><Row label="Press Freedom Rank" value={d.media.pressFreedomRank}/><Row label="Public Broadcaster" value={d.media.publicBroadcaster}/><Row label="Media Ownership Concentration" value={d.media.mediaOwnershipConcentration}/><Row label="Censorship Level" value={d.media.censorshipLevel}/><Row label="Fake News Level" value={d.media.fakeNewsLevel}/><Row label="Media Literacy Rate" value={d.media.mediaLiteracyRate}/>
                    {d.media.majorNewspapers?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Major Newspapers</div>{d.media.majorNewspapers.map((n:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {n}</div>)}</div>}
                    {d.media.majorTVChannels?.length>0&&<div className="mt-2"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Major TV Channels</div>{d.media.majorTVChannels.map((n:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {n}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='religion' && d.religion && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Religion & Society" icon={<Globe className="w-4 h-4 text-amber-500"/>}>
                    <Row label="Secularism" value={d.religion.secularism}/><Row label="Religious Freedom" value={d.religion.religiousFreedom} hi/><Row label="Church-State Relation" value={d.religion.churchStateRelation}/><Row label="Influence on Politics" value={d.religion.influenceOnPolitics}/><Row label="Atheism Rate" value={d.religion.atheismRate}/><Row label="Religious Conflict" value={d.religion.religiousConflict}/>
                    {d.religion.majorReligions?.length>0&&<div className="mt-4"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Religious Breakdown</div>{d.religion.majorReligions.map((r:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span>{r.religion}</span><span className="font-bold text-academic-accent">{r.percentage}</span></div>)}</div>}
                </Sec>
            </div>}

            {tab==='cohesion' && d.socialCohesion && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Social Cohesion" icon={<Users className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Ethnic Tensions" value={d.socialCohesion.ethnicTensions}/><Row label="Integration Policy" value={d.socialCohesion.integrationPolicy}/><Row label="Multiculturalism Index" value={d.socialCohesion.multiculturalismIndex} hi/><Row label="Xenophobia Level" value={d.socialCohesion.xenophobiaLevel}/><Row label="National Identity Strength" value={d.socialCohesion.nationalIdentityStrength}/><Row label="Community Participation" value={d.socialCohesion.communityParticipation}/><Row label="Social Capital" value={d.socialCohesion.socialCapital}/>
                </Sec>
            </div>}
        </div>
    );
};
