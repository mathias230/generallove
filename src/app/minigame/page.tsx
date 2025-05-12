
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Heart, Zap, Trophy, Sparkles, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const GAME_DURATION = 20; // Shorter game duration for more fun replays

const LoveClickerGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Load high score from local storage
  useEffect(() => {
    const storedHighScore = localStorage.getItem('loveClickerHighScore_v2');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  // Game timer logic
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) {
      if (gameActive) { // Only update high score if the game was actually played
        setGameActive(false);
        setTimeLeft(0);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('loveClickerHighScore_v2', score.toString());
          setFeedback(`¡Nuevo Récord: ${score}! 💖🎉`);
        } else if (score > 0) {
           setFeedback(`¡Tiempo! Puntuación: ${score}. Intenta superar ${highScore}!`);
        } else {
            setFeedback(`¡Tiempo! Puntuación: ${score}. ¡Puedes hacerlo mejor!`);
        }
      }
      return; // Stop the timer effect
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts or game stops
    return () => clearTimeout(timerId);
  }, [timeLeft, gameActive, score, highScore]); // Dependencies for the effect

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    setFeedback("¡Haz clic en el corazón!");
    setClicks([]); // Clear previous clicks
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameActive) return;

    // Add score
    const points = 1 + Math.floor(Math.random() * 3); // Random points (1-3) per click
    setScore(prevScore => prevScore + points);

    // Visual feedback for click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newClick = { id: Date.now(), x, y };
    setClicks(prevClicks => [...prevClicks, newClick]);

    // Remove the visual feedback after animation
    setTimeout(() => {
      setClicks(prevClicks => prevClicks.filter(click => click.id !== newClick.id));
    }, 500); // Match animation duration

    // Button feedback (already had ping, maybe scale slightly?)
    event.currentTarget.classList.add('animate-click-effect');
    setTimeout(() => event.currentTarget.classList.remove('animate-click-effect'), 200);
  };


  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl text-center overflow-hidden">
      <CardHeader className="bg-gradient-to-b from-secondary/50 to-secondary/20 pb-4">
        <CardTitle className="text-3xl text-primary flex items-center justify-center gap-2">
            <Zap className="w-7 h-7 animate-pulse" />
            ¡Fiebre de Corazones!
        </CardTitle>
        <CardDescription>¡Atrapa todos los puntos de amor que puedas en {GAME_DURATION} segundos!</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6 relative">
        {/* Score Display */}
        <div className="text-6xl font-bold text-foreground mb-4 drop-shadow-md">{score}</div>

        {/* Click Area Button */}
        <div className="relative w-full h-48 flex items-center justify-center">
           <Button
              id="love-button"
              onClick={handleClick}
              disabled={!gameActive}
              size="lg"
              className={cn(
                "absolute inset-0 w-full h-full bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-2xl shadow-lg transition-all duration-150 ease-out flex items-center justify-center flex-col gap-2",
                !gameActive && "opacity-70 cursor-not-allowed",
                 gameActive && "hover:scale-105 active:scale-100" // Only scale when active
              )}
              aria-label="Haz clic aquí para puntuar"
            >
              <Heart className="w-16 h-16 fill-white drop-shadow-lg" />
              <span className="font-semibold">{gameActive ? "¡Clickea Rápido!" : "Prepara tus Dedos..."}</span>
            </Button>
            {/* Floating Score Indicators */}
            {clicks.map(click => (
              <div
                key={click.id}
                className="absolute text-lg font-bold text-yellow-300 pointer-events-none animate-score-popup"
                style={{ left: `${click.x}px`, top: `${click.y}px`, transform: 'translate(-50%, -100%)' }}
              >
                +{1 + Math.floor(Math.random() * 3)} {/* Show potential points */}
              </div>
            ))}
        </div>


        {/* Game State Display */}
        {gameActive ? (
          <div className="space-y-2">
            <div className="text-xl text-muted-foreground flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Tiempo: {timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / GAME_DURATION) * 100} className="w-full h-4 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-pink-400" />
          </div>
        ) : (
          <Button onClick={startGame} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 shadow-md">
             <Sparkles className="w-5 h-5 mr-2" />
            {score > 0 || feedback ? 'Jugar de Nuevo' : 'Empezar Juego'}
          </Button>
        )}

        {/* Feedback Area */}
        {feedback && (
          <p className="text-lg font-semibold text-accent-foreground pt-4 min-h-[2.5rem]">
            {feedback}
          </p>
        )}

        {/* High Score */}
        <div className="text-md text-muted-foreground flex items-center justify-center gap-2 border-t pt-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Puntuación Máxima: {highScore}</span>
        </div>
      </CardContent>
    </Card>
  );
};


export default function MinigamePage() {
  return (
    <div className="space-y-8 flex flex-col items-center pt-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Gamepad2 className="w-8 h-8" />
            Nuestra Zona de Diversión
        </h1>
        <p className="text-lg text-muted-foreground">¡Un pequeño juego para compartir grandes sonrisas!</p>
      </header>
      <LoveClickerGame />
       {/* Simplified CSS Animations */}
       <style jsx global>{`
        @keyframes score-popup {
          0% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); }
        }
        .animate-score-popup {
          animation: score-popup 0.5s ease-out forwards;
        }
        @keyframes click-effect {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-click-effect {
           animation: click-effect 0.2s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
