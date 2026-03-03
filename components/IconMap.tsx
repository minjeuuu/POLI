
import React from 'react';
import { 
  ArrowUpRight, BookOpen, Landmark, ArrowLeftRight, Globe, ClipboardList, 
  FileCog, Scale, Building2, Network, Flag, Battery, Scroll, Gavel, 
  ShieldCheck, Files, Mic2, FileBox, IdCard, FileCheck, Sliders, Briefcase, 
  Home, Building, LayoutGrid, Layers, MoveDiagonal2, Link, Users, Footprints, 
  Vote, CheckSquare, Megaphone, Hand, Handshake, MessageCircle, Drama, 
  UserPlus, Boxes, Heart, Shield, Swords, Crosshair, Tent, ShieldAlert, 
  Eye, TriangleAlert, ShieldBan, TrendingUp, TrendingDown, HandHeart, 
  BrickWall, Wrench, Lock, Atom, BarChart, Factory, DoorOpen, Unlock, 
  RefreshCcw, AlertOctagon, AlertTriangle, BarChart2, CircleOff, Lightbulb, 
  Book, Shapes, Hammer, Link2Off, XOctagon, Leaf, Search, Church, Moon, 
  Map, Feather, MapPin, Share2, Coins, Banknote, Receipt, PieChart, Wheat, 
  Utensils, Fingerprint, Move, Fence, Grid, Equal, GraduationCap, Clock, 
  Accessibility, Radio, Tv, Image, Target, Smartphone, Cpu, Bot, Code, 
  Wifi, Camera, EyeOff, Database, Hourglass, Flame, Crown, Ship, Archive, 
  Snowflake, Waves, Microscope, Compass, AlignLeft, GitMerge, Split, Folder, 
  Backpack, ClipboardCheck, FlaskConical, ArrowRight, Sigma, Binary, Sparkles, 
  Activity, Brain, BrainCircuit, HeartPulse, Trophy, Bell, Biohazard, Rocket,
  Cloud, Zap, Box, Droplets, Bus, Construction, BadgeCheck, Ban, Star,
  Satellite, Speaker, Monitor, FileText, Component, HardDrive, Server,
  Anchor, Plane, Train, Truck, DollarSign, Euro, PoundSterling, Bitcoin,
  Siren, Terminal, Puzzle, Ghost, PenTool, Highlighter, StickyNote,
  List, Minus, Plus, RotateCw, Check, X, Award, ChevronLeft, ChevronRight,
  ExternalLink, Play, Pause, Loader2, Info, HelpCircle, Settings,
  AlertCircle, Download, Bookmark, LifeBuoy, Calculator, Tablet, 
  Newspaper, RadioTower, Signal, Key, LockKeyhole, ShieldQuestion,
  UserCheck, UserX, Vote as Ballot, Users as Crowd, Speech as Dialogue,
  Table, PieChart as ChartPie, BarChart as ChartBar, LineChart, AreaChart,
  GitBranch, GitCommit, GitPullRequest, TerminalSquare, Microscope as Lab,
  TestTube, Filter, Stethoscope, Dna, Atom as AtomIcon, Scan, Radar,
  Vote as VoteIcon, LandPlot, Map as MapIcon, Route, Navigation, Locate
} from 'lucide-react';

export const ICON_MAP: Record<string, React.ElementType> = {
  Landmark, ArrowLeftRight, Globe, BookOpen, ClipboardList, FileCog, Scale, 
  Building2, Network, Flag, Battery, Scroll, Gavel, ShieldCheck, Files, Mic2, 
  FileBox, IdCard, FileCheck, Sliders, Briefcase, Home, Building, LayoutGrid, 
  Layers, MoveDiagonal2, Link, Users, Footprints, Vote, CheckSquare, Megaphone, 
  Hand, Handshake, MessageCircle, Drama, UserPlus, Boxes, Heart, Shield, Swords, 
  Crosshair, Tent, ShieldAlert, Eye, TriangleAlert, ShieldBan, TrendingUp, 
  TrendingDown, HandHeart, BrickWall, Wrench, Lock, Atom, BarChart, Factory, 
  DoorOpen, Unlock, RefreshCcw, AlertOctagon, AlertTriangle, BarChart2, CircleOff, 
  Lightbulb, Book, Shapes, Hammer, Link2Off, XOctagon, Leaf, Search, Church, Moon, 
  Map, Feather, MapPin, Share2, Coins, Banknote, Receipt, PieChart, Wheat, Utensils, 
  Fingerprint, Move, Fence, Grid, Equal, GraduationCap, Clock, Accessibility, Radio, 
  Tv, Image, Target, Smartphone, Cpu, Bot, Code, Wifi, Camera, EyeOff, Database, 
  Hourglass, Flame, Crown, Ship, Archive, Snowflake, Waves, Microscope, Compass, 
  AlignLeft, GitMerge, Split, Folder, Backpack, ClipboardCheck, FlaskConical, 
  ArrowRight, Sigma, Binary, Sparkles, Activity, Brain, BrainCircuit, HeartPulse, 
  Trophy, Bell, Biohazard, Rocket, Cloud, Zap, Box, Droplets, Bus, Construction,
  BadgeCheck, Ban, Star, Satellite, Speaker, Monitor, FileText, Component,
  HardDrive, Server, Anchor, Plane, Train, Truck, DollarSign, Euro, PoundSterling, Bitcoin,
  Siren, Terminal, Puzzle, Ghost, PenTool, Highlighter, StickyNote, List, Minus, Plus,
  RotateCw, Check, X, Award, ChevronLeft, ChevronRight, ExternalLink, Play, Pause, 
  Loader2, Info, HelpCircle, Settings, AlertCircle, Download, Bookmark, LifeBuoy,
  Calculator, Tablet, Newspaper, RadioTower, Signal, Key, LockKeyhole, ShieldQuestion,
  UserCheck, UserX, Ballot: Vote, Crowd: Users, Dialogue: MessageCircle,
  Table, ChartPie, ChartBar, LineChart, AreaChart, GitBranch, GitCommit, GitPullRequest, TerminalSquare, Lab,
  TestTube, Filter, Stethoscope, Dna, AtomIcon, Scan, Radar, VoteIcon, LandPlot, MapIcon, Route, Navigation, Locate
};

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = "w-4 h-4" }) => {
  const IconComponent = ICON_MAP[name] || BookOpen;
  return <IconComponent className={className} />;
};
