import React, { useState } from 'react';
import { Leaf, Wind, CloudRain, AlertTriangle, Zap, Droplets, TreePine, Globe, BarChart2, Sun, Fish, Shield, Thermometer, Factory, Recycle, Mountain } from 'lucide-react';
import { DetailCard } from '../shared/DetailCard';

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
    return <div className={`flex justify-between items-start py-1 border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${hi ? 'bg-amber-50/60 dark:bg-amber-900/10 -mx-1 px-1 rounded' : ''}`}>
        <span className="text-xs text-stone-500 flex-1 pr-2">{label}</span>
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[55%]">{value}</span>
    </div>;
};
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c = 'stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='red'?'bg-red-50 dark:bg-red-900/20 text-red-700 border-red-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':c==='blue'?'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200':c==='amber'?'bg-amber-50 dark:bg-amber-900/20 text-amber-700 border-amber-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','climate','airwater','biodiversity','forests','carbon','energy','waste','disasters','policy','indicators','agriculture','urban'];

export const EnvironmentProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <DetailCard label="CO₂ Emissions" value={d.co2Emissions||"N/A"} icon={Wind} subValue="Per Capita" />
                <DetailCard label="Forest Cover" value={d.forestCover||"N/A"} icon={Leaf} subValue="Of Land Area" />
                <DetailCard label="Air Quality" value={d.airQualityIndex||"N/A"} icon={CloudRain} subValue="AQI" />
                <DetailCard label="Total Emissions" value={d.totalEmissions||"N/A"} icon={Factory} subValue="Annual" />
            </div>
            {d.policy && <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl"><div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1"><Shield className="w-3 h-3"/>Climate Policy</div><p className="text-sm font-serif leading-relaxed text-stone-700 dark:text-stone-300">{d.policy}</p></div>}
            {d.threats?.length>0 && <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"><div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>Environmental Threats</div><div className="grid grid-cols-1 md:grid-cols-2 gap-1">{d.threats.map((t:string,i:number)=><div key={i} className="flex items-start gap-2 text-sm font-serif"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"/>{t}</div>)}</div></div>}
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-emerald-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.climate&&<Sec title="Climate" icon={<Thermometer className="w-4 h-4 text-orange-500"/>}><Row label="Classification" value={d.climate.classification}/><Row label="Avg Temp" value={d.climate.avgAnnualTemp}/><Row label="Rainfall" value={d.climate.avgAnnualRainfall}/><Row label="CC Vulnerability" value={d.climate.climateChangeVulnerability} hi/></Sec>}
                {d.carbonProfile&&<Sec title="Carbon" icon={<Factory className="w-4 h-4 text-gray-500"/>}><Row label="Total Emissions" value={d.carbonProfile.totalEmissions}/><Row label="Per Capita" value={d.carbonProfile.perCapitaEmissions}/><Row label="Trend" value={d.carbonProfile.emissionsTrend}/><Row label="Net Zero Target" value={d.carbonProfile.netZeroTarget} hi/></Sec>}
                {d.energy&&<Sec title="Energy" icon={<Zap className="w-4 h-4 text-yellow-500"/>}><Row label="Renewable Share" value={d.energy.renewableSharePercent} hi/><Row label="Solar" value={d.energy.solarCapacityGW}/><Row label="Wind" value={d.energy.windCapacityGW}/><Row label="Energy Security" value={d.energy.energySecurity}/></Sec>}
                {d.ecologicalIndicators&&<Sec title="EPI Indicators" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}><Row label="EPI Score" value={d.ecologicalIndicators.epiScore}/><Row label="Global Rank" value={d.ecologicalIndicators.epiRank} hi/><Row label="Ecological Footprint" value={d.ecologicalIndicators.ecologicalFootprint}/><Row label="Biocapacity" value={d.ecologicalIndicators.biocapacity}/></Sec>}
                {d.biodiversity&&<Sec title="Biodiversity" icon={<Fish className="w-4 h-4 text-teal-500"/>}><Row label="Mammals" value={d.biodiversity.totalMammalSpecies}/><Row label="Birds" value={d.biodiversity.totalBirdSpecies}/><Row label="Plants" value={d.biodiversity.totalVascularPlantSpecies}/><Row label="Endangered" value={d.biodiversity.endangeredCount} hi/></Sec>}
                {d.forests&&<Sec title="Forests" icon={<TreePine className="w-4 h-4 text-green-600"/>}><Row label="Forest Cover" value={d.forests.forestCoverPercent}/><Row label="Deforestation Rate" value={d.forests.deforestationRate} hi/><Row label="Net Change" value={d.forests.netForestChange}/><Row label="Carbon Stock" value={d.forests.carbonStockValue}/></Sec>}
            </div>}

            {tab==='climate' && d.climate && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Climate Statistics" icon={<Thermometer className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Classification" value={d.climate.classification}/><Row label="Avg Annual Temp" value={d.climate.avgAnnualTemp}/><Row label="Avg Annual Rainfall" value={d.climate.avgAnnualRainfall}/><Row label="Avg Humidity" value={d.climate.avgHumidity}/><Row label="Avg Wind Speed" value={d.climate.avgWindSpeed}/><Row label="Hottest Month" value={d.climate.hottestMonth}/><Row label="Coldest Month" value={d.climate.coldestMonth}/><Row label="Wettest Month" value={d.climate.wettestMonth}/><Row label="Drought Risk" value={d.climate.droughtRisk}/><Row label="Flood Risk" value={d.climate.floodRisk}/><Row label="CC Vulnerability" value={d.climate.climateChangeVulnerability} hi/><Row label="Temp Rise (Pre-Industrial)" value={d.climate.temperatureRiseSincePreIndustrial}/><Row label="Projected Rise 2100" value={d.climate.projectedTempRise2100}/><Row label="Sea Level Rise Risk" value={d.climate.seaLevelRiseRisk}/>
                </Sec>
                <Sec title="Seasons & Zones" icon={<Sun className="w-4 h-4 text-yellow-500"/>}>
                    {d.climate.climateZones?.length>0&&<div className="mb-3">{d.climate.climateZones.map((z:string,i:number)=><Tag key={i} t={z} c="blue"/>)}</div>}
                    {d.climate.seasons?.map((s:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs text-emerald-600">{s.name} — {s.months}</div><div className="text-[10px] text-stone-500 mt-1">{s.avgTemp} | {s.characteristics}</div></div>)}
                </Sec>
            </div>}

            {tab==='airwater' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.airQuality&&<Sec title="Air Quality" icon={<Wind className="w-4 h-4 text-sky-500"/>}>
                    <Row label="National AQI" value={d.airQuality.nationalAQI}/><Row label="PM2.5" value={d.airQuality.pm25Level}/><Row label="PM10" value={d.airQuality.pm10Level}/><Row label="NO₂" value={d.airQuality.no2Level}/><Row label="Ozone" value={d.airQuality.ozoneLevel}/><Row label="SO₂" value={d.airQuality.so2Level}/><Row label="CO" value={d.airQuality.coLevel}/><Row label="Global AQ Rank" value={d.airQuality.airQualityRank}/><Row label="Deaths from Air Pollution" value={d.airQuality.annualDeathsFromAirPollution} hi/><Row label="Health Impact" value={d.airQuality.healthImpact}/>
                    {d.airQuality.industrialPollutionSources?.length>0&&<div className="mt-3">{d.airQuality.industrialPollutionSources.map((s:string,i:number)=><Tag key={i} t={s} c="red"/>)}</div>}
                    {d.airQuality.pollutedCities?.map((c:any,i:number)=><div key={i} className="flex justify-between text-xs py-1 border-b border-stone-50 dark:border-stone-800 last:border-0"><span>{c.city}</span><span className="text-red-500 font-mono">{c.aqi}</span></div>)}
                </Sec>}
                {d.water&&<Sec title="Water Resources" icon={<Droplets className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Water Stress Level" value={d.water.waterStressLevel}/><Row label="Drinking Water Access" value={d.water.drinkingWaterAccess}/><Row label="Sanitation Access" value={d.water.sanitationAccess}/><Row label="Treatment Capacity" value={d.water.waterTreatmentCapacity}/><Row label="Groundwater Status" value={d.water.groundwaterStatus}/><Row label="Water Quality Index" value={d.water.waterQualityIndex}/><Row label="Coastline Length" value={d.water.coastlineLength}/><Row label="EEZ" value={d.water.exclusiveEconomicZone}/><Row label="Ocean Pollution" value={d.water.oceanPollutionLevel}/><Row label="Coral Reef Status" value={d.water.coralReefStatus}/><Row label="Fishing Pressure" value={d.water.fishingPressure}/>
                    {d.water.majorRivers?.map((r:any,i:number)=><div key={i} className="p-2 bg-blue-50 dark:bg-blue-900/10 rounded mb-1 mt-2"><div className="font-bold text-xs text-blue-600">{r.name} — {r.length}</div><div className="text-[10px] text-stone-500">{r.significance}</div></div>)}
                    {d.water.majorLakes?.map((l:any,i:number)=><div key={i} className="flex justify-between text-xs py-1 border-b border-stone-50 dark:border-stone-800 last:border-0"><span>{l.name}</span><span className="text-stone-500">{l.area}</span></div>)}
                </Sec>}
            </div>}

            {tab==='biodiversity' && d.biodiversity && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Species Count" icon={<Fish className="w-4 h-4 text-teal-500"/>}>
                    <Row label="Vascular Plants" value={d.biodiversity.totalVascularPlantSpecies}/><Row label="Mammals" value={d.biodiversity.totalMammalSpecies}/><Row label="Birds" value={d.biodiversity.totalBirdSpecies}/><Row label="Reptiles" value={d.biodiversity.totalReptileSpecies}/><Row label="Amphibians" value={d.biodiversity.totalAmphibianSpecies}/><Row label="Fish" value={d.biodiversity.totalFishSpecies}/><Row label="Insects" value={d.biodiversity.totalInsectSpecies}/><Row label="Endemic Species" value={d.biodiversity.endemicSpeciesCount}/><Row label="Critically Endangered" value={d.biodiversity.criticallyEndangeredCount} hi/><Row label="Endangered" value={d.biodiversity.endangeredCount}/><Row label="Vulnerable" value={d.biodiversity.vulnerableCount}/><Row label="Biodiversity Hotspot" value={d.biodiversity.biodiversityHotspot?"Yes ✓":"No"}/>
                    {d.biodiversity.flagshipSpecies?.length>0&&<div className="mt-2">{d.biodiversity.flagshipSpecies.map((s:string,i:number)=><Tag key={i} t={s} c="green"/>)}</div>}
                    {d.biodiversity.invasiveSpecies?.length>0&&<div className="mt-2">{d.biodiversity.invasiveSpecies.map((s:string,i:number)=><Tag key={i} t={s} c="amber"/>)}</div>}
                </Sec>
                <div className="space-y-4">
                    {d.biodiversity.endangeredSpecies?.length>0&&<Sec title="Endangered Species" icon={<AlertTriangle className="w-4 h-4 text-red-500"/>}>{d.biodiversity.endangeredSpecies.map((s:any,i:number)=><div key={i} className="p-2 bg-red-50 dark:bg-red-900/10 rounded mb-1"><div className="font-bold text-xs text-red-600">{s.name} — {s.status}</div><div className="text-[10px] text-stone-500">{s.threat}</div></div>)}</Sec>}
                    {d.protectedAreas&&<Sec title="Protected Areas" icon={<Shield className="w-4 h-4 text-emerald-500"/>}><Row label="Protected Land %" value={d.protectedAreas.totalProtectedLandPercent}/><Row label="Protected Marine %" value={d.protectedAreas.totalProtectedMarinePercent}/>{d.protectedAreas.nationalParks?.map((p:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1 mt-2"><div className="font-bold text-xs text-emerald-600">{p.name}</div><div className="text-[10px] text-stone-500">{p.area} | Est. {p.established}</div><div className="text-[10px] text-stone-400">{p.features}</div></div>)}{d.protectedAreas.worldHeritageSitesNatural?.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-academic-gold">• {s}</div>)}</Sec>}
                </div>
            </div>}

            {tab==='forests' && d.forests && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Forest Statistics" icon={<TreePine className="w-4 h-4 text-green-600"/>}>
                    <Row label="Total Forest Area" value={d.forests.totalForestArea}/><Row label="Forest Cover %" value={d.forests.forestCoverPercent}/><Row label="Primary Forest %" value={d.forests.primaryForestPercent}/><Row label="Deforestation Rate" value={d.forests.deforestationRate} hi/><Row label="Reforestation Rate" value={d.forests.reforestationRate}/><Row label="Net Forest Change" value={d.forests.netForestChange}/><Row label="Carbon Stock Value" value={d.forests.carbonStockValue}/><Row label="Illegal Logging" value={d.forests.illegalLogging}/><Row label="Governance Rating" value={d.forests.forestGovernanceRating}/>
                    {d.forests.forestTypes?.length>0&&<div className="mt-2">{d.forests.forestTypes.map((t:string,i:number)=><Tag key={i} t={t} c="green"/>)}</div>}
                    {d.forests.majorTimberSpecies?.length>0&&<div className="mt-2">{d.forests.majorTimberSpecies.map((s:string,i:number)=><Tag key={i} t={s}/>)}</div>}
                </Sec>
                {d.forests.reforestationPrograms?.length>0&&<Sec title="Reforestation Programs" icon={<Leaf className="w-4 h-4 text-green-500"/>}>{d.forests.reforestationPrograms.map((p:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs">{p.name}</div><div className="text-[10px] text-stone-500">Target: {p.target} | Progress: {p.progress}</div></div>)}</Sec>}
            </div>}

            {tab==='carbon' && d.carbonProfile && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Carbon Emissions" icon={<Factory className="w-4 h-4 text-gray-500"/>}>
                    <Row label="Total Emissions" value={d.carbonProfile.totalEmissions}/><Row label="Per Capita" value={d.carbonProfile.perCapitaEmissions}/><Row label="Trend" value={d.carbonProfile.emissionsTrend}/><Row label="Peak Emission Year" value={d.carbonProfile.peakEmissionYear}/><Row label="Carbon Intensity" value={d.carbonProfile.carbonIntensityGDP}/><Row label="Net Zero Target" value={d.carbonProfile.netZeroTarget} hi/><Row label="Carbon Neutrality Status" value={d.carbonProfile.carbonNeutralityStatus}/><Row label="Carbon Tax" value={d.carbonProfile.carbonTax}/><Row label="Emissions Trading" value={d.carbonProfile.emissionsTrading}/>
                    {d.carbonProfile.offsetPrograms?.map((p:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-500">• {p}</div>)}
                </Sec>
                {d.carbonProfile.emissionsBySource?.length>0&&<Sec title="Emissions by Source" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}>{d.carbonProfile.emissionsBySource.map((s:any,i:number)=><div key={i} className="mb-2"><div className="flex justify-between text-xs mb-0.5"><span>{s.source}</span><span className="font-mono font-bold">{s.percentage}</span></div><div className="h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full"><div className="h-1.5 bg-indigo-400 rounded-full" style={{width:s.percentage?.replace(/[^0-9.]/g,'')+'%'||'10%'}}></div></div></div>)}</Sec>}
            </div>}

            {tab==='energy' && d.energy && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Energy Mix" icon={<Zap className="w-4 h-4 text-yellow-500"/>}>
                    <Row label="Renewable Share" value={d.energy.renewableSharePercent} hi/><Row label="Fossil Fuel Share" value={d.energy.fossilFuelSharePercent}/><Row label="Solar Capacity" value={d.energy.solarCapacityGW}/><Row label="Wind Capacity" value={d.energy.windCapacityGW}/><Row label="Hydro Capacity" value={d.energy.hydroCapacityGW}/><Row label="Geothermal" value={d.energy.geothermalCapacityGW}/><Row label="Nuclear" value={d.energy.nuclearCapacityGW}/><Row label="Bioenergy" value={d.energy.bioenergyCapacityGW}/><Row label="Coal Dependency" value={d.energy.coalDependency}/><Row label="Oil Dependency" value={d.energy.oilDependency}/><Row label="Gas Dependency" value={d.energy.gasDependency}/><Row label="Import Dependency" value={d.energy.energyImportDependency}/><Row label="Energy Security" value={d.energy.energySecurity}/><Row label="Energy Per Capita" value={d.energy.energyPerCapita}/><Row label="Renewable Targets" value={d.energy.renewableEnergyTargets}/>
                </Sec>
                {d.energy.largestPowerPlants?.length>0&&<Sec title="Major Power Plants" icon={<Zap className="w-4 h-4 text-orange-500"/>}>{d.energy.largestPowerPlants.map((p:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs">{p.name}</div><div className="text-[10px] text-stone-500">{p.type} | {p.capacity} | {p.location}</div></div>)}{d.energy.greenHydrogenProjects?.map((p:string,i:number)=><div key={i} className="text-xs py-0.5 text-green-600">• {p}</div>)}</Sec>}
            </div>}

            {tab==='waste' && d.wasteManagement && <Sec title="Waste Management" icon={<Recycle className="w-4 h-4 text-emerald-500"/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Row label="Municipal Waste/Capita" value={d.wasteManagement.municipalWastePerCapita}/><Row label="Recycling Rate" value={d.wasteManagement.recyclingRate} hi/><Row label="Composting Rate" value={d.wasteManagement.compostingRate}/><Row label="Landfill Rate" value={d.wasteManagement.landfillRate}/><Row label="Incineration Rate" value={d.wasteManagement.incinerationRate}/><Row label="Waste to Energy" value={d.wasteManagement.wasteToEnergyCapacity}/></div>
                    <div><Row label="Plastic Waste Generated" value={d.wasteManagement.plasticWasteGenerated}/><Row label="Plastic Recycling" value={d.wasteManagement.plasticRecyclingRate}/><Row label="E-Waste Generated" value={d.wasteManagement.eWasteGenerated}/><Row label="E-Waste Recycled" value={d.wasteManagement.eWasteRecycled}/><Row label="Ocean Plastic" value={d.wasteManagement.oceanPlasticContribution}/><Row label="Single-Use Plastic Ban" value={d.wasteManagement.singleUsePlasticBan}/><Row label="Circular Economy Policy" value={d.wasteManagement.circularEconomyPolicy}/></div>
                </div>
            </Sec>}

            {tab==='disasters' && d.naturalDisasters && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Disaster Risk Profile" icon={<AlertTriangle className="w-4 h-4 text-red-500"/>}>
                    <Row label="Overall Risk Level" value={d.naturalDisasters.overallRiskLevel} hi/><Row label="Earthquake Risk" value={d.naturalDisasters.earthquakeRisk}/><Row label="Volcanic Risk" value={d.naturalDisasters.volcanicRisk}/><Row label="Tsunami Risk" value={d.naturalDisasters.tsunamiRisk}/><Row label="Hurricane Risk" value={d.naturalDisasters.hurricaneRisk}/><Row label="Flood Risk" value={d.naturalDisasters.floodRisk}/><Row label="Drought Risk" value={d.naturalDisasters.droughtRisk}/><Row label="Wildfire Risk" value={d.naturalDisasters.wildfireRisk}/><Row label="Landslide Risk" value={d.naturalDisasters.landslideRisk}/><Row label="Preparedness Score" value={d.naturalDisasters.disasterPreparednessScore}/><Row label="Early Warning System" value={d.naturalDisasters.earlyWarningSystem}/><Row label="Management Agency" value={d.naturalDisasters.disasterManagementAgency}/>
                    {d.naturalDisasters.commonDisasters?.length>0&&<div className="mt-2">{d.naturalDisasters.commonDisasters.map((ds:string,i:number)=><Tag key={i} t={ds} c="amber"/>)}</div>}
                </Sec>
                {d.naturalDisasters.recentDisasters?.length>0&&<Sec title="Recent Disasters" icon={<AlertTriangle className="w-4 h-4 text-orange-500"/>}>{d.naturalDisasters.recentDisasters.map((ds:any,i:number)=><div key={i} className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg mb-2"><div className="font-bold text-xs text-red-700">{ds.year} — {ds.event}</div><div className="text-[10px] text-stone-500 mt-1">Magnitude: {ds.magnitude} | Casualties: {ds.casualties}</div><div className="text-[10px] text-stone-500">Economic Loss: {ds.economicLoss}</div></div>)}</Sec>}
            </div>}

            {tab==='policy' && d.environmentalPolicy && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="International Commitments" icon={<Globe className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Paris Agreement" value={d.environmentalPolicy.parisAgreementStatus}/><Row label="NDC Target" value={d.environmentalPolicy.parisAgreementNDC} hi/><Row label="Kyoto Protocol" value={d.environmentalPolicy.kyotoProtocolStatus}/><Row label="Biodiversity Convention" value={d.environmentalPolicy.biodiversityConvention}/><Row label="Environment Ministry" value={d.environmentalPolicy.environmentMinistry}/><Row label="Environment Minister" value={d.environmentalPolicy.environmentMinister}/><Row label="Environment Budget" value={d.environmentalPolicy.environmentBudget}/><Row label="Green Bonds Issued" value={d.environmentalPolicy.greenBondsIssued}/><Row label="Climate Finance" value={d.environmentalPolicy.climateFinanceContribution}/><Row label="ESG Ranking" value={d.environmentalPolicy.esgRanking}/>
                    {d.environmentalPolicy.internationalEnvironmentalTreaties?.map((t:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-500">• {t}</div>)}
                </Sec>
                {d.environmentalPolicy.environmentalLaws?.length>0&&<Sec title="Environmental Laws" icon={<Shield className="w-4 h-4 text-green-500"/>}>{d.environmentalPolicy.environmentalLaws.map((l:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs">{l.name} <span className="text-stone-400 font-normal">({l.year})</span></div><div className="text-[10px] text-stone-500 mt-0.5">{l.purpose}</div></div>)}</Sec>}
            </div>}

            {tab==='indicators' && d.ecologicalIndicators && <Sec title="EPI Indicators" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Row label="EPI Score" value={d.ecologicalIndicators.epiScore}/><Row label="EPI Global Rank" value={d.ecologicalIndicators.epiRank} hi/><Row label="EPI Year" value={d.ecologicalIndicators.epiYear}/><Row label="Ecological Footprint" value={d.ecologicalIndicators.ecologicalFootprint}/><Row label="Biocapacity" value={d.ecologicalIndicators.biocapacity}/><Row label="Earth Overshoot Day" value={d.ecologicalIndicators.overshootDay}/><Row label="SDG Progress" value={d.ecologicalIndicators.sustainableDevelopmentGoalProgress}/></div>
                    <div><Row label="Env. Health Score" value={d.ecologicalIndicators.environmentalHealthScore}/><Row label="Ecosystem Vitality" value={d.ecologicalIndicators.ecosystemVitalityScore}/><Row label="Water Resource Score" value={d.ecologicalIndicators.waterResourceScore}/><Row label="Air Quality Score" value={d.ecologicalIndicators.airQualityScore}/><Row label="Biodiversity Score" value={d.ecologicalIndicators.biodiversityScore}/><Row label="Climate Change Score" value={d.ecologicalIndicators.climateChangeScore}/><Row label="Solid Waste Score" value={d.ecologicalIndicators.solidWasteScore}/></div>
                </div>
            </Sec>}

            {tab==='agriculture' && d.agriculture && <Sec title="Agricultural Overview" icon={<Leaf className="w-4 h-4 text-green-500"/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Row label="Agricultural Land" value={d.agriculture.agriculturalLandPercent}/><Row label="Arable Land" value={d.agriculture.arableLandPercent}/><Row label="Irrigated Land" value={d.agriculture.irrigatedLandArea}/><Row label="Organic Farming" value={d.agriculture.organicFarmingPercent}/><Row label="Pesticide Use" value={d.agriculture.pesticideUse}/><Row label="Fertilizer Use" value={d.agriculture.fertilizerUse}/><Row label="Soil Degradation" value={d.agriculture.soilDegradation} hi/><Row label="Food Security Index" value={d.agriculture.foodSecurityIndex}/><Row label="Agricultural Water Use" value={d.agriculture.agriculturalWaterUse}/><Row label="Subsidies" value={d.agriculture.agriSubsidies}/><Row label="Livestock Emissions" value={d.agriculture.livestockEmissions}/></div>
                    {d.agriculture.topCrops?.length>0&&<div><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Top Crops</div>{d.agriculture.topCrops.map((c:string,i:number)=><Tag key={i} t={c} c="green"/>)}</div>}
                </div>
            </Sec>}

            {tab==='urban' && d.urbanEnvironment && <Sec title="Urban Environment" icon={<Mountain className="w-4 h-4 text-stone-500"/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Row label="Green Space/Capita" value={d.urbanEnvironment.greenSpacePerCapita}/><Row label="Tree Canopy Cover" value={d.urbanEnvironment.treeCanopyCoverUrban}/><Row label="Urban Heat Island" value={d.urbanEnvironment.urbanHeatIslandEffect}/><Row label="Stormwater Management" value={d.urbanEnvironment.stormwaterManagement}/><Row label="Green Buildings" value={d.urbanEnvironment.greenBuildings}/><Row label="EV Adoption" value={d.urbanEnvironment.electricVehicleAdoption}/><Row label="Cycling Infrastructure" value={d.urbanEnvironment.cyclingInfrastructure}/><Row label="Noise Pollution" value={d.urbanEnvironment.noisePollutionLevel}/></div>
                    {d.urbanEnvironment.smartCityInitiatives?.length>0&&<div><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Smart City Initiatives</div>{d.urbanEnvironment.smartCityInitiatives.map((item:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {item}</div>)}</div>}
                </div>
            </Sec>}
        </div>
    );
};
