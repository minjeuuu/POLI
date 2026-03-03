
import React from 'react';
import { Coins } from 'lucide-react';
import { DetailCard } from '../shared/DetailCard';

export const GDPMetric: React.FC<{ value: string, growth: string }> = ({ value, growth }) => (
    <DetailCard label="GDP (Nominal)" value={value} icon={Coins} subValue={`${growth} Annual Growth`} />
);
