import React, { useMemo } from 'react';
import { Network, Globe } from 'lucide-react';

interface MiniKnowledgeGraphProps {
    coreEntity: string;
    relatedEntities: string[];
    onNodeClick: (entity: string) => void;
}

const MiniKnowledgeGraph: React.FC<MiniKnowledgeGraphProps> = ({ coreEntity, relatedEntities, onNodeClick }) => {
    
    // Generate semi-deterministic deterministic positions for nodes
    const graphData = useMemo(() => {
        const cx = 150;
        const cy = 150;
        const radius = 100;
        
        const nodes = relatedEntities.map((name, i) => {
            const angle = (i / relatedEntities.length) * 2 * Math.PI - Math.PI / 2;
            return {
                id: name,
                label: name,
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius,
                isCore: false
            };
        });
        
        // Add Core node
        nodes.push({
            id: coreEntity,
            label: coreEntity,
            x: cx,
            y: cy,
            isCore: true
        });

        const links = relatedEntities.map(name => ({
            source: coreEntity,
            target: name
        }));

        // Add some random cross-links between related entities
        for (let i = 0; i < relatedEntities.length; i++) {
            if (i < relatedEntities.length - 1 && Math.random() > 0.4) {
               links.push({
                   source: relatedEntities[i],
                   target: relatedEntities[i + 1]
               });
            }
        }

        return { nodes, links };
    }, [coreEntity, relatedEntities]);

    return (
        <div className="w-full bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 h-[350px] relative overflow-hidden group">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                {/* Links */}
                {graphData.links.map((link, i) => {
                    const sourceNode = graphData.nodes.find(n => n.id === link.source);
                    const targetNode = graphData.nodes.find(n => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;
                    return (
                        <line 
                            key={`link-${i}`}
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke="currentColor"
                            className="text-stone-300 dark:text-stone-700 w-px stroke-1"
                        />
                    );
                })}

                {/* Nodes */}
                {graphData.nodes.map((node, i) => (
                    <g 
                        key={`node-${i}`}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onNodeClick(node.id)}
                    >
                        <circle 
                            cx={node.x}
                            cy={node.y}
                            r={node.isCore ? 30 : 20}
                            className={`${node.isCore ? 'fill-academic-gold text-academic-gold stroke-white dark:stroke-stone-900 stroke-[4px]' : 'fill-white dark:fill-stone-800 stroke-academic-accent dark:stroke-indigo-500 stroke-2'}`}
                        />
                        {/* Node icon / initials container could go here */}
                    </g>
                ))}
            </svg>
            
            {/* HTML Overlays for text to keep it crisp and readable outside SVG viewBox scaling quirks if preferred.
                Or we can just use SVG text. Let's use absolute positioned divs!
             */}
             {graphData.nodes.map((node, i) => (
                 <div
                    key={`label-${i}`}
                    onClick={() => onNodeClick(node.id)}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer -translate-x-1/2 -translate-y-1/2 text-center select-none transition-transform hover:scale-110 z-10`}
                    style={{ left: `${(node.x / 300) * 100}%`, top: `${(node.y / 300) * 100}%` }}
                 >
                     {node.isCore ? (
                        <div className="w-16 h-16 rounded-full bg-academic-gold shadow-lg flex items-center justify-center text-white border-4 border-white dark:border-stone-900">
                             <Globe className="w-8 h-8" />
                        </div>
                     ) : (
                         <div className="w-12 h-12 rounded-full bg-white dark:bg-stone-800 shadow-sm flex items-center justify-center border-2 border-academic-accent dark:border-indigo-500 text-academic-accent dark:text-indigo-400">
                            <span className="text-xs font-bold uppercase">{node.label.substring(0, 2)}</span>
                         </div>
                     )}
                     <div className={`mt-1 font-bold leading-tight ${node.isCore ? 'text-sm text-academic-gold font-serif' : 'text-[9px] uppercase tracking-widest text-stone-500 dark:text-stone-400 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm px-1 py-0.5 rounded shadow-sm'}`}>
                         {node.label}
                     </div>
                 </div>
             ))}

        </div>
    );
};

export default MiniKnowledgeGraph;
