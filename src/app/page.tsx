import MemoryCarousel from '@/components/memory-carousel';
// Removed Sparkles import as it's no longer used in the title

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-8 px-4 space-y-12"> {/* Changed justify-center to justify-start and added space-y */}
      <header className="w-full text-center"> {/* Made header full width */}
        <h1 className="text-6xl font-bold text-primary mb-4"> {/* Increased font size and margin */}
          Emi y Mathi
        </h1>
        <p className="text-xl text-muted-foreground">
          Un lugar especial para nuestros recuerdos y momentos compartidos.
        </p>
      </header>
      {/* Memory carousel is now below the main title */}
      <MemoryCarousel />
    </div>
  );
}
