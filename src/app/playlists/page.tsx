import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListMusic, PlayCircle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link'; // Import Next.js Link

// Removed the previous playlists array

export default function PlaylistsPage() {
  // Define the single playlist link here
  const mainPlaylist = {
    title: "Nuestra Playlist Especial",
    description: "La banda sonora de nuestros momentos.",
    url: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M", // Example Spotify playlist link
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <ListMusic className="w-8 h-8" />
            Nuestras Melodías Compartidas
        </h1>
        <p className="text-lg text-muted-foreground">La banda sonora de nuestro amor, curada por nosotros, para nosotros.</p>
      </header>

      {/* Single Card for the main playlist link */}
      <div className="flex justify-center">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md">
          <CardHeader className="items-center text-center">
            <LinkIcon className="w-10 h-10 text-primary mb-3" />
            <CardTitle className="text-2xl text-foreground">{mainPlaylist.title}</CardTitle>
            <CardDescription className="text-md text-muted-foreground">{mainPlaylist.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6 pt-2">
            {/* Use Next.js Link for external navigation */}
            <Link href={mainPlaylist.url} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
              <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                <a> {/* Anchor tag is needed inside legacyBehavior Link */}
                  <PlayCircle className="mr-2 h-5 w-5" /> Escuchar en Spotify
                </a>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Removed the grid layout for multiple playlists */}
    </div>
  );
}
