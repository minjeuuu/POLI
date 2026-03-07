import React, { useState } from 'react';
import { Music, Palette, Utensils, Calendar, Film, BookOpen, Trophy, Theater, Sparkles, Star, Users } from 'lucide-react';

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
const Tag: React.FC<{ t: string; c?: string }> = ({ t, c='stone' }) => <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded mr-1 mb-1 border ${c==='orange'?'bg-orange-50 dark:bg-orange-900/20 text-orange-700 border-orange-200':c==='purple'?'bg-purple-50 dark:bg-purple-900/20 text-purple-700 border-purple-200':c==='pink'?'bg-pink-50 dark:bg-pink-900/20 text-pink-700 border-pink-200':c==='green'?'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200':c==='blue'?'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200':'bg-stone-100 dark:bg-stone-800 text-stone-600 border-stone-200'}`}>{t}</span>;
const TABS = ['overview','food','music','arts','literature','cinema','sports','festivals','traditions','fashion','architecture','folklore','exports'];

export const CultureProfile: React.FC<{ data: any }> = ({ data }) => {
    const [tab, setTab] = useState('overview');
    if (!data) return null;
    const d = data;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[{label:'Cuisine',items:d.cuisine,c:'orange'},{label:'Arts',items:d.arts,c:'purple'},{label:'Sports',items:d.sports,c:'green'},{label:'Music',items:d.music,c:'pink'},{label:'Holidays',items:d.holidays,c:'blue'}].map((cat,i)=>cat.items?.length>0&&(
                    <div key={i} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3">
                        <div className="text-[10px] font-bold uppercase text-stone-400 mb-2">{cat.label}</div>
                        <div className="flex flex-wrap">{cat.items.slice(0,4).map((item:string,j:number)=><Tag key={j} t={item} c={cat.c}/>)}{cat.items.length>4&&<span className="text-[10px] text-stone-400">+{cat.items.length-4} more</span>}</div>
                    </div>
                ))}
            </div>
            <div className="flex gap-1 flex-wrap">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${tab===t?'bg-purple-500 text-white':'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>{t}</button>)}</div>

            {tab==='overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Cuisine Highlights" icon={<Utensils className="w-4 h-4 text-orange-500"/>}><div className="flex flex-wrap">{d.cuisine?.map((item:string,i:number)=><Tag key={i} t={item} c="orange"/>)}</div></Sec>
                <Sec title="Arts & Culture" icon={<Palette className="w-4 h-4 text-purple-500"/>}><div className="flex flex-wrap">{d.arts?.map((item:string,i:number)=><Tag key={i} t={item} c="purple"/>)}</div></Sec>
                <Sec title="Sports" icon={<Trophy className="w-4 h-4 text-green-500"/>}><div className="flex flex-wrap">{d.sports?.map((item:string,i:number)=><Tag key={i} t={item} c="green"/>)}</div></Sec>
                <Sec title="National Holidays" icon={<Calendar className="w-4 h-4 text-blue-500"/>}>{d.holidays?.map((h:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {h}</div>)}</Sec>
                <Sec title="Literature" icon={<BookOpen className="w-4 h-4 text-amber-500"/>}><div className="flex flex-wrap">{d.literature?.map((item:string,i:number)=><Tag key={i} t={item}/>)}</div></Sec>
                <Sec title="Cinema & Film" icon={<Film className="w-4 h-4 text-red-500"/>}><div className="flex flex-wrap">{d.cinema?.map((item:string,i:number)=><Tag key={i} t={item}/>)}</div></Sec>
            </div>}

            {tab==='food' && d.food && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.food.overview&&<div className="md:col-span-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed text-stone-700 dark:text-stone-300">{d.food.overview}</p></div>}
                {d.food.traditionalDishes?.length>0&&<Sec title="Traditional Dishes" icon={<Utensils className="w-4 h-4 text-orange-500"/>}>{d.food.traditionalDishes.map((dish:any,i:number)=><div key={i} className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded mb-2"><div className="font-bold text-xs text-orange-700">{dish.name} <span className="text-[10px] font-normal text-stone-500">({dish.type})</span></div><div className="text-[10px] text-stone-500 mt-0.5">Region: {dish.region}</div><div className="text-xs text-stone-400 mt-0.5">{dish.description}</div>{dish.ingredients?.length>0&&<div className="mt-1 flex flex-wrap">{dish.ingredients.map((ing:string,j:number)=><span key={j} className="text-[9px] bg-white dark:bg-stone-800 px-1.5 py-0.5 rounded mr-1 mb-0.5 text-stone-500 border border-stone-200 dark:border-stone-700">{ing}</span>)}</div>}</div>)}</Sec>}
                {d.food.streetFood?.length>0&&<Sec title="Street Food" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.food.streetFood.map((sf:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{sf.name}</div><div className="text-[10px] text-stone-500">{sf.location} — {sf.description}</div></div>)}</Sec>}
                {d.food.regionalCuisines?.length>0&&<Sec title="Regional Cuisines" icon={<Utensils className="w-4 h-4 text-green-500"/>}>{d.food.regionalCuisines.map((r:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded mb-2"><div className="font-bold text-xs text-green-700">{r.region}</div><div className="text-xs text-stone-500 mt-0.5">{r.specialty}</div><div className="text-[10px] text-stone-400">{r.description}</div></div>)}</Sec>}
                {d.food.topChefs?.length>0&&<Sec title="Top Chefs" icon={<Star className="w-4 h-4 text-purple-500"/>}>{d.food.topChefs.map((chef:any,i:number)=><div key={i} className="p-2 bg-purple-50 dark:bg-purple-900/10 rounded mb-1"><div className="font-bold text-xs">{chef.name}</div><div className="text-[10px] text-stone-500">{chef.specialty}</div></div>)}</Sec>}
                {d.food.beverages?.length>0&&<Sec title="Traditional Beverages" icon={<Utensils className="w-4 h-4 text-amber-500"/>}>{d.food.beverages.map((bev:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{bev.name} <span className="text-[10px] font-normal text-stone-400">({bev.type})</span></div><div className="text-[10px] text-stone-400">{bev.description}</div></div>)}</Sec>}
            </div>}

            {tab==='music' && d.music && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.music.overview&&<div className="md:col-span-2 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.music.overview}</p></div>}
                {d.music.traditionalGenres?.length>0&&<Sec title="Traditional Genres" icon={<Music className="w-4 h-4 text-pink-500"/>}>{d.music.traditionalGenres.map((g:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded mb-2"><div className="font-bold text-xs text-pink-600">{g.genre}</div><div className="text-[10px] text-stone-400">{g.origin} | {g.description}</div>{g.instruments?.length>0&&<div className="mt-1 flex flex-wrap">{g.instruments.map((inst:string,j:number)=><Tag key={j} t={inst} c="pink"/>)}</div>}</div>)}</Sec>}
                {d.music.famousMusicians?.length>0&&<Sec title="Famous Musicians" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.music.famousMusicians.map((m:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="font-bold">{m.name}</span><span className="text-stone-500">{m.genre} | {m.era}</span></div>)}</Sec>}
                {d.music.traditionalInstruments?.length>0&&<Sec title="Traditional Instruments" icon={<Music className="w-4 h-4 text-indigo-500"/>}>{d.music.traditionalInstruments.map((inst:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{inst.name} <span className="text-[10px] font-normal text-stone-400">({inst.type})</span></div><div className="text-[10px] text-stone-400">{inst.description}</div></div>)}</Sec>}
                {d.music.musicFestivals?.length>0&&<Sec title="Music Festivals" icon={<Calendar className="w-4 h-4 text-purple-500"/>}>{d.music.musicFestivals.map((f:any,i:number)=><div key={i} className="p-2 bg-purple-50 dark:bg-purple-900/10 rounded mb-1"><div className="font-bold text-xs">{f.name}</div><div className="text-[10px] text-stone-500">{f.location} | {f.month} | {f.genre}</div></div>)}</Sec>}
            </div>}

            {tab==='arts' && d.visualArts && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.visualArts.overview&&<div className="md:col-span-2 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.visualArts.overview}</p></div>}
                {d.visualArts.famousArtists?.length>0&&<Sec title="Famous Artists" icon={<Palette className="w-4 h-4 text-purple-500"/>}>{d.visualArts.famousArtists.map((a:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{a.name} <span className="text-[10px] font-normal text-stone-400">({a.medium} | {a.era})</span></div>{a.notableWorks?.length>0&&<div className="text-[10px] text-stone-500">{a.notableWorks.join(', ')}</div>}</div>)}</Sec>}
                {d.visualArts.topMuseums?.length>0&&<Sec title="Top Museums" icon={<Theater className="w-4 h-4 text-stone-500"/>}>{d.visualArts.topMuseums.map((m:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{m.name}</div><div className="text-[10px] text-stone-500">{m.city} | Est. {m.founded}</div><div className="text-[10px] text-stone-400">{m.collection}</div></div>)}</Sec>}
                {d.visualArts.craftTraditions?.length>0&&<Sec title="Craft Traditions" icon={<Sparkles className="w-4 h-4 text-amber-500"/>}>{d.visualArts.craftTraditions.map((c:any,i:number)=><div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded mb-1"><div className="font-bold text-xs text-amber-700">{c.craft}</div><div className="text-[10px] text-stone-500">{c.region}</div></div>)}</Sec>}
            </div>}

            {tab==='literature' && d.literature && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.literature.overview&&<div className="md:col-span-2 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.literature.overview}</p></div>}
                {d.literature.famousAuthors?.length>0&&<Sec title="Famous Authors" icon={<BookOpen className="w-4 h-4 text-amber-500"/>}>{d.literature.famousAuthors.map((a:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{a.name} <span className="text-[10px] font-normal text-stone-400">({a.genre} | {a.era})</span></div>{a.awards&&<div className="text-[10px] text-academic-gold">{a.awards}</div>}</div>)}</Sec>}
                {d.literature.notableWorks?.length>0&&<Sec title="Notable Works" icon={<BookOpen className="w-4 h-4 text-indigo-500"/>}>{d.literature.notableWorks.map((w:any,i:number)=><div key={i} className="p-2 bg-indigo-50 dark:bg-indigo-900/10 rounded mb-1"><div className="font-bold text-xs text-indigo-700">"{w.title}" <span className="font-normal text-stone-500">({w.year})</span></div><div className="text-[10px] text-stone-500">{w.author} | {w.genre}</div><div className="text-xs text-stone-400 mt-0.5">{w.significance}</div></div>)}</Sec>}
                {d.literature.nobelPrizeLiterature?.length>0&&<Sec title="Nobel Prize (Literature)" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.literature.nobelPrizeLiterature.map((n:string,i:number)=><div key={i} className="text-xs py-0.5 text-academic-gold">🏆 {n}</div>)}</Sec>}
            </div>}

            {tab==='cinema' && d.cinema && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.cinema.overview&&<div className="md:col-span-2 bg-red-50 dark:bg-red-900/10 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.cinema.overview}</p></div>}
                <Sec title="Film Industry" icon={<Film className="w-4 h-4 text-red-500"/>}><Row label="Industry Status" value={d.cinema.filmIndustry}/><Row label="Annual Films" value={d.cinema.annualFilmsProduced} hi/><Row label="Box Office Revenue" value={d.cinema.boxOfficeRevenue}/><Row label="Streaming Market" value={d.cinema.streamingMarket}/></Sec>
                {d.cinema.famousDirectors?.length>0&&<Sec title="Famous Directors" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.cinema.famousDirectors.map((dir:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{dir.name}</div><div className="text-[10px] text-stone-500">{dir.genre} | {dir.awards}</div></div>)}</Sec>}
                {d.cinema.notableFilms?.length>0&&<Sec title="Notable Films" icon={<Film className="w-4 h-4 text-indigo-500"/>}>{d.cinema.notableFilms.map((f:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">"{f.title}" ({f.year})</div><div className="text-[10px] text-stone-500">Dir: {f.director}</div>{f.awards&&<div className="text-[10px] text-academic-gold">{f.awards}</div>}</div>)}</Sec>}
                {d.cinema.filmFestivals?.length>0&&<Sec title="Film Festivals" icon={<Calendar className="w-4 h-4 text-purple-500"/>}>{d.cinema.filmFestivals.map((f:any,i:number)=><div key={i} className="p-2 bg-purple-50 dark:bg-purple-900/10 rounded mb-1"><div className="font-bold text-xs">{f.name}</div><div className="text-[10px] text-stone-500">{f.city} | {f.frequency}</div></div>)}</Sec>}
            </div>}

            {tab==='sports' && d.sports && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.sports.overview&&<div className="md:col-span-2 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl"><Row label="National Sport" value={d.sports.nationalSport} hi/><p className="text-sm font-serif mt-2">{d.sports.overview}</p></div>}
                {d.sports.popularSports?.length>0&&<Sec title="Popular Sports" icon={<Trophy className="w-4 h-4 text-green-500"/>}>{d.sports.popularSports.map((s:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded mb-2"><div className="font-bold text-xs text-green-700">{s.sport} <span className="text-[10px] font-normal text-stone-400">{s.popularity}</span></div><div className="text-[10px] text-stone-500">{s.achievements}</div></div>)}</Sec>}
                {d.sports.olympicHistory&&<Sec title="Olympic History" icon={<Star className="w-4 h-4 text-amber-500"/>}><Row label="Total Medals" value={d.sports.olympicHistory.totalMedals} hi/><Row label="Gold" value={d.sports.olympicHistory.goldMedals}/><Row label="Silver" value={d.sports.olympicHistory.silverMedals}/><Row label="Bronze" value={d.sports.olympicHistory.bronzeMedals}/><Row label="World Cup History" value={d.sports.worldCupHistory}/>{d.sports.olympicHistory.famousAthletes?.length>0&&<div className="mt-3">{d.sports.olympicHistory.famousAthletes.map((a:any,i:number)=><div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded mb-1"><div className="font-bold text-xs">{a.name} — {a.sport}</div><div className="text-[10px] text-stone-500">{a.achievements}</div></div>)}</div>}</Sec>}
                {d.sports.topSportsStadiums?.length>0&&<Sec title="Major Stadiums" icon={<Users className="w-4 h-4 text-blue-500"/>}>{d.sports.topSportsStadiums.map((st:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{st.name}</div><div className="text-[10px] text-stone-500">{st.city} | {st.sport} | Cap: {st.capacity}</div></div>)}</Sec>}
                {d.sports.traditionalSports?.length>0&&<Sec title="Traditional Sports" icon={<Trophy className="w-4 h-4 text-stone-500"/>}><div className="flex flex-wrap">{d.sports.traditionalSports.map((s:string,i:number)=><Tag key={i} t={s} c="green"/>)}</div></Sec>}
            </div>}

            {tab==='festivals' && d.festivals && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.festivals.majorFestivals?.length>0&&<Sec title="Major Festivals" icon={<Calendar className="w-4 h-4 text-purple-500"/>}>{d.festivals.majorFestivals.map((f:any,i:number)=><div key={i} className="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded mb-2"><div className="font-bold text-xs text-purple-700">{f.name}</div><div className="text-[10px] text-stone-500">{f.date} | {f.type} | {f.location}</div><div className="text-xs text-stone-400 mt-0.5">{f.description}</div>{f.rituals?.length>0&&<div className="mt-1 flex flex-wrap">{f.rituals.map((r:string,j:number)=><Tag key={j} t={r}/>)}</div>}</div>)}</Sec>}
                {d.festivals.nationalHolidays?.length>0&&<Sec title="National Holidays" icon={<Calendar className="w-4 h-4 text-blue-500"/>}>{d.festivals.nationalHolidays.map((h:any,i:number)=><div key={i} className="flex justify-between text-xs py-1.5 border-b border-stone-50 dark:border-stone-800 last:border-0"><span className="font-bold">{h.name}</span><span className="text-stone-500">{h.date}</span></div>)}</Sec>}
            </div>}

            {tab==='traditions' && d.traditions && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Cultural Customs" icon={<Users className="w-4 h-4 text-amber-500"/>}>
                    <Row label="Greeting Customs" value={d.traditions.greetingCustoms}/><Row label="Wedding Traditions" value={d.traditions.weddingTraditions}/><Row label="Funeral Customs" value={d.traditions.funeralCustoms}/><Row label="Birth Celebrations" value={d.traditions.birthCelebrations}/><Row label="Coming of Age" value={d.traditions.comingOfAge}/><Row label="Gift-Giving Etiquette" value={d.traditions.giftGivingEtiquette}/><Row label="Table Manners" value={d.traditions.tableManners}/><Row label="Dress Traditions" value={d.traditions.dressTraditions}/>
                    {d.traditions.superstitions?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Superstitions</div>{d.traditions.superstitions.map((s:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {s}</div>)}</div>}
                    {d.traditions.taboos?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Cultural Taboos</div>{d.traditions.taboos.map((t:string,i:number)=><div key={i} className="text-xs py-0.5 text-red-600 dark:text-red-400">⚠️ {t}</div>)}</div>}
                </Sec>
            </div>}

            {tab==='fashion' && d.fashion && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.fashion.overview&&<div className="md:col-span-2 bg-pink-50 dark:bg-pink-900/10 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.fashion.overview}</p></div>}
                {d.fashion.traditionalGarments?.length>0&&<Sec title="Traditional Garments" icon={<Sparkles className="w-4 h-4 text-pink-500"/>}>{d.fashion.traditionalGarments.map((g:any,i:number)=><div key={i} className="p-2 bg-stone-50 dark:bg-stone-800 rounded mb-1"><div className="font-bold text-xs">{g.name} <span className="text-[10px] font-normal text-stone-400">({g.gender} | {g.occasion})</span></div><div className="text-[10px] text-stone-400">{g.description}</div></div>)}</Sec>}
                {d.fashion.famousDesigners?.length>0&&<Sec title="Famous Designers" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.fashion.famousDesigners.map((des:any,i:number)=><div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded mb-1"><div className="font-bold text-xs">{des.name}</div><div className="text-[10px] text-stone-500">{des.style} | {des.achievements}</div></div>)}</Sec>}
                <Sec title="Fashion Industry" icon={<Sparkles className="w-4 h-4 text-purple-500"/>}><Row label="Industry" value={d.fashion.fashionIndustry}/><Row label="Street Style" value={d.fashion.streetStyle}/><Row label="Fashion Exports" value={d.fashion.fashionExports}/>{d.fashion.fashionWeeks?.length>0&&<div className="mt-2">{d.fashion.fashionWeeks.map((w:string,i:number)=><Tag key={i} t={w} c="purple"/>)}</div>}</Sec>
            </div>}

            {tab==='architecture' && d.architecture && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.architecture.overview&&<div className="md:col-span-2 bg-stone-50 dark:bg-stone-800 p-4 rounded-xl"><p className="text-sm font-serif leading-relaxed">{d.architecture.overview}</p></div>}
                {d.architecture.historicalStyles?.length>0&&<Sec title="Historical Styles" icon={<Sparkles className="w-4 h-4 text-stone-500"/>}>{d.architecture.historicalStyles.map((s:any,i:number)=><div key={i} className="p-3 bg-stone-50 dark:bg-stone-800 rounded mb-2"><div className="font-bold text-xs">{s.style} <span className="text-[10px] font-normal text-stone-400">({s.era})</span></div>{s.characteristics?.map((c:string,j:number)=><span key={j} className="text-[10px] text-stone-400">• {c} </span>)}</div>)}</Sec>}
                {d.architecture.iconicBuildings?.length>0&&<Sec title="Iconic Buildings" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.architecture.iconicBuildings.map((b:any,i:number)=><div key={i} className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded mb-2"><div className="font-bold text-xs text-amber-700">{b.name}</div><div className="text-[10px] text-stone-500">{b.city} | {b.year} | {b.style}</div><div className="text-xs text-stone-400 mt-0.5">{b.significance}</div></div>)}</Sec>}
            </div>}

            {tab==='folklore' && d.folklore && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.folklore.mythology&&<div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl"><div className="text-xs font-bold uppercase text-indigo-600 mb-2">Mythology Overview</div><p className="text-sm font-serif leading-relaxed">{d.folklore.mythology}</p></div>}
                {d.folklore.famousMythsFolktales?.length>0&&<Sec title="Myths & Folktales" icon={<BookOpen className="w-4 h-4 text-indigo-500"/>}>{d.folklore.famousMythsFolktales.map((m:any,i:number)=><div key={i} className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded mb-2"><div className="font-bold text-xs text-indigo-700">"{m.title}" <span className="text-[10px] font-normal text-stone-400">({m.type})</span></div><div className="text-xs text-stone-400 mt-0.5">{m.summary}</div><div className="text-[10px] text-stone-500 mt-0.5">{m.significance}</div></div>)}</Sec>}
                {d.folklore.legendaryFigures?.length>0&&<Sec title="Legendary Figures" icon={<Star className="w-4 h-4 text-amber-500"/>}>{d.folklore.legendaryFigures.map((f:string,i:number)=><Tag key={i} t={f}/>)}</Sec>}
                {d.folklore.heroicEpics?.length>0&&<Sec title="Heroic Epics" icon={<BookOpen className="w-4 h-4 text-purple-500"/>}>{d.folklore.heroicEpics.map((e:string,i:number)=><div key={i} className="text-xs py-0.5 text-stone-600 dark:text-stone-400">• {e}</div>)}</Sec>}
            </div>}

            {tab==='exports' && d.culturalExports && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Sec title="Cultural Exports & Soft Power" icon={<Globe className="w-4 h-4 text-blue-500"/>}>
                    <Row label="Soft Power" value={d.culturalExports.softPower} hi/><Row label="Global Influence" value={d.culturalExports.globalInfluence}/><Row label="Diaspora Influence" value={d.culturalExports.diasporaInfluence}/><Row label="Language Influence" value={d.culturalExports.languageInfluence}/>
                    {d.culturalExports.culturalBrands?.length>0&&<div className="mt-3"><div className="text-[10px] font-bold uppercase text-stone-400 mb-2">Cultural Brands</div><div className="flex flex-wrap">{d.culturalExports.culturalBrands.map((b:string,i:number)=><Tag key={i} t={b} c="blue"/>)}</div></div>}
                </Sec>
            </div>}
        </div>
    );
};
