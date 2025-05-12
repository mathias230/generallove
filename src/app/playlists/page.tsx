import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListMusic, PlayCircle, Music2 } from 'lucide-react';
import Image from 'next/image';

const playlists = [
  { id: 1, title: "Our Love Anthems", description: "Songs that narrate our story.", tracks: ["Perfect - Ed Sheeran", "All of Me - John Legend", "A Thousand Years - Christina Perri"], coverArt: "https://picsum.photos/seed/playlist1/300/300", imageHint: "music notes" },
  { id: 2, title: "Cozy Evening Mix", description: "For quiet nights and warm cuddles.", tracks: ["Thinking Out Loud - Ed Sheeran", "Like Real People Do - Hozier", "Home - Edward Sharpe & The Magnetic Zeros"], coverArt: "https://picsum.photos/seed/playlist2/300/300", imageHint: "cozy fireplace" },
  { id: 3, title: "Road Trip Tunes", description: "Adventures on the open road with the perfect soundtrack.", tracks: ["Mr. Brightside - The Killers", "Take Me Home, Country Roads - John Denver", "Shut Up and Drive - Rihanna"], coverArt: "https://picsum.photos/seed/playlist3/300/300", imageHint: "road trip" },
];

export default function PlaylistsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <ListMusic className="w-8 h-8" />
            Our Shared Melodies
        </h1>
        <p className="text-lg text-muted-foreground">The soundtrack of our love, curated by us, for us.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex-row items-center gap-4 p-4">
              <Image 
                src={playlist.coverArt} 
                alt={`${playlist.title} cover art`} 
                width={80} 
                height={80} 
                className="rounded-md object-cover"
                data-ai-hint={playlist.imageHint}
              />
              <div>
                <CardTitle className="text-xl text-foreground">{playlist.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{playlist.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
              <h4 className="font-semibold text-sm text-foreground mb-2">Tracks:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {playlist.tracks.map((track, index) => (
                  <li key={index} className="flex items-center">
                    <Music2 className="w-3 h-3 mr-2 text-accent flex-shrink-0"/> 
                    {track}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 border-t border-border">
              <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                <PlayCircle className="mr-2 h-5 w-5" /> Play Playlist
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
