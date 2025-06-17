
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, CheckCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const surveyQuestions: Question[] = [
  {
    id: 'q1',
    text: '¿Cuál es tu recuerdo favorito juntos hasta ahora?',
    options: [
      'Nuestra primera cita',
      'El primer "te amo"',
      'Un viaje especial',
      'Un momento cotidiano pero significativo',
    ],
  },
  {
    id: 'q2',
    text: '¿Qué tipo de cita te gustaría tener próximamente?',
    options: [
      'Una cena romántica en casa',
      'Una aventura al aire libre',
      'Ir a un concierto o evento cultural',
      'Una tarde de juegos y risas',
    ],
  },
  {
    id: 'q3',
    text: 'Si pudieras describir nuestro amor en una palabra, ¿cuál sería?',
    options: ['Mágico', 'Compañerismo', 'Aventura', 'Destino'],
  },
  {
    id: 'q4',
    text: '¿Qué pequeña cosa te hace sonreír más en el día a día?',
    options: [
        'Un mensaje tuyo',
        'Un abrazo inesperado',
        'Recordar un momento divertido',
        'Tu forma de ser',
    ],
  },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the answers to a backend
    console.log('Respuestas de la encuesta:', answers);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center justify-center gap-2">
              <CheckCircle className="w-8 h-8" />
              ¡Gracias por tus Respuestas!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Tus respuestas han sido guardadas en nuestro corazón (y en la consola del navegador por ahora 😉).
            </p>
            <Button onClick={handleReset} size="lg" className="w-full">
              <RotateCcw className="mr-2 h-5 w-5" />
              Responder de Nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allQuestionsAnswered = surveyQuestions.every(q => answers[q.id]);

  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="w-12 h-12 text-primary mr-3" />
          <h1 className="text-5xl font-bold text-primary">Nuestra Encuesta</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Algunas preguntas para conocernos (aún más) y divertirnos.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
        {surveyQuestions.map((question) => (
          <Card key={question.id} className="shadow-lg overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-md border hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value={option} id={`${question.id}-${index}`} className="border-primary text-primary focus:ring-primary" />
                    <Label htmlFor={`${question.id}-${index}`} className="text-md text-foreground flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        <Button type="submit" size="lg" className="w-full text-lg py-3 shadow-md" disabled={!allQuestionsAnswered}>
          Enviar Respuestas
        </Button>
        {!allQuestionsAnswered && (
            <p className="text-sm text-center text-muted-foreground mt-2">
                Por favor, responde todas las preguntas para enviar.
            </p>
        )}
      </form>
    </div>
  );
}
