
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LocationMap() {
    const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d915.2936733220551!2d-46.35338483036494!3d-23.40312829658532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce87f03e5696d1%3A0xe343b94849758421!2sAv.%20Ad%C3%ADlia%20Barbosa%20Neves%2C%202500-2682%20-%20Centro%20Industrial%2C%20Aruj%C3%A1%20-%20SP%2C%2007432-575!5e0!3m2!1spt-BR!2sbr!4v1721159847585!5m2!1spt-BR!2sbr";
    const placeUrl = "https://www.google.com/maps/place/Av.+Ad%C3%ADlia+Barbosa+Neves,+2500-2682+-+Centro+Industrial,+Aruj%C3%A1+-+SP,+07432-575/@-23.4031283,-46.3540108,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce87f03e5696d1:0xe343b94849758421!8m2!3d-23.4031283!4d-46.3527931!16s%2Fg%2F11h76dw5cg?entry=ttu";
    const directionsUrl = "https://www.google.com/maps/dir//Av.+Ad%C3%ADlia+Barbosa+Neves,+2500-2682+-+Centro+Industrial,+Aruj%C3%A1+-+SP,+07432-575/@-23.4031283,-46.3540108,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x94ce87f03e5696d1:0xe343b94849758421!2m2!1d-46.3527931!2d-23.4031283!3e0?entry=ttu";

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto max-w-7xl px-4">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold text-primary">Como Chegar</h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                        Estamos localizados em um ponto de fácil acesso para sua conveniência.
                    </p>
                </div>
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
                 <div className="mt-8 text-center space-y-4">
                    <p className="text-muted-foreground">Av. Adília Barbosa Neves, 2500-2682 - Centro Industrial</p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href={directionsUrl} target="_blank">
                                Rotas
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                             <Link href={placeUrl} target="_blank">
                                Ver mapa ampliado
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
    
