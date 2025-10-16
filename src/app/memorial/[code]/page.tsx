
"use client";

import * as React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase, useMemoFirebase } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collectionGroup, query, where } from 'firebase/firestore';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Calendar, Heart, User, Venus, Mars, TreePine, Hash, ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PetProfile = {
  id: string;
  name: string;
  tutors: string;
  animalType: string;
  sex: 'Macho' | 'Fêmea';
  breed: string;
  birthDate: string | { toDate: () => Date };
  cremationDate: string | { toDate: () => Date };
  tree: string;
  shortDescription: string;
  fullDescription: string;
  imageUrls: string[];
  memorialCode: string;
};

const MediaItem = ({ src, alt }: { src: string, alt: string }) => {
    if (!src) return <Skeleton className="w-full h-full" />;
    
    const isVideo = src.endsWith('.mp4');

    if (isVideo) {
        return (
            <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        );
    }
    
    return (
         <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
        />
    );
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-start gap-3 text-sm">
        <div className="text-primary pt-0.5">{icon}</div>
        <div className="flex flex-col">
          <span className="font-semibold">{label}</span>
          <span className="text-muted-foreground">{value || 'Não informado'}</span>
        </div>
    </div>
);

const PetProfilePage = () => {
    const params = useParams();
    const { firestore } = useFirebase();
    const [isClient, setIsClient] = React.useState(false);
    
    React.useEffect(() => {
        setIsClient(true);
    }, []);
    
    const memorialCode = params.code ? `#${params.code}` : null;
    const embedUrl = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d716.4800318536218!2d-46.3504070014282!3d-23.4034475960417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDI0JzExLjYiUyA0NsKwMjEnMDEuNiJX!5e0!3m2!1spt-BR!2sbr!4v1721160359737!5m2!1spt-BR!2sbr";
    const placeUrl = "https://www.google.com/maps/place/23%C2%B024'11.6%22S+46%C2%B021'01.6%22W/@-23.4034476,-46.350407,283m/data=!3m1!1e3!4m4!3m3!8m2!3d-23.4032222!4d-46.3504444?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D";
    const directionsUrl = "https://www.google.com/maps/dir//-23.4032222,-46.3504444/@-23.4034476,-46.350407,283m/data=!4m2!4m1!3e0?entry=ttu";


    const petQuery = useMemoFirebase(() => {
        if (!firestore || !memorialCode) return null;
        return query(collectionGroup(firestore, 'pet_memorial_profiles'), where('memorialCode', '==', memorialCode));
    }, [firestore, memorialCode]);

    const { data: pets, isLoading } = useCollection<PetProfile>(petQuery);
    const selectedPet = pets?.[0];

    const formatDate = React.useCallback((dateString: string | { toDate: () => Date }) => {
        try {
            if (!dateString) return "Não informado";
            const date = typeof dateString === 'string' ? new Date(dateString) : dateString.toDate();
            if (isNaN(date.getTime())) return "Data inválida";

            if (typeof dateString === 'string') {
                const offset = date.getTimezoneOffset();
                date.setMinutes(date.getMinutes() + offset);
            }

            return new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        } catch(e) {
            console.error("Error formatting date:", e, "Input:", dateString);
            return "Data inválida";
        }
    }, []);
    
    const showLoadingSkeleton = !isClient || isLoading || !memorialCode;

    if (showLoadingSkeleton) {
        return (
             <div className="container mx-auto max-w-5xl my-12 p-4">
                <Skeleton className="h-10 w-48 mb-8" />
                <Card className="overflow-hidden shadow-xl">
                    <div className="grid md:grid-cols-2">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-6 md:p-8 space-y-6">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-2/3" />
                            <Separator />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (!selectedPet) {
        return (
            <div className="text-center py-20 px-4">
                <h2 className="text-2xl font-bold text-primary">Memorial não encontrado</h2>
                <p className="text-muted-foreground mt-2">O código do memorial informado não corresponde a nenhum pet.</p>
                 <Button asChild className="mt-8">
                    <Link href="/memorial">Voltar para o Memorial</Link>
                </Button>
            </div>
        )
    }
    
    return (
        <div className='bg-background min-h-screen py-8 md:py-12'>
            <div className="container mx-auto max-w-5xl px-4">
                 <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/memorial">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o Memorial
                        </Link>
                    </Button>
                </div>
                 <Card className="overflow-hidden shadow-xl border-t-4 border-primary">
                    <div className="grid md:grid-cols-2">
                        <div className='w-full'>
                             <Carousel className="w-full h-full">
                                <CarouselContent>
                                    {(selectedPet.imageUrls || []).map((url, index) => (
                                        <CarouselItem key={index}>
                                             <div className="relative aspect-square w-full">
                                                <MediaItem src={url} alt={`${selectedPet.name} - foto ${index + 1}`} />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                 {(selectedPet.imageUrls?.length || 0) > 1 && <>
                                    <CarouselPrevious className="left-2 md:left-4"/>
                                    <CarouselNext className="right-2 md:right-4"/>
                                 </>}
                            </Carousel>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col bg-white">
                            <header className="text-left mb-6">
                                <h1 className="font-headline text-4xl md:text-5xl text-primary mb-2">{selectedPet.name}</h1>
                                <p className='italic text-muted-foreground text-base md:text-lg'>
                                    "{selectedPet.shortDescription}"
                                </p>
                            </header>
                            <div className="space-y-6 flex-grow">
                                <p className="text-base text-foreground leading-relaxed">{selectedPet.fullDescription}</p>

                                <Separator />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                                  <InfoItem icon={<Hash size={16}/>} label="Protocolo" value={selectedPet.memorialCode} />
                                  <InfoItem icon={<User size={16}/>} label="Tutores" value={selectedPet.tutors} />
                                  <InfoItem icon={selectedPet.sex === 'Macho' ? <Mars size={16}/> : <Venus size={16}/>} label="Sexo" value={selectedPet.sex} />
                                  <InfoItem icon={<Heart size={16}/>} label="Raça" value={selectedPet.breed} />
                                  <InfoItem icon={<TreePine size={16}/>} label="Árvore Memorial" value={selectedPet.tree} />
                                  <InfoItem icon={<Calendar size={16}/>} label="Nascimento" value={formatDate(selectedPet.birthDate)} />
                                  <InfoItem icon={<Calendar size={16}/>} label="Cremação" value={formatDate(selectedPet.cremationDate)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                 <Card className="mt-8 shadow-xl">
                    <CardContent className="p-6">
                         <h2 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2">
                           <MapPin size={24} />
                           Localização no Jardim Memorial
                        </h2>
                        <p className="text-muted-foreground mb-4">
                           A árvore em homenagem a {selectedPet.name} está plantada em nosso jardim. Use o mapa abaixo para ver a localização exata e fazer uma visita.
                        </p>
                        <div className="aspect-video w-full rounded-lg overflow-hidden border shadow-lg">
                             <iframe
                                src={embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                         <div className="mt-8 text-center flex justify-center gap-4">
                            <Button asChild>
                                <Link href={directionsUrl} target="_blank">
                                    Obter Rotas
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                 <Link href={placeUrl} target="_blank">
                                    Ver mapa ampliado
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


export default PetProfilePage;
