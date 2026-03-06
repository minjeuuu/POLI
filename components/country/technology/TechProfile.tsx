import React, { useState } from 'react';
import { Cpu, Wifi, Shield, Rocket, Globe, BarChart2, Zap, ShoppingCart, Brain, Monitor } from 'lucide-react';

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
    return <div className={`flex justify-between items-start py-1 border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${hi?'bg-blue-50/60 dark:bg-blue-900/10 -mx-1 px-1 rounded':''}`}>
        <span className="text-xs text-stone-500 flex-1 pr-2">{label}</span>
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[55%]">{value}</span>
    </div>;
};
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='blue'?'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':c==='purple'?'bg-purple-50 dark:bg-purple-900/20 text-purple-700 border-purple-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','connectivity','social','ecosystem','rd','sectors','space','cybersecurity','govtech','manufacturing'];

export const TechProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Wifi className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Internet Access</div><div className="text-lg font-bold text-stone-800 dark:text-stone-100">{d.internetPenetration||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><Monitor className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Mobile Penetration</div><div className="text-lg font-bold text-stone-800 dark:text-stone-100">{d.mobilePenetration||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-red-50 text-red-500 rounded-lg"><Shield className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Cyber Rank</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100">{d.cyberRank||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-amber-50 text-amber-500 rounded-lg"><Cpu className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Innovation Index</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100">{d.innovationIndex||"N/A"}</div></div></div>
            </div>
            {d.majorSectors?.length>0&&<div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Major Tech Sectors</div>{d.majorSectors.map((s:string,i:number)=><Tag key={i} t={s} c="blue"/>)}</div>}
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-blue-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.connectivity&&<Sec title="Connectivity" icon={<Wifi className="w-4 h-4 text-blue-500"/>}><Row label="Internet Users" value={d.connectivity.totalInternetUsers}/><Row label="Fixed Broadband" value={d.connectivity.fixedBroadbandPenetration}/><Row label="Mobile Broadband" value={d.connectivity.mobileBroadbandPenetration}/><Row label="Fixed Internet Speed" value={d.connectivity.averageFixedInternetSpeed} hi/><Row label="5G Coverage" value={d.connectivity.fiveGCoverage}/><Row label="Internet Freedom" value={d.connectivity.internetFreedom}/></Sec>}
                {d.techEcosystem&&<Sec title="Tech Ecosystem" icon={<Cpu className="w-4 h-4 text-purple-500"/>}><Row label="Total Startups" value={d.techEcosystem.totalTechStartups}/><Row label="VC Investment" value={d.techEcosystem.ventureCapitalInvestment}/><Row label="Tech Employment" value={d.techEcosystem.techEmployment}/><Row label="Tech Sector GDP %" value={d.techEcosystem.techSectorGDP}/><Row label="Tech Exports" value={d.techEcosystem.techExports}/></Sec>}
                {d.rAndD&&<Sec title="R&D" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}><Row label="R&D Spending (% GDP)" value={d.rAndD.rAndDSpendingGDP} hi/><Row label="R&D Spending (Absolute)" value={d.rAndD.rAndDSpendingAbsolute}/><Row label="Researchers/Million" value={d.rAndD.researchersPerMillion}/><Row label="Annual Patents" value={d.rAndD.annualPatentsFiled}/><Row label="Nobel Prizes in Science" value={d.rAndD.nobelPrizesInScience}/></Sec>}
                {d.space&&<Sec title="Space Program" icon={<Rocket className="w-4 h-4 text-orange-500"/>}><Row label="Space Agency" value={d.space.spaceAgencyName}/><Row label="Budget" value={d.space.budget}/><Row label="Satellites" value={d.space.satellites}/><Row label="Launch Capability" value={d.space.launchCapability}/></Sec>}
            </div>}

            {tab==='connectivity' && d.connectivity && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Internet Infrastructure" icon={<Wifi className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Total Internet Users" value={d.connectivity.totalInternetUsers}/><Row label="Internet Penetration" value={d.internetPenetration} hi/><Row label="Fixed Broadband" value={d.connectivity.fixedBroadbandPenetration}/><Row label="Mobile Broadband" value={d.connectivity.mobileBroadbandPenetration}/><Row label="Avg Fixed Speed (Mbps)" value={d.connectivity.averageFixedInternetSpeed}/><Row label="Avg Mobile Speed" value={d.connectivity.averageMobileInternetSpeed}/><Row label="Internet Freedom" value={d.connectivity.internetFreedom}/><Row label="Internet Censorship" value={d.connectivity.internetCensorship}/><Row label="5G Coverage" value={d.connectivity.fiveGCoverage} hi/><Row label="5G Launch Year" value={d.connectivity.fiveGLaunchYear}/><Row label="Rural Connectivity" value={d.connectivity.ruralConnectivityRate}/><Row label="Digital Divide" value={d.connectivity.digitalDivide}/>
                    {d.connectivity.fiveGOperators?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">5G Operators</div>{d.connectivity.fiveGOperators.map((op:string,i:number)=><Tag key={i} t={op} c="blue"/>)}</div>}
                    {d.connectivity.underseasCables?.length>0&&<div className="mt-2">{d.connectivity.underseasCables.map((c:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {c}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='social' && d.socialMedia && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Social Media Landscape" icon={<Globe className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Social Media Penetration" value={d.socialMedia.socialMediaPenetration} hi/><Row label="Social Media Regulation" value={d.socialMedia.socialMediaRegulation}/><Row label="Influencer Economy" value={d.socialMedia.influencerEconomy}/><Row label="Digital Advertising Market" value={d.socialMedia.digitalAdvertisingMarket}/>
                    {d.socialMedia.bannedPlatforms?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Banned Platforms</div>{d.socialMedia.bannedPlatforms.map((p:string,i:number)=><Tag key={i} t={p}/>)}</div>}
                </Sec>
                {d.socialMedia.topPlatforms?.length>0&&<Sec title="Top Social Platforms" icon={<Monitor className="w-4 h-4 text-purple-500"/>}>{d.socialMedia.topPlatforms.map((p:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="font-bold">{p.platform}</span><span className="text-stone-500">{p.users} | {p.penetration}</span></div>)}</Sec>}
            </div>}

            {tab==='ecosystem' && d.techEcosystem && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Tech Ecosystem Stats" icon={<Cpu className="w-4 h-4 text-purple-500"/>}>
                    <Row label="Total Tech Startups" value={d.techEcosystem.totalTechStartups}/><Row label="VC Investment" value={d.techEcosystem.ventureCapitalInvestment} hi/><Row label="Tech IPOs" value={d.techEcosystem.techIPOs}/><Row label="Tech Employment" value={d.techEcosystem.techEmployment}/><Row label="Tech Sector GDP %" value={d.techEcosystem.techSectorGDP}/><Row label="Tech Exports" value={d.techEcosystem.techExports}/>
                </Sec>
                <div className="space-y-4">
                    {d.techEcosystem.techUnicorns?.length>0&&<Sec title="Tech Unicorns" icon={<Zap className="w-4 h-4 text-amber-500"/>}>{d.techEcosystem.techUnicorns.map((u:any,i:number)=><div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded mb-1"><div className="font-bold text-xs text-amber-700">{u.name}</div><div className="text-[10px] text-stone-500">{u.sector} | {u.valuation} | Est. {u.founded}</div></div>)}</Sec>}
                    {d.techEcosystem.techHubs?.length>0&&<Sec title="Tech Hubs" icon={<Globe className="w-4 h-4 text-blue-500"/>}>{d.techEcosystem.techHubs.map((h:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{h.city} <span className="text-stone-400 font-normal">({h.nickname})</span></div><div className="text-[10px] text-stone-500">{h.focus} | {h.companies}</div></div>)}</Sec>}
                </div>
            </div>}

            {tab==='rd' && d.rAndD && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Research & Development" icon={<Brain className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="R&D Spending (% GDP)" value={d.rAndD.rAndDSpendingGDP} hi/><Row label="R&D Spending (Absolute)" value={d.rAndD.rAndDSpendingAbsolute}/><Row label="Researchers per Million" value={d.rAndD.researchersPerMillion}/><Row label="Annual Patents Filed" value={d.rAndD.annualPatentsFiled}/><Row label="PCT Patent Applications" value={d.rAndD.pctPatentApplications}/><Row label="Public R&D Funding" value={d.rAndD.publicRAndDFunding}/><Row label="Private R&D Funding" value={d.rAndD.privateRAndDFunding}/><Row label="R&D Growth Rate" value={d.rAndD.rAndDGrowthRate}/><Row label="Nobel Prizes in Science" value={d.rAndD.nobelPrizesInScience}/>
                    {d.rAndD.topResearchInstitutes?.length>0&&<div className="mt-3">{d.rAndD.topResearchInstitutes.map((inst:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {inst}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='sectors' && d.sectors && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.sectors.artificialIntelligence&&<Sec title="Artificial Intelligence" icon={<Brain className="w-4 h-4 text-indigo-500"/>}><Row label="Investment Level" value={d.sectors.artificialIntelligence.investmentLevel} hi/><Row label="Government Strategy" value={d.sectors.artificialIntelligence.governmentStrategy}/>{d.sectors.artificialIntelligence.companies?.length>0&&<div className="mt-2">{d.sectors.artificialIntelligence.companies.map((c:string,i:number)=><Tag key={i} t={c} c="purple"/>)}</div>}</Sec>}
                {d.sectors.fintech&&<Sec title="FinTech" icon={<Zap className="w-4 h-4 text-green-500"/>}><Row label="Market Size" value={d.sectors.fintech.marketSize} hi/><Row label="Growth" value={d.sectors.fintech.growth}/><Row label="Regulation" value={d.sectors.fintech.regulation}/>{d.sectors.fintech.companies?.length>0&&<div className="mt-2">{d.sectors.fintech.companies.map((c:string,i:number)=><Tag key={i} t={c} c="green"/>)}</div>}</Sec>}
                {d.sectors.eCommerce&&<Sec title="E-Commerce" icon={<ShoppingCart className="w-4 h-4 text-orange-500"/>}><Row label="Market Size" value={d.sectors.eCommerce.marketSize} hi/><Row label="Penetration" value={d.sectors.eCommerce.penetration}/><Row label="Growth" value={d.sectors.eCommerce.growth}/>{d.sectors.eCommerce.topPlatforms?.length>0&&<div className="mt-2">{d.sectors.eCommerce.topPlatforms.map((p:string,i:number)=><Tag key={i} t={p}/>)}</div>}</Sec>}
                {d.sectors.cloudComputing&&<Sec title="Cloud Computing" icon={<Globe className="w-4 h-4 text-sky-500"/>}><Row label="Market Size" value={d.sectors.cloudComputing.marketSize} hi/><Row label="Enterprise Adoption" value={d.sectors.cloudComputing.adoption}/>{d.sectors.cloudComputing.providers?.length>0&&<div className="mt-2">{d.sectors.cloudComputing.providers.map((p:string,i:number)=><Tag key={i} t={p} c="blue"/>)}</div>}</Sec>}
                {d.sectors.cybersecurity&&<Sec title="Cybersecurity" icon={<Shield className="w-4 h-4 text-red-500"/>}><Row label="Market Size" value={d.sectors.cybersecurity.marketSize} hi/><Row label="Major Incidents" value={d.sectors.cybersecurity.incidents}/>{d.sectors.cybersecurity.companies?.length>0&&<div className="mt-2">{d.sectors.cybersecurity.companies.map((c:string,i:number)=><Tag key={i} t={c}/>)}</div>}</Sec>}
                {d.sectors.gaming&&<Sec title="Gaming Industry" icon={<Monitor className="w-4 h-4 text-purple-500"/>}><Row label="Market Size" value={d.sectors.gaming.marketSize} hi/><Row label="Players" value={d.sectors.gaming.players}/>{d.sectors.gaming.developers?.length>0&&<div className="mt-2">{d.sectors.gaming.developers.map((dev:string,i:number)=><Tag key={i} t={dev}/>)}</div>}</Sec>}
            </div>}

            {tab==='space' && d.space && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Space Program" icon={<Rocket className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Space Agency" value={d.space.spaceAgencyName} hi/><Row label="Founded" value={d.space.founded}/><Row label="Budget" value={d.space.budget}/><Row label="Satellites" value={d.space.satellites}/><Row label="Launch Capability" value={d.space.launchCapability}/><Row label="Space Ambitions" value={d.space.spaceAmbitions}/>
                    {d.space.majorAchievements?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Major Achievements</div>{d.space.majorAchievements.map((a:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {a}</div>)}</div>}
                    {d.space.currentMissions?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Current Missions</div>{d.space.currentMissions.map((m:string,i:number)=><Tag key={i} t={m} c="blue"/>)}</div>}
                </Sec>
                {d.space.commercialSpaceCompanies?.length>0&&<Sec title="Commercial Space" icon={<Zap className="w-4 h-4 text-amber-500"/>}>{d.space.commercialSpaceCompanies.map((c:string,i:number)=><Tag key={i} t={c}/>)}{d.space.internationalPartnerships?.length>0&&<div className="mt-3">{d.space.internationalPartnerships.map((p:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {p}</div>)}</div>}</Sec>}
            </div>}

            {tab==='cybersecurity' && d.cybersecurity && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Cyber Defense" icon={<Shield className="w-4 h-4 text-red-500"/>}>
                    <Row label="National Cyber Strategy" value={d.cybersecurity.nationalCyberStrategy}/><Row label="Cyber Defense Agency" value={d.cybersecurity.cyberDefenseAgency}/><Row label="GCI Score" value={d.cybersecurity.globalCybersecurityIndex} hi/><Row label="GCI Rank" value={d.cybersecurity.gciRank}/><Row label="Cyber Military" value={d.cybersecurity.cyberMilitary}/><Row label="Critical Infrastructure Protection" value={d.cybersecurity.criticalInfrastructureProtection}/><Row label="Cybercrime Rate" value={d.cybersecurity.cybercrimeRate}/>
                </Sec>
                {d.cybersecurity.majorCyberIncidents?.length>0&&<Sec title="Major Cyber Incidents" icon={<Shield className="w-4 h-4 text-orange-500"/>}>{d.cybersecurity.majorCyberIncidents.map((inc:any,i:number)=><div key={i} className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg mb-2"><div className="font-bold text-xs text-red-700">{inc.year} — {inc.incident}</div><div className="text-[10px] text-stone-500 mt-1">Attribution: {inc.attribution}</div></div>)}</Sec>}
            </div>}

            {tab==='govtech' && d.digitalGovernment && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Digital Government" icon={<Globe className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="E-Gov Development Index" value={d.digitalGovernment.eGovernmentDevelopmentIndex} hi/><Row label="E-Gov Rank" value={d.digitalGovernment.eGovernmentRank}/><Row label="Online Services" value={d.digitalGovernment.onlineServicesAvailability}/><Row label="Digital Identity System" value={d.digitalGovernment.digitalIdentitySystem}/><Row label="Open Data Policy" value={d.digitalGovernment.openDataPolicy}/><Row label="Digital Currency Status" value={d.digitalGovernment.digitalCurrencyStatus}/><Row label="Citizen Digital Engagement" value={d.digitalGovernment.citizenDigitalEngagement}/>
                    {d.digitalGovernment.smartCityPrograms?.length>0&&<div className="mt-3">{d.digitalGovernment.smartCityPrograms.map((p:string,i:number)=><Tag key={i} t={p} c="blue"/>)}</div>}
                </Sec>
            </div>}

            {tab==='manufacturing' && d.manufacturing && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Tech Manufacturing" icon={<Cpu className="w-4 h-4 text-stone-500"/>}>
                    <Row label="Electronics Production" value={d.manufacturing.electronicsProduction}/><Row label="Robotics Index" value={d.manufacturing.roboticsIndex} hi/><Row label="Automation Level" value={d.manufacturing.automationLevel}/><Row label="Industry 4.0 Adoption" value={d.manufacturing.industryFourPointZeroAdoption}/><Row label="Tech Manufacturing Exports" value={d.manufacturing.manufacturingTechExports}/>
                    {d.manufacturing.techManufacturingHubs?.length>0&&<div className="mt-3">{d.manufacturing.techManufacturingHubs.map((h:string,i:number)=><Tag key={i} t={h}/>)}</div>}
                </Sec>
            </div>}
        </div>
    );
};
