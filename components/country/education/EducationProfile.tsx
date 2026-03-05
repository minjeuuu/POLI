import React, { useState } from 'react';
import { GraduationCap, BookOpen, School, DollarSign, Users, BarChart2, Globe, Star, Cpu } from 'lucide-react';

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
    return <div className={`flex justify-between items-start py-1 border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${hi?'bg-indigo-50/60 dark:bg-indigo-900/10 -mx-1 px-1 rounded':''}`}>
        <span className="text-xs text-stone-500 flex-1 pr-2">{label}</span>
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[55%]">{value}</span>
    </div>;
};
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='blue'?'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','structure','enrollment','quality','universities','teachers','expenditure','vocational','research','digital','inclusion'];

export const EducationProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><BookOpen className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Literacy Rate</div><div className="text-lg font-bold text-stone-800 dark:text-stone-100">{d.literacyRate||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg"><School className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">System</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100 leading-tight">{d.system||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-green-50 text-green-500 rounded-lg"><DollarSign className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Expenditure</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100">{d.expenditure||"N/A"}</div></div></div>
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3"><div className="p-2 bg-amber-50 text-amber-500 rounded-lg"><BarChart2 className="w-5 h-5"/></div><div><div className="text-[10px] font-bold uppercase text-stone-400">Education Rank</div><div className="text-sm font-bold text-stone-800 dark:text-stone-100">{d.educationRank||"N/A"}</div></div></div>
            </div>
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-indigo-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Literacy" icon={<BookOpen className="w-4 h-4 text-blue-500"/>}><Row label="Overall Literacy" value={d.literacyRate} hi/><Row label="Male Literacy" value={d.literacyRateMale}/><Row label="Female Literacy" value={d.literacyRateFemale}/><Row label="Youth Literacy" value={d.youthLiteracyRate}/><Row label="Compulsory Education Age" value={d.compulsoryEducationAge}/><Row label="School Year Start" value={d.schoolYearStart}/><Row label="Language of Instruction" value={d.officialLanguageOfInstruction}/></Sec>
                {d.qualityIndicators&&<Sec title="PISA Scores" icon={<BarChart2 className="w-4 h-4 text-indigo-500"/>}><Row label="Math Score" value={d.qualityIndicators.pisaMathScore} hi/><Row label="Reading Score" value={d.qualityIndicators.pisaReadingScore}/><Row label="Science Score" value={d.qualityIndicators.pisaScienceScore}/><Row label="PISA Rank" value={d.qualityIndicators.pisaRank}/><Row label="Pearson Edu Index" value={d.qualityIndicators.pearsonEduIndex}/></Sec>}
            </div>}

            {tab==='structure' && d.structure && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Education Structure" icon={<School className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Pre-Primary Years" value={d.structure.preprimaryYears}/><Row label="Primary Years" value={d.structure.primaryYears}/><Row label="Lower Secondary Years" value={d.structure.lowerSecondaryYears}/><Row label="Upper Secondary Years" value={d.structure.upperSecondaryYears}/><Row label="Tertiary Years" value={d.structure.tertiaryYears}/><Row label="Vocational Training" value={d.structure.vocationTrainingAvailability}/><Row label="Special Education" value={d.structure.specialEducationSystem}/><Row label="Inclusive Education Policy" value={d.structure.inclusiveEducationPolicy}/>
                </Sec>
            </div>}

            {tab==='enrollment' && d.enrollment && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Enrollment Rates" icon={<Users className="w-4 h-4 text-green-500"/>}>
                    <Row label="Pre-Primary Enrollment" value={d.enrollment.preprimaryGrossEnrollment}/><Row label="Primary Enrollment" value={d.enrollment.primaryGrossEnrollment} hi/><Row label="Secondary Enrollment" value={d.enrollment.secondaryGrossEnrollment}/><Row label="Tertiary Enrollment" value={d.enrollment.tertiaryGrossEnrollment}/><Row label="Primary Completion Rate" value={d.enrollment.primaryCompletionRate}/><Row label="Dropout Rate" value={d.enrollment.dropoutRate}/><Row label="Primary Gender Parity" value={d.enrollment.primaryGenderParityIndex}/><Row label="Secondary Gender Parity" value={d.enrollment.secondaryGenderParityIndex}/><Row label="Tertiary Gender Parity" value={d.enrollment.tertiaryGenderParityIndex}/>
                </Sec>
            </div>}

            {tab==='quality' && d.qualityIndicators && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Quality Indicators" icon={<Star className="w-4 h-4 text-amber-500"/>}>
                    <Row label="PISA Math" value={d.qualityIndicators.pisaMathScore} hi/><Row label="PISA Reading" value={d.qualityIndicators.pisaReadingScore}/><Row label="PISA Science" value={d.qualityIndicators.pisaScienceScore}/><Row label="PISA Rank" value={d.qualityIndicators.pisaRank}/><Row label="Teacher-Student Ratio (Primary)" value={d.qualityIndicators.teacherStudentRatioPrimary}/><Row label="Teacher-Student Ratio (Secondary)" value={d.qualityIndicators.teacherStudentRatioSecondary}/><Row label="Qualified Teachers %" value={d.qualityIndicators.qualifiedTeachersPercent}/><Row label="Avg Class Size" value={d.qualityIndicators.avgClassSize}/><Row label="Digital Literacy Rate" value={d.qualityIndicators.digitalLiteracyRate}/><Row label="School Infrastructure Score" value={d.qualityIndicators.schoolInfrastructureScore}/>
                </Sec>
            </div>}

            {tab==='universities' && <div className="grid grid-cols-1 gap-4">
                {d.universities?.length>0&&<Sec title="Top Universities" icon={<GraduationCap className="w-4 h-4 text-indigo-500"/>}><div className="grid grid-cols-1 md:grid-cols-2 gap-1">{d.universities.map((u:string,i:number)=><div key={i} className="flex items-center gap-2 text-xs py-1 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="text-stone-400 font-mono w-6">{i+1}.</span><span>{u}</span></div>)}</div></Sec>}
                {d.topUniversities?.length>0&&<div className="grid grid-cols-1 md:grid-cols-2 gap-3">{d.topUniversities.map((u:any,i:number)=><div key={i} className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl"><div className="font-bold text-sm text-indigo-600">{u.name}</div><div className="text-xs text-stone-500 mt-1">{u.city} | {u.type} | Est. {u.founded}</div>{u.rank&&<div className="text-xs font-bold text-academic-gold mt-1">🌍 {u.rank}</div>}<div className="text-xs text-stone-400 mt-1">{u.specialization}</div>{u.enrollment&&<div className="text-[10px] text-stone-400">Enrollment: {u.enrollment}</div>}</div>)}</div>}
            </div>}

            {tab==='teachers' && d.teachingProfession && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Teaching Profession" icon={<Users className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Total Teachers" value={d.teachingProfession.totalTeachers}/><Row label="Avg Teacher Salary" value={d.teachingProfession.avgTeacherSalary} hi/><Row label="Salary vs GDP/Capita" value={d.teachingProfession.teacherSalaryVsGDPPerCapita}/><Row label="Training Institutions" value={d.teachingProfession.teacherTrainingInstitutions}/><Row label="Retention Rate" value={d.teachingProfession.teacherRetentionRate}/><Row label="Teacher Satisfaction" value={d.teachingProfession.teacherSatisfaction}/><Row label="Certification Requirements" value={d.teachingProfession.teacherCertificationRequirements}/>
                </Sec>
            </div>}

            {tab==='expenditure' && d.expenditureDetails && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Education Expenditure" icon={<DollarSign className="w-4 h-4 text-green-500"/>}>
                    <Row label="Total Budget" value={d.expenditureDetails.totalEducationBudget} hi/><Row label="Primary Per Student" value={d.expenditureDetails.primaryPerStudentSpend}/><Row label="Secondary Per Student" value={d.expenditureDetails.secondaryPerStudentSpend}/><Row label="Tertiary Per Student" value={d.expenditureDetails.tertiaryPerStudentSpend}/><Row label="Public vs Private" value={d.expenditureDetails.publicVsPrivateEducation}/><Row label="Scholarship Funding" value={d.expenditureDetails.scholarshipFunding}/><Row label="Student Loan System" value={d.expenditureDetails.studentLoanSystem}/><Row label="Tuition Fees" value={d.expenditureDetails.tuitionFees}/>
                </Sec>
            </div>}

            {tab==='vocational' && d.vocationalAndTech && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Vocational & Technical Education" icon={<School className="w-4 h-4 text-orange-500"/>}>
                    <Row label="Vocational Enrollment Rate" value={d.vocationalAndTech.vocationalEnrollmentRate}/><Row label="Vocational Institutions" value={d.vocationalAndTech.vocationalInstitutions}/><Row label="TVET Policy" value={d.vocationalAndTech.tvetPolicy}/><Row label="Graduate Employment Rate" value={d.vocationalAndTech.vocationalGraduateEmployment} hi/>
                    {d.vocationalAndTech.apprenticeshipPrograms?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Apprenticeship Programs</div>{d.vocationalAndTech.apprenticeshipPrograms.map((p:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {p}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='research' && d.researchAndInnovation && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Research & Innovation" icon={<Globe className="w-4 h-4 text-purple-500"/>}>
                    <Row label="R&D Spending (% GDP)" value={d.researchAndInnovation.rAndDSpendingGDP} hi/><Row label="Researchers per Million" value={d.researchAndInnovation.researchersPerMillion}/><Row label="Annual Patents Filed" value={d.researchAndInnovation.annualPatentsFiled}/><Row label="Annual Publications" value={d.researchAndInnovation.academicPublicationsAnnual}/><Row label="Nobel Laureates" value={d.researchAndInnovation.nobelLaureatesInEducation}/>
                    {d.researchAndInnovation.researchUniversities?.length>0&&<div className="mt-3">{d.researchAndInnovation.researchUniversities.map((u:string,i:number)=><Tag key={i} t={u}/>)}</div>}
                </Sec>
                {d.notableAlumniAndAcademics?.length>0&&<Sec title="Notable Academics" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.notableAlumniAndAcademics.map((a:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{a.name}</div><div className="text-[10px] text-stone-500">{a.field} | {a.achievement}</div></div>)}</Sec>}
            </div>}

            {tab==='digital' && d.digitalAndInnovation && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Digital Education" icon={<Cpu className="w-4 h-4 text-blue-500"/>}>
                    <Row label="EdTech Adoption" value={d.digitalAndInnovation.edTechAdoption}/><Row label="Computers per Student" value={d.digitalAndInnovation.computersPerStudent} hi/><Row label="Internet in Schools" value={d.digitalAndInnovation.internetInSchools}/><Row label="Coding in Curriculum" value={d.digitalAndInnovation.codingInCurriculum}/><Row label="AI in Education" value={d.digitalAndInnovation.aiInEducation}/>
                    {d.digitalAndInnovation.onlineLearningPlatforms?.length>0&&<div className="mt-3">{d.digitalAndInnovation.onlineLearningPlatforms.map((p:string,i:number)=><Tag key={i} t={p} c="blue"/>)}</div>}
                    {d.digitalAndInnovation.stemInitiatives?.length>0&&<div className="mt-2">{d.digitalAndInnovation.stemInitiatives.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {s}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='inclusion' && d.inclusionAndEquity && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Inclusion & Equity" icon={<Users className="w-4 h-4 text-green-500"/>}>
                    <Row label="Education for Disabled" value={d.inclusionAndEquity.educationForDisabled}/><Row label="Indigenous Education" value={d.inclusionAndEquity.indigenousEducation}/><Row label="Gender Equality" value={d.inclusionAndEquity.genderEqualityInEducation}/><Row label="Rural Education Access" value={d.inclusionAndEquity.ruralEducationAccess}/><Row label="Poverty Impact" value={d.inclusionAndEquity.povertysImpactOnEducation}/><Row label="Ethnic Minority Education" value={d.inclusionAndEquity.ethnicMinorityEducation}/><Row label="Refugee Education" value={d.inclusionAndEquity.refugeeEducation}/><Row label="Early Childhood Development" value={d.inclusionAndEquity.earlyChildhoodDevelopment} hi/>
                </Sec>
                {d.scholarshipsAndExchange&&<Sec title="Scholarships & Exchange" icon={<Globe className="w-4 h-4 text-indigo-500"/>}>
                    <Row label="Foreign Students Enrolled" value={d.scholarshipsAndExchange.foreignStudentsEnrolled}/><Row label="Domestic Students Abroad" value={d.scholarshipsAndExchange.domesticStudentsAbroad}/>
                    {d.scholarshipsAndExchange.governmentScholarships?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Government Scholarships</div>{d.scholarshipsAndExchange.governmentScholarships.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {s}</div>)}</div>}
                    {d.scholarshipsAndExchange.exchangePrograms?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Exchange Programs</div>{d.scholarshipsAndExchange.exchangePrograms.map((s:string,i:number)=><Tag key={i} t={s} c="blue"/>)}</div>}
                </Sec>}
            </div>}
        </div>
    );
};
