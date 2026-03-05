import React, { useState } from 'react';
import { Camera, MapPin, Plane, Star, Hotel, Utensils, ShoppingBag, Shield, Info, Map, Globe, Sun } from 'lucide-react';

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
    return <div className={`flex justify-between items-start py-1 border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${hi?'bg-sky-50/60 dark:bg-sky-900/10 -mx-1 px-1 rounded':''}`}>
        <span className="text-xs text-stone-500 flex-1 pr-2">{label}</span>
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[55%]">{value}</span>
    </div>;
};
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='sky'?'bg-sky-50 dark:bg-sky-900/20 text-sky-700 border-sky-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':c==='amber'?'bg-amber-50 dark:bg-amber-900/20 text-amber-700 border-amber-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','attractions','heritage','cities','accommodations','food','shopping','transport','visa','entry','safety','practical','adventure','cultural','sustainability'];

export const TourismProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Annual Visitors</div><div className="text-lg font-bold text-sky-600">{d.annualVisitors||"N/A"}</div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Tourism Revenue</div><div className="text-lg font-bold text-green-600">{d.tourismRevenue||"N/A"}</div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">% of GDP</div><div className="text-lg font-bold text-amber-600">{d.tourismGDPPercent||"N/A"}</div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800"><div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Tourism Rank</div><div className="text-lg font-bold text-indigo-600">{d.globalTourismRank||"N/A"}</div></div>
            </div>
            {d.topSourceCountries?.length>0&&<div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Top Source Countries</div><div className="flex flex-wrap">{d.topSourceCountries.map((c:string,i:number)=><Tag key={i} t={c} c="sky"/>)}</div></div>}
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-sky-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.attractions?.slice(0,4).length>0&&<Sec title="Top Attractions" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.attractions.slice(0,4).map((a:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs text-sky-600">{a.name}</div><div className="flex items-center gap-1 text-[10px] text-stone-500 mt-0.5"><MapPin className="w-3 h-3"/>{a.type} | {a.location}</div><div className="text-[10px] text-stone-400 mt-0.5">{a.description?.slice(0,80)}...</div></div>)}</Sec>}
                {d.practicalInfo&&<Sec title="Quick Facts" icon={<Info className="w-4 h-4 text-blue-500"/>}><Row label="Best Time to Visit" value={d.practicalInfo.bestTimeToVisit} hi/><Row label="Currency" value={d.practicalInfo.currency}/><Row label="Avg Budget/Day" value={d.practicalInfo.avgTravelBudgetPerDay}/><Row label="Language Barrier" value={d.practicalInfo.languageBarrier}/><Row label="Driving Side" value={d.practicalInfo.drivingSide}/><Row label="Time Zone" value={d.practicalInfo.timeZone}/><Row label="Power Plug" value={d.practicalInfo.powerPlug}/></Sec>}
                {d.safety&&<Sec title="Safety Overview" icon={<Shield className="w-4 h-4 text-green-500"/>}><Row label="Overall Safety" value={d.safety.overallSafetyRating} hi/><Row label="Solo Female Safety" value={d.safety.safetForSoloFemale}/><Row label="LGBTQ+ Safety" value={d.safety.safetyForLGBTQ}/><Row label="Natural Disaster Risk" value={d.safety.naturalDisasterRiskForTourists}/></Sec>}
            </div>}

            {tab==='attractions' && d.attractions?.length>0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {d.attractions.map((a:any,i:number)=><div key={i} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden"><div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white"><div className="font-bold text-sm">{a.name}</div><div className="text-xs opacity-80 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/>{a.type} | {a.location}</div></div><div className="p-4"><Row label="Description" value={a.description}/><Row label="UNESCO Status" value={a.unescoStatus}/><Row label="Annual Visitors" value={a.annualVisitors}/><Row label="Best Time" value={a.bestTimeToVisit}/><Row label="Entry Fee" value={a.entryFee}/></div></div>)}
            </div>}

            {tab==='heritage' && <div className="grid grid-cols-1 gap-3">
                {d.unescoSites?.length>0&&<Sec title="UNESCO World Heritage Sites" icon={<Globe className="w-4 h-4 text-amber-500"/>}><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{d.unescoSites.map((s:any,i:number)=><div key={i} className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg"><div className="font-bold text-xs text-amber-700">{s.name}</div><div className="text-[10px] text-stone-500">{s.type} | Inscribed {s.inscribed}</div><div className="text-[10px] text-stone-400 mt-0.5">{s.location}</div><div className="text-xs text-stone-600 mt-1">{s.description}</div></div>)}</div></Sec>}
                {d.historicSites?.length>0&&<Sec title="Historic Sites" icon={<Map className="w-4 h-4 text-stone-500"/>}><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{d.historicSites.map((s:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded"><div className="font-bold text-xs">{s.name}</div><div className="text-[10px] text-stone-500">{s.era} | {s.location}</div><div className="text-xs text-stone-400 mt-0.5">{s.significance}</div></div>)}</div></Sec>}
            </div>}

            {tab==='cities' && d.topCitiesForTourism?.length>0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.topCitiesForTourism.map((city:any,i:number)=><div key={i} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"><div className="font-bold text-sm text-sky-600 mb-1">{city.city}</div><div className="text-xs text-stone-500 mb-2">Best for: {city.bestFor} | Hotels avg: {city.avgHotelCost}</div>{city.highlights?.map((h:string,j:number)=><div key={j} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {h}</div>)}</div>)}
            </div>}

            {tab==='accommodations' && d.accommodations && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Accommodation Overview" icon={<Hotel className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Total Hotels" value={d.accommodations.totalHotels}/><Row label="Luxury Hotels" value={d.accommodations.luxuryHotels}/><Row label="Budget Options" value={d.accommodations.budgetAccommodations}/><Row label="Avg Night Cost" value={d.accommodations.avgNightCost} hi/>
                    {d.accommodations.uniqueAccommodations?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Unique Stays</div>{d.accommodations.uniqueAccommodations.map((u:string,i:number)=><Tag key={i} t={u} c="amber"/>)}</div>}
                </Sec>
                {d.accommodations.topLuxuryHotels?.length>0&&<Sec title="Top Luxury Hotels" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.accommodations.topLuxuryHotels.map((h:any,i:number)=><div key={i} className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded mb-2"><div className="font-bold text-xs">{h.name}</div><div className="text-[10px] text-stone-500">{h.location} | {'⭐'.repeat(parseInt(h.stars||'5'))}</div><div className="text-[10px] text-stone-400">{h.specialFeature}</div></div>)}</Sec>}
            </div>}

            {tab==='food' && d.cuisine && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.cuisine.mustTryDishes?.length>0&&<Sec title="Must-Try Dishes" icon={<Utensils className="w-4 h-4 text-orange-500"/>}>{d.cuisine.mustTryDishes.map((dish:any,i:number)=><div key={i} className="p-2 bg-orange-50 dark:bg-orange-900/10 rounded mb-1"><div className="font-bold text-xs text-orange-700">{dish.dish}</div><div className="text-[10px] text-stone-500">{dish.region} | Try at: {dish.whereToTry}</div><div className="text-xs text-stone-400 mt-0.5">{dish.description}</div></div>)}</Sec>}
                {d.cuisine.topRestaurants?.length>0&&<Sec title="Top Restaurants" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.cuisine.topRestaurants.map((r:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{r.name}</div><div className="text-[10px] text-stone-500">{r.city} | {r.cuisine} | {r.priceRange}</div></div>)}</Sec>}
                {d.cuisine.foodStreets?.length>0&&<Sec title="Food Streets" icon={<MapPin className="w-4 h-4 text-red-500"/>}>{d.cuisine.foodStreets.map((s:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{s.name}</div><div className="text-[10px] text-stone-500">{s.city} — {s.specialty}</div></div>)}</Sec>}
                {d.cuisine.localBeverages?.length>0&&<Sec title="Local Beverages" icon={<Utensils className="w-4 h-4 text-amber-500"/>}>{d.cuisine.localBeverages.map((b:string,i:number)=><Tag key={i} t={b} c="amber"/>)}</Sec>}
            </div>}

            {tab==='shopping' && d.shopping && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Shopping Guide" icon={<ShoppingBag className="w-4 h-4 text-purple-500"/>}>
                    <Row label="Tax-Free Shopping" value={d.shopping.taxFreeShoppingAvailable}/><Row label="Shop Hours" value={d.shopping.shopOpenHours}/><Row label="Luxury Shopping Index" value={d.shopping.luxuryShoppingIndex}/>
                    {d.shopping.souvenirs?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Best Souvenirs</div>{d.shopping.souvenirs.map((s:string,i:number)=><Tag key={i} t={s}/>)}</div>}
                </Sec>
                {d.shopping.topShoppingDistricts?.length>0&&<Sec title="Shopping Districts" icon={<MapPin className="w-4 h-4 text-indigo-500"/>}>{d.shopping.topShoppingDistricts.map((s:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{s.name}</div><div className="text-[10px] text-stone-500">{s.city} — {s.specialty}</div></div>)}{d.shopping.traditionalMarkets?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Traditional Markets</div>{d.shopping.traditionalMarkets.map((m:any,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {m.name} — {m.city}</div>)}</div>}</Sec>}
            </div>}

            {tab==='transport' && d.transportation && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Transportation" icon={<Plane className="w-4 h-4 text-sky-500"/>}>
                    <Row label="Rail Network" value={d.transportation.railNetwork}/><Row label="High Speed Rail" value={d.transportation.highSpeedRail}/><Row label="Road Quality" value={d.transportation.roadQuality}/><Row label="Public Transport Quality" value={d.transportation.publicTransportQuality}/><Row label="Taxi System" value={d.transportation.taxiSystem}/><Row label="Car Rental" value={d.transportation.rentaCarAvailability}/><Row label="Driving Side" value={d.transportation.drivingSide}/><Row label="Intl Driving License" value={d.transportation.internationalDrivingLicense}/>
                    {d.transportation.rideshareApps?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Rideshare Apps</div>{d.transportation.rideshareApps.map((app:string,i:number)=><Tag key={i} t={app} c="sky"/>)}</div>}
                </Sec>
                {d.transportation.majorAirports?.length>0&&<Sec title="Major Airports" icon={<Plane className="w-4 h-4 text-indigo-500"/>}>{d.transportation.majorAirports.map((a:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{a.name} ({a.code})</div><div className="text-[10px] text-stone-500">{a.city} | {a.type}</div></div>)}{d.transportation.mainAirlines?.length>0&&<div className="mt-3">{d.transportation.mainAirlines.map((air:string,i:number)=><Tag key={i} t={air}/>)}</div>}</Sec>}
            </div>}

            {tab==='visa' && d.visaRequirements && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Visa Information" icon={<Globe className="w-4 h-4 text-blue-500"/>}>
                    <Row label="E-Visa Available" value={d.visaRequirements.eVisaAvailable}/><Row label="Visa Application" value={d.visaRequirements.visaApplicationProcess}/><Row label="Visa Fee" value={d.visaRequirements.visaFee}/><Row label="Max Stay" value={d.visaRequirements.maxStayWithVisa}/><Row label="Multiple Entry" value={d.visaRequirements.multipleEntryOptions}/>
                    {d.visaRequirements.typesOfVisa?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Visa Types</div>{d.visaRequirements.typesOfVisa.map((v:string,i:number)=><Tag key={i} t={v}/>)}</div>}
                    {d.visaRequirements.visaFreeCountries?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Visa-Free Countries</div><div className="flex flex-wrap">{d.visaRequirements.visaFreeCountries.map((c:string,i:number)=><Tag key={i} t={c} c="green"/>)}</div></div>}
                    {d.visaRequirements.visaOnArrivalCountries?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Visa on Arrival</div><div className="flex flex-wrap">{d.visaRequirements.visaOnArrivalCountries.map((c:string,i:number)=><Tag key={i} t={c} c="sky"/>)}</div></div>}
                </Sec>
            </div>}

            {tab==='entry' && d.entryRequirements && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Entry Requirements" icon={<Shield className="w-4 h-4 text-green-500"/>}>
                    <Row label="Passport Validity Required" value={d.entryRequirements.passportValidity}/><Row label="Currency Declaration" value={d.entryRequirements.currencyDeclaration}/><Row label="Insurance Required" value={d.entryRequirements.insuranceRequirement}/><Row label="Onward Ticket Required" value={d.entryRequirements.onwardTicketRequired}/>
                    {d.entryRequirements.vaccinationRequirements?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Vaccination Requirements</div>{d.entryRequirements.vaccinationRequirements.map((v:string,i:number)=><Tag key={i} t={v} c="green"/>)}</div>}
                    {d.entryRequirements.customsRestrictions?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Customs Restrictions</div>{d.entryRequirements.customsRestrictions.map((r:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {r}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='safety' && d.safety && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Safety for Tourists" icon={<Shield className="w-4 h-4 text-green-500"/>}>
                    <Row label="Overall Safety Rating" value={d.safety.overallSafetyRating} hi/><Row label="Solo Female Safety" value={d.safety.safetForSoloFemale}/><Row label="LGBTQ+ Safety" value={d.safety.safetyForLGBTQ}/><Row label="Advisory" value={d.safety.tourismSafetyAdvisory}/><Row label="Natural Disaster Risk" value={d.safety.naturalDisasterRiskForTourists}/>
                    {d.safety.emergencyNumbers&&<div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg"><div className="text-[10px] font-bold uppercase text-red-600 mb-2">Emergency Numbers</div><div className="grid grid-cols-2 gap-1">{Object.entries(d.safety.emergencyNumbers).map(([key,val]:any)=><div key={key} className="text-xs"><span className="capitalize">{key}: </span><span className="font-mono font-bold">{val}</span></div>)}</div></div>}
                    {d.safety.commonScams?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Common Scams</div>{d.safety.commonScams.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">⚠️ {s}</div>)}</div>}
                    {d.safety.healthRisksForTourists?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Health Risks</div>{d.safety.healthRisksForTourists.map((r:string,i:number)=><Tag key={i} t={r}/>)}</div>}
                </Sec>
            </div>}

            {tab==='practical' && d.practicalInfo && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Practical Information" icon={<Info className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Currency" value={d.practicalInfo.currency}/><Row label="Exchange Rate (USD)" value={d.practicalInfo.exchangeRateUSD}/><Row label="Best Time to Visit" value={d.practicalInfo.bestTimeToVisit} hi/><Row label="Peak Season" value={d.practicalInfo.peakSeason}/><Row label="Shoulder Season" value={d.practicalInfo.shoulderSeason}/><Row label="Off Season" value={d.practicalInfo.offSeason}/><Row label="Avg Budget/Day" value={d.practicalInfo.avgTravelBudgetPerDay}/><Row label="Tipping Culture" value={d.practicalInfo.tipingCulture}/><Row label="Bargaining Culture" value={d.practicalInfo.bargainingCulture}/><Row label="Language Barrier" value={d.practicalInfo.languageBarrier}/><Row label="Power Plug" value={d.practicalInfo.powerPlug}/><Row label="Time Zone" value={d.practicalInfo.timeZone}/><Row label="Dress Code" value={d.practicalInfo.dressCode}/><Row label="Photography Rules" value={d.practicalInfo.photographyRules}/><Row label="Alcohol Laws" value={d.practicalInfo.alcoholLaws}/>
                </Sec>
                {d.practicalInfo.usefulPhrases?.length>0&&<Sec title="Useful Phrases" icon={<Globe className="w-4 h-4 text-amber-500"/>}>{d.practicalInfo.usefulPhrases.map((p:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="font-bold text-sky-600">{p.phrase}</span><span className="text-stone-500">{p.meaning}</span></div>)}</Sec>}
            </div>}

            {tab==='adventure' && d.adventureTourism && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Adventure Activities" icon={<Sun className="w-4 h-4 text-orange-500"/>}>
                    {d.adventureTourism.activities?.length>0&&<div className="mb-4">{d.adventureTourism.activities.map((a:string,i:number)=><Tag key={i} t={a} c="amber"/>)}</div>}
                    <Row label="Trekking" value={d.adventureTourism.trekking}/><Row label="Diving" value={d.adventureTourism.diving}/><Row label="Skiing" value={d.adventureTourism.skiing}/><Row label="Safaris" value={d.adventureTourism.safaris}/>
                </Sec>
                {d.adventureTourism.topAdventureSites?.length>0&&<Sec title="Top Adventure Sites" icon={<MapPin className="w-4 h-4 text-red-500"/>}>{d.adventureTourism.topAdventureSites.map((s:any,i:number)=><div key={i} className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded mb-2"><div className="font-bold text-xs text-orange-700">{s.site}</div><div className="text-[10px] text-stone-500">{s.activity} | {s.difficulty} | {s.season}</div></div>)}</Sec>}
            </div>}

            {tab==='cultural' && d.culturalTourism && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.culturalTourism.festivals?.length>0&&<Sec title="Festivals" icon={<Star className="w-4 h-4 text-purple-500"/>}>{d.culturalTourism.festivals.map((f:any,i:number)=><div key={i} className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded mb-2"><div className="font-bold text-xs text-purple-700">{f.name}</div><div className="text-[10px] text-stone-500">{f.month} | {f.location} | {f.attendance}</div><div className="text-xs text-stone-400 mt-0.5">{f.description}</div></div>)}</Sec>}
                <div className="space-y-4">
                    {d.culturalTourism.museums?.length>0&&<Sec title="Top Museums" icon={<Camera className="w-4 h-4 text-stone-500"/>}>{d.culturalTourism.museums.map((m:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {m}</div>)}</Sec>}
                    {d.culturalTourism.religiousSites?.length>0&&<Sec title="Religious Sites" icon={<Globe className="w-4 h-4 text-amber-500"/>}>{d.culturalTourism.religiousSites.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {s}</div>)}</Sec>}
                </div>
            </div>}

            {tab==='sustainability' && d.sustainability && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Sustainable Tourism" icon={<Globe className="w-4 h-4 text-green-500"/>}>
                    <Row label="Eco-Tourism Rating" value={d.sustainability.ecoTourismRating} hi/><Row label="Green Hotels" value={d.sustainability.greenHotels}/><Row label="Carbon Offset Programs" value={d.sustainability.carbonOffsetPrograms}/><Row label="Overtourism Concerns" value={d.sustainability.overtourismConcerns}/><Row label="Responsible Tourism Code" value={d.sustainability.responsibleTourismCode}/>
                    {d.sustainability.sustainableTourismInitiatives?.length>0&&<div className="mt-3">{d.sustainability.sustainableTourismInitiatives.map((i:string,idx:number)=><div key={idx} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {i}</div>)}</div>}
                </Sec>
            </div>}
        </div>
    );
};
