import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircleIcon } from './Icons';

interface JigsawPuzzleGameProps {
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PIECE_COUNT = 6;
const PUZZLE_IMAGE = '/imagenes/treasure-chest-puzzle.png';
const PUZZLE_REWARD = 50;

interface Piece {
    id: number;
    style: React.CSSProperties;
}

const JigsawPuzzleGame: React.FC<JigsawPuzzleGameProps> = ({ setScore }) => {
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [slots, setSlots] = useState<(Piece | null)[]>(new Array(PIECE_COUNT).fill(null));
    const [isSolved, setIsSolved] = useState(false);
    
    const correctOrder = useMemo(() => Array.from({ length: PIECE_COUNT }, (_, i) => i), []);

    useEffect(() => {
        const generatedPieces = correctOrder.map(id => {
            const row = Math.floor(id / 3);
            const col = id % 3;
            return {
                id,
                style: {
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundPosition: `${-col * 100}px ${-row * 100}px`,
                    backgroundSize: '300px 200px',
                    width: '100px',
                    height: '100px',
                }
            };
        });
        setPieces(shuffleArray(generatedPieces));
    }, [correctOrder]);

    useEffect(() => {
        if (slots.every(slot => slot !== null)) {
            const currentOrder = slots.map(slot => slot!.id);
            if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
                setIsSolved(true);
                setScore(prev => prev + PUZZLE_REWARD);
            }
        }
    }, [slots, correctOrder, setScore]);

    const shuffleArray = (array: Piece[]) => {
        return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, piece: Piece) => {
        e.dataTransfer.setData("pieceId", piece.id.toString());
    }

    const handleDropOnSlot = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
        const pieceId = parseInt(e.dataTransfer.getData("pieceId"));
        const pieceToMove = pieces.find(p => p.id === pieceId);
        
        if (pieceToMove && !slots[slotIndex]) {
            const newSlots = [...slots];
            newSlots[slotIndex] = pieceToMove;
            setSlots(newSlots);

            const newPieces = pieces.filter(p => p.id !== pieceId);
            setPieces(newPieces);
        }
    }
    
    const handleDropOnPieces = (e: React.DragEvent<HTMLDivElement>) => {
        const pieceId = parseInt(e.dataTransfer.getData("pieceId"));
        const slotIndex = slots.findIndex(s => s?.id === pieceId);

        if(slotIndex > -1) {
            const pieceToMove = slots[slotIndex];
            const newSlots = [...slots];
            newSlots[slotIndex] = null;
            setSlots(newSlots);

            setPieces(prev => [...prev, pieceToMove!]);
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    
    const restartGame = () => {
        const generatedPieces = correctOrder.map(id => {
            const row = Math.floor(id / 3);
            const col = id % 3;
            return {
                id,
                style: {
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundPosition: `${-col * 100}px ${-row * 100}px`,
                    backgroundSize: '300px 200px',
                    width: '100px',
                    height: '100px',
                }
            };
        });
        setPieces(shuffleArray(generatedPieces));
        setSlots(new Array(PIECE_COUNT).fill(null));
        setIsSolved(false);
    }

    if (isSolved) {
        return (
             <div className="text-white p-4 h-full flex flex-col justify-center text-center">
                <CheckCircleIcon className="w-20 h-20 mx-auto text-green-400 mb-4"/>
                <h2 className="text-3xl font-bold mb-2">¡Puzzle Resuelto!</h2>
                <p className="mb-6 text-white/80 text-2xl">
                    ¡Ganas <span className="text-yellow-300 font-bold">{PUZZLE_REWARD}</span> monedas!
                </p>
                <button onClick={restartGame} className="w-full bg-yellow-400 text-blue-900 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Jugar de Nuevo
                </button>
            </div>
        )
    }

    return (
        <div className="text-white p-4 h-full flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold mb-2">Puzzle del Tesoro</h2>
            <p className="mb-4 text-white/80">Arrastra las piezas para armar la imagen.</p>
            
            <div className="transform scale-[0.85] sm:scale-100 transition-transform">
                <div className="grid grid-cols-3 gap-1 w-[300px] h-[200px] mx-auto bg-black/30 p-1 rounded-lg">
                    {slots.map((piece, index) => (
                        <div 
                            key={index} 
                            className="bg-white/10"
                            onDrop={(e) => handleDropOnSlot(e, index)}
                            onDragOver={handleDragOver}
                        >
                        {piece && (
                                <div 
                                    style={piece.style} 
                                    draggable 
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                />
                        )}
                        </div>
                    ))}
                </div>

                <div 
                    className="mt-6 w-[320px] min-h-[120px] mx-auto bg-black/30 p-2 rounded-lg flex flex-wrap gap-2 justify-center"
                    onDrop={handleDropOnPieces}
                    onDragOver={handleDragOver}
                >
                    {pieces.map(piece => (
                        <div 
                            key={piece.id}
                            style={piece.style}
                            className="cursor-grab"
                            draggable
                            onDragStart={(e) => handleDragStart(e, piece)}
                        />
                    ))}
                    {pieces.length === 0 && <p className="text-white/50 self-center">¡Buen trabajo!</p>}
                </div>
            </div>
        </div>
    );
};

export default JigsawPuzzleGame;