
import React, { useState } from 'react';
import { UserProfile, SocialLinks, AcademicCredentials, EducationEntry, ExperienceEntry, PublicationEntry } from '../../types';
import { Save, X, Globe, MapPin, Building, GraduationCap, Link as LinkIcon, Twitter, Github, Linkedin, BookOpen, AtSign, FileText, User, Plus, Trash2, Calendar, Briefcase, Youtube, Facebook, Instagram, MessageCircle, Clock } from 'lucide-react';
import { playSFX } from '../../services/soundService';

interface EditProfileFormProps {
    profile: UserProfile;
    onSave: (updated: UserProfile) => void;
    onCancel: () => void;
}

const InputGroup: React.FC<{ label: string; icon?: any; children: React.ReactNode }> = ({ label, icon: Icon, children }) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-2">
            {Icon && <Icon className="w-3 h-3" />} {label}
        </label>
        {children}
    </div>
);

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState<UserProfile>(profile);
    const [socials, setSocials] = useState<SocialLinks>(profile.socials || {});
    const [academic, setAcademic] = useState<AcademicCredentials>(profile.academic || { specializations: [] });
    const [newInterest, setNewInterest] = useState('');
    
    // Arrays
    const [education, setEducation] = useState<EducationEntry[]>(profile.educationHistory || []);
    const [experience, setExperience] = useState<ExperienceEntry[]>(profile.workHistory || []);
    const [publications, setPublications] = useState<PublicationEntry[]>(profile.publications || []);

    const handleBasicChange = (field: keyof UserProfile, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (field: keyof SocialLinks, value: string) => {
        setSocials(prev => ({ ...prev, [field]: value }));
    };

    const handleAcademicChange = (field: keyof AcademicCredentials, value: string) => {
        setAcademic(prev => ({ ...prev, [field]: value }));
    };

    // --- Dynamic Lists ---
    const addEducation = () => {
        setEducation([...education, { id: Date.now().toString(), institution: '', degree: '', year: '' }]);
    };
    const updateEducation = (id: string, field: keyof EducationEntry, val: string) => {
        setEducation(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
    };
    const removeEducation = (id: string) => {
        setEducation(prev => prev.filter(e => e.id !== id));
    };

    const addExperience = () => {
        setExperience([...experience, { id: Date.now().toString(), role: '', organization: '', duration: '' }]);
    };
    const updateExperience = (id: string, field: keyof ExperienceEntry, val: string) => {
        setExperience(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
    };
    const removeExperience = (id: string) => {
        setExperience(prev => prev.filter(e => e.id !== id));
    };

    const addPublication = () => {
        setPublications([...publications, { id: Date.now().toString(), title: '', journal: '', year: '' }]);
    };
    const updatePublication = (id: string, field: keyof PublicationEntry, val: string) => {
        setPublications(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
    };
    const removePublication = (id: string) => {
        setPublications(prev => prev.filter(e => e.id !== id));
    };

    // Interest Tags
    const addInterest = (e: React.FormEvent) => {
        e.preventDefault();
        if (newInterest.trim()) {
            setAcademic(prev => ({ 
                ...prev, 
                specializations: [...(prev.specializations || []), newInterest.trim()] 
            }));
            setNewInterest('');
        }
    };

    const removeInterest = (index: number) => {
        setAcademic(prev => ({
            ...prev,
            specializations: prev.specializations.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playSFX('success');
        onSave({
            ...formData,
            socials,
            academic,
            educationHistory: education,
            workHistory: experience,
            publications
        });
    };

    const inputClass = "w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-sm focus:border-academic-accent dark:focus:border-indigo-500 focus:ring-1 focus:ring-academic-accent dark:focus:ring-indigo-500 outline-none transition-all text-stone-800 dark:text-stone-200";

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 animate-in fade-in slide-in-from-right shadow-sm max-w-4xl mx-auto">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8 border-b border-stone-100 dark:border-stone-800 pb-4 sticky top-0 bg-white dark:bg-stone-900 z-10 pt-2">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-academic-text dark:text-stone-100">Edit Scholar Profile</h2>
                    <p className="text-xs text-stone-400 font-mono mt-1">Update your archival metadata.</p>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={onCancel} className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>
            </div>

            <div className="space-y-12">
                
                {/* 1. IDENTITY SECTION */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-academic-gold border-b border-stone-100 dark:border-stone-800 pb-2">Identity Matrix</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Display Name" icon={User}>
                            <input type="text" value={formData.displayName} onChange={(e) => handleBasicChange('displayName', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="Username / Handle" icon={AtSign}>
                            <input type="text" value={formData.username} onChange={(e) => handleBasicChange('username', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="Professional Title" icon={GraduationCap}>
                            <input type="text" value={formData.title} onChange={(e) => handleBasicChange('title', e.target.value)} className={inputClass} />
                        </InputGroup>
                         <InputGroup label="Email Address" icon={AtSign}>
                            <input type="email" value={formData.email} onChange={(e) => handleBasicChange('email', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <div className="md:col-span-2">
                            <InputGroup label="Biography & Research Statement" icon={FileText}>
                                <textarea 
                                    value={formData.bio} 
                                    onChange={(e) => handleBasicChange('bio', e.target.value)}
                                    rows={4}
                                    className={`${inputClass} resize-y`}
                                    placeholder="Summarize your research focus and background..."
                                />
                            </InputGroup>
                        </div>
                    </div>
                </section>

                {/* 2. GEOGRAPHY & INSTITUTION */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-academic-gold border-b border-stone-100 dark:border-stone-800 pb-2">Affiliation & Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Institution / Organization" icon={Building}>
                            <input type="text" value={academic.institution || ''} onChange={(e) => handleAcademicChange('institution', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="Department / Faculty" icon={Building}>
                            <input type="text" value={academic.department || ''} onChange={(e) => handleAcademicChange('department', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="Country / Region" icon={Globe}>
                            <input type="text" value={formData.country} onChange={(e) => handleBasicChange('country', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="City / Campus" icon={MapPin}>
                            <input type="text" value={formData.city || ''} onChange={(e) => handleBasicChange('city', e.target.value)} className={inputClass} />
                        </InputGroup>
                         <InputGroup label="Office Hours / Location" icon={Clock}>
                            <input type="text" value={academic.officeHours || ''} onChange={(e) => handleAcademicChange('officeHours', e.target.value)} className={inputClass} placeholder="e.g. Mon 2-4pm, Room 304" />
                        </InputGroup>
                    </div>
                </section>

                {/* 3. ACADEMIC CREDENTIALS */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-academic-gold border-b border-stone-100 dark:border-stone-800 pb-2">Academic Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Highest Degree" icon={GraduationCap}>
                            <select 
                                value={academic.degree || 'PhD'} 
                                onChange={(e) => handleAcademicChange('degree', e.target.value)} 
                                className={inputClass}
                            >
                                <option value="PhD">PhD / Doctorate</option>
                                <option value="MA">MA / MSc</option>
                                <option value="BA">BA / BSc</option>
                                <option value="JD">JD / Law</option>
                                <option value="MD">MD</option>
                                <option value="MBA">MBA</option>
                                <option value="None">Independent Scholar</option>
                            </select>
                        </InputGroup>
                        <InputGroup label="Start Year">
                            <input type="text" placeholder="YYYY" value={academic.startYear || ''} onChange={(e) => handleAcademicChange('startYear', e.target.value)} className={inputClass} />
                        </InputGroup>
                        <InputGroup label="Advisor / Mentor">
                            <input type="text" value={academic.advisor || ''} onChange={(e) => handleAcademicChange('advisor', e.target.value)} className={inputClass} />
                        </InputGroup>
                         <div className="md:col-span-3">
                            <InputGroup label="Thesis / Dissertation Title" icon={BookOpen}>
                                <input type="text" value={academic.thesisTitle || ''} onChange={(e) => handleAcademicChange('thesisTitle', e.target.value)} className={inputClass} />
                            </InputGroup>
                        </div>
                    </div>
                    
                    <InputGroup label="Research Specializations (Tags)">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {academic.specializations?.map((spec, i) => (
                                <span key={i} className="px-3 py-1 bg-academic-accent/10 text-academic-accent dark:text-indigo-400 rounded-full text-xs font-bold flex items-center gap-2">
                                    {spec}
                                    <button type="button" onClick={() => removeInterest(i)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newInterest} 
                                onChange={(e) => setNewInterest(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addInterest(e)}
                                placeholder="Add a field of study..."
                                className={inputClass}
                            />
                            <button type="button" onClick={addInterest} className="px-4 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors font-bold text-stone-500">+</button>
                        </div>
                    </InputGroup>
                </section>

                {/* 4. NETWORK LINKS (EXTENDED) */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-academic-gold border-b border-stone-100 dark:border-stone-800 pb-2">Network Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Personal Website" icon={Globe}>
                            <input type="url" value={socials.website || ''} onChange={(e) => handleSocialChange('website', e.target.value)} className={inputClass} placeholder="https://" />
                        </InputGroup>
                        <InputGroup label="Twitter / X" icon={Twitter}>
                            <input type="text" value={socials.twitter || ''} onChange={(e) => handleSocialChange('twitter', e.target.value)} className={inputClass} placeholder="@handle" />
                        </InputGroup>
                        <InputGroup label="LinkedIn" icon={Linkedin}>
                            <input type="url" value={socials.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className={inputClass} placeholder="Profile URL" />
                        </InputGroup>
                        <InputGroup label="GitHub" icon={Github}>
                            <input type="text" value={socials.github || ''} onChange={(e) => handleSocialChange('github', e.target.value)} className={inputClass} placeholder="Username" />
                        </InputGroup>
                        <InputGroup label="Google Scholar" icon={BookOpen}>
                            <input type="url" value={socials.googleScholar || ''} onChange={(e) => handleSocialChange('googleScholar', e.target.value)} className={inputClass} placeholder="Profile URL" />
                        </InputGroup>
                        <InputGroup label="ORCID" icon={LinkIcon}>
                            <input type="text" value={socials.orcid || ''} onChange={(e) => handleSocialChange('orcid', e.target.value)} className={inputClass} placeholder="0000-0000-0000-0000" />
                        </InputGroup>
                        <InputGroup label="ResearchGate" icon={Globe}>
                             <input type="url" value={socials.researchGate || ''} onChange={(e) => handleSocialChange('researchGate', e.target.value)} className={inputClass} placeholder="Profile URL" />
                        </InputGroup>
                         <InputGroup label="YouTube Channel" icon={Youtube}>
                             <input type="url" value={socials.youtube || ''} onChange={(e) => handleSocialChange('youtube', e.target.value)} className={inputClass} placeholder="Channel URL" />
                        </InputGroup>
                         <InputGroup label="Discord" icon={MessageCircle}>
                             <input type="text" value={socials.discord || ''} onChange={(e) => handleSocialChange('discord', e.target.value)} className={inputClass} placeholder="Username#0000" />
                        </InputGroup>
                         <InputGroup label="Mastodon" icon={AtSign}>
                             <input type="text" value={socials.mastodon || ''} onChange={(e) => handleSocialChange('mastodon', e.target.value)} className={inputClass} placeholder="@user@instance" />
                        </InputGroup>
                    </div>
                </section>

                {/* 5. CV SECTIONS */}
                <section className="space-y-8">
                     <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-academic-gold border-b border-stone-100 dark:border-stone-800 pb-2">Curriculum Vitae</h3>
                     
                     {/* Education History */}
                     <div className="space-y-4">
                         <div className="flex justify-between items-center">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education History</h4>
                             <button type="button" onClick={addEducation} className="text-xs text-academic-accent font-bold hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                         </div>
                         {education.map(edu => (
                             <div key={edu.id} className="grid grid-cols-12 gap-2 items-center bg-stone-50 dark:bg-stone-900/50 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                                 <div className="col-span-5"><input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full bg-transparent text-sm font-bold outline-none" /></div>
                                 <div className="col-span-4"><input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full bg-transparent text-sm outline-none" /></div>
                                 <div className="col-span-2"><input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="w-full bg-transparent text-sm font-mono text-stone-400 outline-none" /></div>
                                 <div className="col-span-1 text-right"><button onClick={() => removeEducation(edu.id)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                             </div>
                         ))}
                     </div>

                     {/* Work History */}
                     <div className="space-y-4">
                         <div className="flex justify-between items-center">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Professional Experience</h4>
                             <button type="button" onClick={addExperience} className="text-xs text-academic-accent font-bold hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                         </div>
                         {experience.map(exp => (
                             <div key={exp.id} className="grid grid-cols-12 gap-2 items-center bg-stone-50 dark:bg-stone-900/50 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                                 <div className="col-span-4"><input type="text" placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full bg-transparent text-sm font-bold outline-none" /></div>
                                 <div className="col-span-5"><input type="text" placeholder="Organization" value={exp.organization} onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)} className="w-full bg-transparent text-sm outline-none" /></div>
                                 <div className="col-span-2"><input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} className="w-full bg-transparent text-sm font-mono text-stone-400 outline-none" /></div>
                                 <div className="col-span-1 text-right"><button onClick={() => removeExperience(exp.id)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                             </div>
                         ))}
                     </div>

                     {/* Publications */}
                     <div className="space-y-4">
                         <div className="flex justify-between items-center">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Select Publications</h4>
                             <button type="button" onClick={addPublication} className="text-xs text-academic-accent font-bold hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                         </div>
                         {publications.map(pub => (
                             <div key={pub.id} className="grid grid-cols-12 gap-2 items-center bg-stone-50 dark:bg-stone-900/50 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                                 <div className="col-span-5"><input type="text" placeholder="Title" value={pub.title} onChange={(e) => updatePublication(pub.id, 'title', e.target.value)} className="w-full bg-transparent text-sm font-bold outline-none italic" /></div>
                                 <div className="col-span-4"><input type="text" placeholder="Journal/Publisher" value={pub.journal} onChange={(e) => updatePublication(pub.id, 'journal', e.target.value)} className="w-full bg-transparent text-sm outline-none" /></div>
                                 <div className="col-span-2"><input type="text" placeholder="Year" value={pub.year} onChange={(e) => updatePublication(pub.id, 'year', e.target.value)} className="w-full bg-transparent text-sm font-mono text-stone-400 outline-none" /></div>
                                 <div className="col-span-1 text-right"><button onClick={() => removePublication(pub.id)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                             </div>
                         ))}
                     </div>
                </section>

            </div>

            <div className="flex justify-end gap-4 pt-8 mt-8 border-t border-stone-100 dark:border-stone-800 sticky bottom-0 bg-white dark:bg-stone-900 pb-2 z-10">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="px-6 py-3 text-stone-500 font-bold uppercase text-xs tracking-widest hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                >
                    Discard Changes
                </button>
                <button 
                    type="submit"
                    className="px-8 py-3 bg-academic-accent dark:bg-indigo-600 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                    <Save className="w-4 h-4" /> Save Profile
                </button>
            </div>
        </form>
    );
};
