
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: '¿Cuál es mi banda favorita?',
    options: ['Linkin Park', 'Limp Bizkit', 'Korn', 'Slipknot'],
    correctAnswer: 'Linkin Park',
    hint: 'Piensa en nu metal y letras emocionales.',
  },
  {
    id: 'q2',
    text: '¿Cuál es mi juego favorito?',
    options: ['Fortnite', 'Rocket League', 'FIFA', 'No Man\'s Sky'],
    correctAnswer: 'No Man\'s Sky',
    hint: 'Un universo para explorar sin límites.',
  },
  {
    id: 'q3',
    text: '¿Cuál es mi color favorito?',
    options: ['Azul', 'Verde', 'Negro', 'Rojo'],
    correctAnswer: 'Negro',
    hint: 'Elegancia y oscuridad.',
  },
  {
    id: 'q4',
    text: '¿En qué año fue nuestro primer contacto (según el carrusel de recuerdos)?',
    options: ['2022', '2023', '2024', '2025'],
    correctAnswer: '2024',
    hint: 'Revisa la primera memoria del carrusel en la página de inicio.',
  },
];

interface AnswerResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  questionText: string;
  options: string[];
  hint?: string;
}

export default function QuestionsPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleCheckAnswers = () => {
    const currentResults: AnswerResult[] = quizQuestions.map((question) => ({
      questionId: question.id,
      userAnswer: answers[question.id] || "",
      correctAnswer: question.correctAnswer,
      isCorrect: (answers[question.id] || "") === question.correctAnswer,
      questionText: question.text,
      options: question.options,
      hint: question.hint,
    }));
    setResults(currentResults);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  const allQuestionsAnswered = quizQuestions.every(q => answers[q.id]);
  const score = results.filter(r => r.isCorrect).length;

  if (showResults) {
    return (
      <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
        <header className="text-center w-full max-w-3xl">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-5xl font-bold text-primary">Resultados</h1>
          </div>
          <p className="text-2xl text-muted-foreground">
            ¡Acertaste {score} de {quizQuestions.length} preguntas!
          </p>
        </header>

        <div className="w-full max-w-2xl space-y-6">
          {results.map((result, index) => (
            <Card key={result.questionId} className={cn("shadow-lg overflow-hidden", result.isCorrect ? "border-green-500" : "border-red-500")}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{index + 1}. {result.questionText}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-md text-muted-foreground">Tu respuesta: <span className={cn("font-semibold", result.isCorrect ? "text-green-600" : "text-red-600")}>{result.userAnswer || "No respondida"}</span></p>
                {!result.isCorrect && (
                  <p className="text-md text-green-600 font-semibold">Respuesta correcta: {result.correctAnswer}</p>
                )}
                {result.isCorrect ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" /> ¡Correcto!
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-2" /> Incorrecto
                  </div>
                )}
                 {!result.isCorrect && result.hint && (
                  <div className="mt-2 p-3 bg-accent/50 rounded-md text-sm text-accent-foreground flex items-start">
                    <Lightbulb className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pista: {result.hint}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={handleReset} size="lg" className="text-lg py-3 shadow-md">
          <RotateCcw className="mr-2 h-5 w-5" />
          Volver a Intentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="w-12 h-12 text-primary mr-3" />
          <h1 className="text-5xl font-bold text-primary">Preguntas Divertidas</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          ¿Cuánto sabes sobre mí? ¡Pon a prueba tu conocimiento!
        </p>
      </header>

      <div className="w-full max-w-2xl space-y-8">
        {quizQuestions.map((question, index) => (
          <Card key={question.id} className="shadow-lg overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{index + 1}. {question.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="space-y-3"
              >
                {question.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-background rounded-md border hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value={option} id={`${question.id}-${idx}`} className="border-primary text-primary focus:ring-primary" />
                    <Label htmlFor={`${question.id}-${idx}`} className="text-md text-foreground flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {question.hint && (
                <div className="mt-4 p-3 bg-accent/30 rounded-md text-sm text-accent-foreground flex items-start">
                  <Lightbulb className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pista: {question.hint}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button onClick={handleCheckAnswers} size="lg" className="w-full text-lg py-3 shadow-md" disabled={!allQuestionsAnswered}>
          Comprobar Respuestas
        </Button>
        {!allQuestionsAnswered && (
            <p className="text-sm text-center text-muted-foreground mt-2">
                Por favor, responde todas las preguntas para comprobar.
            </p>
        )}
      </div>
    </div>
  );
}
