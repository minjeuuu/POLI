
import React from 'react';
import { Users } from 'lucide-react';
import { DetailCard } from '../shared/DetailCard';

export const PopulationMetric: React.FC<{ total: string, growth: string }> = ({ total, growth }) => (
    <DetailCard label="Population" value={total} icon={Users} subValue={`${growth} Annual Growth`} />
);
