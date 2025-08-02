
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const BinaryRain = () => {
    const [columns, setColumns] = useState<string[][]>([]);
    
    useEffect(() => {
        const calculateColumns = () => {
            const fontSize = 16;
            const screenWidth = window.innerWidth;
            const numColumns = Math.floor(screenWidth / fontSize);

            const newColumns = Array.from({ length: numColumns }, () =>
                Array.from({ length: Math.floor(window.innerHeight / fontSize) }, () =>
                    Math.random() > 0.5 ? '1' : '0'
                )
            );
            setColumns(newColumns);
        }
        
        calculateColumns();
        window.addEventListener('resize', calculateColumns);

        const interval = setInterval(() => {
            setColumns(prevColumns => {
                return prevColumns.map(col => {
                    const newCol = [...col];
                    // Shift every character down, and add a new one at the top
                    newCol.pop();
                    newCol.unshift(Math.random() > 0.5 ? '1' : '0');
                    return newCol;
                });
            });
        }, 100);

        return () => {
            window.removeEventListener('resize', calculateColumns);
            clearInterval(interval);
        };

    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="flex justify-between h-full">
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className="text-green-800 text-sm md:text-base"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'upright',
                            animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * -20}s`,
                            userSelect: 'none',
                            textShadow: '0 0 5px rgba(34, 197, 94, 0.5)',
                        }}
                    >
                        {col.join('')}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default BinaryRain;
