import React, { useState } from 'react';
import { Heart, Activity, Stethoscope, DollarSign, Shield, Baby, Pill, Brain, AlertTriangle, BarChart2, Microscope } from 'lucide-react';

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
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='red'?'bg-red-50 dark:bg-red-900/20 text-red-700 border-red-200':c==='blue'?'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','keystats','infrastructure','diseases','vaccinations','mental','maternal','nutrition','challenges','pharma','research'];

export const HealthProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg"><Heart className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Life Expectancy</div><div className="text-lg font-bold text-stone-800 dark:text-stone-100">{d.lifeExpectancy||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg"><Activity className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">System Type</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100 leading-tight">{d.healthcareSystem||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-lg"><DollarSign className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Expenditure</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100">{d.expenditure||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-lg"><BarChart2 className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Health Rank</div><div className="text-lg font-bold text-stone-800 dark:text-stone-100">{d.healthRank||"N/A"}</div></div></div>
            </div>
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-red-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Life Expectancy" icon={<Heart className="w-4 h-4 text-red-500"/>}>
                    <Row label="Overall" value={d.lifeExpectancy} hi/><Row label="Male" value={d.lifeExpectancyMale}/><Row label="Female" value={d.lifeExpectancyFemale}/><Row label="Healthy Life Expectancy" value={d.healthyLifeExpectancy}/>
                </Sec>
                {d.keyStats&&<Sec title="Key Health Statistics" icon={<Activity className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Infant Mortality Rate" value={d.keyStats.infantMortalityRate}/><Row label="Under-5 Mortality" value={d.keyStats.under5MortalityRate}/><Row label="Maternal Mortality" value={d.keyStats.maternalMortalityRate}/><Row label="Doctors per 1000" value={d.keyStats.doctorsPer1000}/><Row label="Nurses per 1000" value={d.keyStats.nursesPer1000}/><Row label="Hospital Beds per 1000" value={d.keyStats.hospitalBedsPer1000}/>
                </Sec>}
                {d.expenditureDetails&&<Sec title="Health Expenditure" icon={<DollarSign className="w-4 h-4 text-green-500"/>}>
                    <Row label="Total (% GDP)" value={d.expenditureDetails.totalHealthSpendingGDP}/><Row label="Per Capita (USD)" value={d.expenditureDetails.totalHealthSpendingPerCapita}/><Row label="Public Spending %" value={d.expenditureDetails.publicSpendingPercent}/><Row label="Private Spending %" value={d.expenditureDetails.privateSpendingPercent}/><Row label="Out-of-Pocket %" value={d.expenditureDetails.outOfPocketPercent}/><Row label="Pharmaceutical Spending" value={d.expenditureDetails.pharmaceuticalSpending}/><Row label="Mental Health Budget" value={d.expenditureDetails.mentalHealthBudget}/>
                </Sec>}
                {d.majorDiseases?.length>0&&<Sec title="Major Diseases" icon={<Stethoscope className="w-4 h-4 text-stone-500"/>}><div className="flex flex-wrap gap-1">{d.majorDiseases.map((dis:string,i:number)=><Tag key={i} t={dis} c="red"/>)}</div></Sec>}
            </div>}

            {tab==='keystats' && d.keyStats && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Vital Statistics" icon={<Activity className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Infant Mortality Rate" value={d.keyStats.infantMortalityRate}/><Row label="Under-5 Mortality" value={d.keyStats.under5MortalityRate} hi/><Row label="Maternal Mortality Rate" value={d.keyStats.maternalMortalityRate}/><Row label="Neonatal Mortality Rate" value={d.keyStats.neonatalMortalityRate}/><Row label="Birth Rate" value={d.keyStats.birthRate}/><Row label="Fertility Rate" value={d.keyStats.fertilityRate}/>
                </Sec>
                <Sec title="Healthcare Workforce" icon={<Stethoscope className="w-4 h-4 text-stone-500"/>}>
                    <Row label="Doctors per 1000" value={d.keyStats.doctorsPer1000} hi/><Row label="Nurses per 1000" value={d.keyStats.nursesPer1000}/><Row label="Hospital Beds per 1000" value={d.keyStats.hospitalBedsPer1000}/><Row label="Pharmacists per 1000" value={d.keyStats.pharmacistsPer1000}/><Row label="Dentists per 1000" value={d.keyStats.dentistsPer1000}/><Row label="Health Worker Density" value={d.keyStats.healthWorkerDensity}/>
                </Sec>
            </div>}

            {tab==='infrastructure' && d.healthcareInfrastructure && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Healthcare Infrastructure" icon={<Shield className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Total Hospitals" value={d.healthcareInfrastructure.totalHospitals} hi/><Row label="Public Hospitals" value={d.healthcareInfrastructure.publicHospitals}/><Row label="Private Hospitals" value={d.healthcareInfrastructure.privateHospitals}/><Row label="Primary Care Clinics" value={d.healthcareInfrastructure.primaryCareClinics}/><Row label="Specialty Centers" value={d.healthcareInfrastructure.specialtyCenters}/><Row label="Mental Health Facilities" value={d.healthcareInfrastructure.mentalHealthFacilities}/><Row label="Rehabilitation Centers" value={d.healthcareInfrastructure.rehabilitationCenters}/><Row label="Emergency Response Time" value={d.healthcareInfrastructure.emergencyResponseTime}/><Row label="Health Insurance Coverage" value={d.healthcareInfrastructure.healthInsuranceCoverage}/><Row label="Universal Health Coverage" value={d.healthcareInfrastructure.universalHealthCoverage}/><Row label="Telemedicine Adoption" value={d.healthcareInfrastructure.telemedicineAdoption}/>
                </Sec>
                {d.healthcareInfrastructure.topHospitals?.length>0&&<Sec title="Top Hospitals" icon={<Heart className="w-4 h-4 text-red-500"/>}>{d.healthcareInfrastructure.topHospitals.map((h:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg mb-2"><div className="font-bold text-xs text-red-600">{h.name}</div><div className="text-[10px] text-stone-500">{h.city} | {h.specialization}</div>{h.ranking&&<div className="text-[10px] font-bold text-academic-gold mt-0.5">Rank: {h.ranking}</div>}</div>)}</Sec>}
            </div>}

            {tab==='diseases' && d.diseaseProfile && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Top Causes of Death" icon={<AlertTriangle className="w-4 h-4 text-red-500"/>}>
                    {d.diseaseProfile.topCausesOfDeath?.map((c:any,i:number)=><div key={i} className="flex justify-between text-xs py-1 border-b border-stone-50 dark:border-stone-800 last:border-0"><span>{c.rank}. {c.cause}</span><span className="font-mono text-red-500">{c.percentage}</span></div>)}
                </Sec>
                <div className="space-y-4">
                    <Sec title="Key Metrics" icon={<Activity className="w-4 h-4 text-blue-500"/>}>
                        <Row label="Cardiovascular Disease" value={d.diseaseProfile.cardiovascularDiseaseRate}/><Row label="Diabetes Prevalence" value={d.diseaseProfile.diabetesPrevalence} hi/><Row label="Obesity Rate" value={d.diseaseProfile.obesityRate}/><Row label="HIV/AIDS" value={d.diseaseProfile.hivAidsPrevalence}/><Row label="TB Incidence" value={d.diseaseProfile.tbIncidenceRate}/><Row label="Stroke Rate" value={d.diseaseProfile.strokeRate}/><Row label="Mental Disorders" value={d.diseaseProfile.mentalDisorderPrevalence}/><Row label="Dementia" value={d.diseaseProfile.dementiaPrevalence}/>
                    </Sec>
                    {d.diseaseProfile.majorInfectiousDiseases?.length>0&&<Sec title="Infectious Diseases" icon={<Stethoscope className="w-4 h-4 text-orange-500"/>}>{d.diseaseProfile.majorInfectiousDiseases.map((dis:any,i:number)=><div key={i} className="flex justify-between text-xs py-1 border-b border-stone-50 last:border-0"><span>{dis.disease}</span><span className="text-stone-500">{dis.prevalence} • {dis.trend}</span></div>)}</Sec>}
                </div>
                {d.diseaseProfile.cancerTypes?.length>0&&<Sec title="Cancer Profile" icon={<Microscope className="w-4 h-4 text-purple-500"/>}>{d.diseaseProfile.cancerTypes.map((c:any,i:number)=><div key={i} className="p-2 bg-purple-50 dark:bg-purple-900/10 rounded mb-1"><div className="font-bold text-xs text-purple-700">{c.type}</div><div className="text-[10px] text-stone-500">Incidence: {c.incidence} | Survival: {c.survivalRate}</div></div>)}</Sec>}
            </div>}

            {tab==='vaccinations' && d.vaccinations && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Vaccination Program" icon={<Shield className="w-4 h-4 text-green-500"/>}>
                    <Row label="National Program" value={d.vaccinations.nationalImmunizationProgram}/><Row label="COVID-19 Vaccination" value={d.vaccinations.covidVaccinationRate} hi/><Row label="Flu Vaccination Rate" value={d.vaccinations.fluVaccinationRate}/><Row label="Vaccine Hesitancy" value={d.vaccinations.vaccineHesitancyLevel}/>
                    {d.vaccinations.mandatoryVaccines?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Mandatory Vaccines</div>{d.vaccinations.mandatoryVaccines.map((v:string,i:number)=><Tag key={i} t={v} c="green"/>)}</div>}
                </Sec>
                {d.vaccinations.vaccinationCoverage?.length>0&&<Sec title="Vaccination Coverage" icon={<Activity className="w-4 h-4 text-blue-500"/>}>{d.vaccinations.vaccinationCoverage.map((v:any,i:number)=><div key={i} className="flex justify-between text-xs py-1 border-b border-stone-50 last:border-0"><span>{v.vaccine}</span><span className="font-mono font-bold text-green-600">{v.coverage}</span></div>)}</Sec>}
            </div>}

            {tab==='mental' && d.mentalHealth && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Mental Health System" icon={<Brain className="w-4 h-4 text-purple-500"/>}>
                    <Row label="Mental Health Act Exists" value={d.mentalHealth.mentalHealthActExists}/><Row label="Psychiatrists per 100k" value={d.mentalHealth.psychiatristsPer100k} hi/><Row label="Psychologists per 100k" value={d.mentalHealth.psychologistsPer100k}/><Row label="Mental Health Stigma" value={d.mentalHealth.mentalHealthStigma}/><Row label="Mental Health Funding" value={d.mentalHealth.mentalHealthFunding}/><Row label="Crisis Services" value={d.mentalHealth.crisisServicesAvailability}/><Row label="Mental Health Policy" value={d.mentalHealth.mentalHealthPolicy}/>
                </Sec>
                <Sec title="Prevalence Statistics" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Depression Prevalence" value={d.mentalHealth.depressionPrevalence} hi/><Row label="Anxiety Prevalence" value={d.mentalHealth.anxietyPrevalence}/><Row label="Suicide Rate" value={d.mentalHealth.suicideRate}/><Row label="Substance Use" value={d.mentalHealth.substanceUsePrevalence}/>
                </Sec>
            </div>}

            {tab==='maternal' && d.maternalAndChildHealth && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Maternal Health" icon={<Baby className="w-4 h-4 text-pink-500"/>}>
                    <Row label="Antenatal Coverage" value={d.maternalAndChildHealth.antenatalCoverage} hi/><Row label="Skilled Birth Attendant" value={d.maternalAndChildHealth.skilledBirthAttendant}/><Row label="Caesarean Rate" value={d.maternalAndChildHealth.caesareanRate}/><Row label="Breastfeeding Rate" value={d.maternalAndChildHealth.breastfeedingRate}/><Row label="Paediatric Hospital Beds" value={d.maternalAndChildHealth.paediatricHospitalBeds}/><Row label="Neonatal ICU Capacity" value={d.maternalAndChildHealth.neonatalICUCapacity}/>
                </Sec>
                <Sec title="Child Nutrition" icon={<Activity className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Stunting Rate" value={d.maternalAndChildHealth.stuntingRate} hi/><Row label="Wasting Rate" value={d.maternalAndChildHealth.wastingRate}/><Row label="Underweight Children" value={d.maternalAndChildHealth.underweightChildrenRate}/>
                </Sec>
            </div>}

            {tab==='nutrition' && d.nutrition && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Nutritional Status" icon={<Activity className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Undernourishment Rate" value={d.nutrition.undernourishmentRate}/><Row label="Overweight Rate" value={d.nutrition.overweightRate}/><Row label="Food Insecurity" value={d.nutrition.foodInsecurity}/><Row label="Calorie Intake Avg" value={d.nutrition.calorieIntakeAvg}/>
                    {d.nutrition.micronutrientDeficiencies?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Micronutrient Deficiencies</div>{d.nutrition.micronutrientDeficiencies.map((m:string,i:number)=><Tag key={i} t={m} c="red"/>)}</div>}
                </Sec>
                <Sec title="Lifestyle Factors" icon={<Heart className="w-4 h-4 text-red-500"/>}>
                    <Row label="Alcohol Consumption/Capita" value={d.nutrition.alcoholConsumptionPerCapita}/><Row label="Smoking Prevalence" value={d.nutrition.smokingPrevalence} hi/><Row label="Smoking (Male)" value={d.nutrition.smokingMale}/><Row label="Smoking (Female)" value={d.nutrition.smokingFemale}/><Row label="Drug Use Prevalence" value={d.nutrition.drugUsePrevalence}/>
                </Sec>
            </div>}

            {tab==='challenges' && d.publicHealthChallenges && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Public Health Challenges" icon={<AlertTriangle className="w-4 h-4 text-amber-500"/>}>
                    <Row label="Antimicrobial Resistance" value={d.publicHealthChallenges.antimicrobialResistance}/><Row label="Pandemic Preparedness Index" value={d.publicHealthChallenges.pandemicPreparednessIndex} hi/><Row label="GHS Index" value={d.publicHealthChallenges.ghsIndex}/><Row label="Health Inequalities" value={d.publicHealthChallenges.healthInequalities}/><Row label="Rural-Urban Health Gap" value={d.publicHealthChallenges.ruralUrbanHealthGap}/><Row label="Gender Health Gap" value={d.publicHealthChallenges.genderHealthGap}/>
                    {d.publicHealthChallenges.emergingThreats?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Emerging Threats</div>{d.publicHealthChallenges.emergingThreats.map((t:string,i:number)=><Tag key={i} t={t} c="red"/>)}</div>}
                </Sec>
                {d.publicHealthChallenges.environmentalHealthThreats?.length>0&&<Sec title="Environmental Health Threats" icon={<AlertTriangle className="w-4 h-4 text-orange-500"/>}>{d.publicHealthChallenges.environmentalHealthThreats.map((t:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {t}</div>)}</Sec>}
            </div>}

            {tab==='pharma' && d.pharmaceuticals && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Pharmaceutical Sector" icon={<Pill className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Domestic Pharma Industry" value={d.pharmaceuticals.domesticPharmaceuticalIndustry}/><Row label="Drug Expenditure/Capita" value={d.pharmaceuticals.drugExpenditurePerCapita} hi/><Row label="Generic Drug Usage" value={d.pharmaceuticals.genericDrugUsage}/><Row label="Drug Import Dependency" value={d.pharmaceuticals.drugImportDependency}/><Row label="Vaccine Manufacturing" value={d.pharmaceuticals.vaccineManufacturingCapacity}/><Row label="Regulatory Body" value={d.pharmaceuticals.regulatoryBody}/><Row label="Clinical Trials" value={d.pharmaceuticals.clinicalTrials}/>
                    {d.pharmaceuticals.topPharmaceuticalCompanies?.length>0&&<div className="mt-3">{d.pharmaceuticals.topPharmaceuticalCompanies.map((c:string,i:number)=><Tag key={i} t={c}/>)}</div>}
                </Sec>
            </div>}

            {tab==='research' && d.medicalResearch && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Medical Research" icon={<Microscope className="w-4 h-4 text-purple-500"/>}>
                    <Row label="Medical Schools" value={d.medicalResearch.medicalSchoolsCount}/><Row label="Health Research Budget" value={d.medicalResearch.healthResearchBudget} hi/><Row label="Nobel Prizes in Medicine" value={d.medicalResearch.nobelPrizesInMedicine}/><Row label="Medical Publications/Year" value={d.medicalResearch.medicalPublicationsAnnual}/><Row label="Health Tech Startups" value={d.medicalResearch.healthTechStartups}/><Row label="Medical Tourism" value={d.medicalResearch.medicalTourism}/><Row label="Tourism Revenue" value={d.medicalResearch.medicalTourismRevenue}/>
                    {d.medicalResearch.medicalResearchInstitutes?.length>0&&<div className="mt-3">{d.medicalResearch.medicalResearchInstitutes.map((inst:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {inst}</div>)}</div>}
                </Sec>
                {d.medicalResearch.topMedicalTourismProcedures?.length>0&&<Sec title="Medical Tourism Procedures" icon={<Stethoscope className="w-4 h-4 text-indigo-500"/>}>{d.medicalResearch.topMedicalTourismProcedures.map((p:string,i:number)=><Tag key={i} t={p} c="blue"/>)}</Sec>}
            </div>}
        </div>
    );
};
