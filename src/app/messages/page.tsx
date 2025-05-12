import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Quote } from 'lucide-react';

const messages = [
  { id: 1, title: "A Note of Love", content: "Every day with you feels like a beautiful dream I never want to wake up from. Your love is my greatest treasure.", author: "Your Love", date: "Just Now" },
  { id: 2, title: "Thinking of You", content: "Just wanted to send a little reminder of how much you mean to me. You light up my world in ways you can't imagine.", author: "Me", date: "Yesterday" },
  { id: 3, title: "My Everything", content: "You are my rock, my inspiration, and my best friend. Thank you for being you, and for being mine.", author: "Forever Yours", date: "Last Week" },
  { id: 4, title: "Sweet Nothings", content: "Whispering sweet nothings and sharing secret smiles - these are the threads that weave our love story.", author: "Adoringly", date: "A While Ago" },
];

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <MessageSquare className="w-8 h-8" />
            Words from the Heart
        </h1>
        <p className="text-lg text-muted-foreground">Messages that echo our love and affection.</p>
      </header>

      <div className="space-y-6 max-w-2xl mx-auto">
        {messages.map((message) => (
          <Card key={message.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Quote className="w-6 h-6 transform -scale-x-100" /> 
                    {message.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">From: {message.author} | {message.date}</CardDescription>
                </div>
                <Quote className="w-8 h-8 text-accent opacity-50" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground leading-relaxed">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
