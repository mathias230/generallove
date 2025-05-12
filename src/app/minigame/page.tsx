"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Heart, Zap, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LoveClickerGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds game
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('loveClickerHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (!gameActive || timeLeft === 0) {
      if (gameActive && score > highScore) {
        setHighScore(score);
        localStorage.setItem('loveClickerHighScore', score.toString());
        setFeedback(`New High Score: ${score}! 🎉`);
      } else if (gameActive) {
        setFeedback(`Game Over! Your score: ${score}`);
      }
      setGameActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameActive, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setFeedback(null);
  };

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1);
      // Add a little visual feedback
      const heartButton = document.getElementById('love-button');
      if (heartButton) {
        heartButton.classList.add('animate-ping-once');
        setTimeout(() => heartButton.classList.remove('animate-ping-once'), 300);
      }
    }
  };
  
  // Add this to your globals.css or a style tag if not already present
  // @keyframes ping-once { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
  // .animate-ping-once { animation: ping-once 0.3s cubic-bezier(0, 0, 0.2, 1); }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl text-center">
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center justify-center gap-2">
            <Zap className="w-7 h-7" />
            Love Clicker Challenge!
        </CardTitle>
        <CardDescription>Click the heart as many times as you can in 30 seconds!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-5xl font-bold text-foreground">{score}</div>
        
        <Button
          id="love-button"
          onClick={handleClick}
          disabled={!gameActive}
          size="lg"
          className="w-full h-24 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-2xl shadow-lg transform active:scale-95 transition-transform"
          aria-label="Click to score"
        >
          <Heart className="w-12 h-12 fill-white mr-3" /> Click Me!
        </Button>

        {gameActive ? (
          <div>
            <p className="text-lg text-muted-foreground">Time Left: {timeLeft}s</p>
            <Progress value={(timeLeft / 30) * 100} className="w-full h-3 mt-2 [&>div]:bg-primary" />
          </div>
        ) : (
          <Button onClick={startGame} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Game
          </Button>
        )}

        {feedback && (
          <p className="text-lg font-semibold text-accent-foreground pt-4">{feedback}</p>
        )}

        <div className="text-md text-muted-foreground flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            High Score: {highScore}
        </div>
      </CardContent>
    </Card>
  );
};


export default function MinigamePage() {
  return (
    <div className="space-y-8 flex flex-col items-center">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Gamepad2 className="w-8 h-8" />
            Our Fun Zone
        </h1>
        <p className="text-lg text-muted-foreground">A little game to share some smiles.</p>
      </header>
      <LoveClickerGame />
       <style jsx global>{`
        @keyframes ping-once { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        .animate-ping-once { animation: ping-once 0.3s cubic-bezier(0, 0, 0.2, 1); }
      `}</style>
    </div>
  );
}
