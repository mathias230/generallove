import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

const photos = [
  { id: 1, src: "https://picsum.photos/seed/amor1/600/400", alt: "Romantic Getaway", caption: "Sunset by the beach", imageHint: "couple beach" },
  { id: 2, src: "https://picsum.photos/seed/amor2/600/400", alt: "City Lights", caption: "Adventures in the city", imageHint: "couple city" },
  { id: 3, src: "https://picsum.photos/seed/amor3/600/400", alt: "Cozy Evening", caption: "Warm smiles, happy hearts", imageHint: "couple smiling" },
  { id: 4, src: "https://picsum.photos/seed/amor4/600/400", alt: "Nature Walk", caption: "Exploring together", imageHint: "couple nature" },
  { id: 5, src: "https://picsum.photos/seed/amor5/600/400", alt: "Celebration", caption: "Marking a special day", imageHint: "couple celebration" },
  { id: 6, src: "https://picsum.photos/seed/amor6/600/400", alt: "Candid Moment", caption: "Pure joy", imageHint: "couple candid" },
];

export default function PhotosPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <ImageIcon className="w-8 h-8" />
            Our Photo Album
        </h1>
        <p className="text-lg text-muted-foreground">Snapshots of our journey, captured in time.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full h-60 object-cover"
                data-ai-hint={photo.imageHint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-foreground">{photo.caption}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
