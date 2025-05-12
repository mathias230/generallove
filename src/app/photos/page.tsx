import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

const photos = [
  { id: 1, src: "https://picsum.photos/seed/amor1/600/400", alt: "Escapada Romántica", caption: "Atardecer en la playa", imageHint: "pareja playa" },
  { id: 2, src: "https://picsum.photos/seed/amor2/600/400", alt: "Luces de la Ciudad", caption: "Aventuras en la ciudad", imageHint: "pareja ciudad" },
  { id: 3, src: "https://picsum.photos/seed/amor3/600/400", alt: "Tarde Acogedora", caption: "Sonrisas cálidas, corazones felices", imageHint: "pareja sonriendo" },
  { id: 4, src: "https://picsum.photos/seed/amor4/600/400", alt: "Paseo por la Naturaleza", caption: "Explorando juntos", imageHint: "pareja naturaleza" },
  { id: 5, src: "https://picsum.photos/seed/amor5/600/400", alt: "Celebración", caption: "Marcando un día especial", imageHint: "pareja celebracion" },
  { id: 6, src: "https://picsum.photos/seed/amor6/600/400", alt: "Momento Espontáneo", caption: "Pura alegría", imageHint: "pareja espontanea" },
];

export default function PhotosPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <ImageIcon className="w-8 h-8" />
            Nuestro Álbum de Fotos
        </h1>
        <p className="text-lg text-muted-foreground">Instantáneas de nuestro viaje, capturadas en el tiempo.</p>
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
