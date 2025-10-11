
"use client";

import Link from "next/link";
import { CheckCircle, PawPrint, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans as staticPlans, Plan } from "@/lib/data";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const whatsappUrl = "https://wa.me/551142405253?text=Olá!%20Tudo%20bem?%20Gostaria%20de%20ser%20atendido%20e%20saber%20mais";


const PlanCard = ({ plan }: { plan: Plan }) => {
    return (
        <div className="perspective group md:h-auto">
            <div className="relative h-full w-full rounded-lg transition-all duration-700 md:[transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)]">
                {/* Front of card - Visible on all screens, but becomes the front of the 3D card on desktop */}
                <Card className={cn(
                    "relative rounded-lg shadow-xl p-6 md:p-8 flex flex-col h-full",
                    "md:[backface-visibility:hidden] md:absolute md:inset-0"
                )}>
                    {plan.isMostChosen && (
                        <Badge variant="default" className="absolute -top-3 right-5 bg-accent text-accent-foreground z-10">Mais Escolhido</Badge>
                    )}
                    <h3 className="font-headline text-3xl text-primary text-center mb-2">{plan.name}</h3>
                    <div className="text-center mb-6 min-h-[50px]">
                        {plan.price && <p className="text-4xl font-bold">{plan.price}</p>}
                        {plan.priceDogs && plan.priceCats && (
                            <div>
                                <p className="text-lg font-semibold">Cães: <span className="font-bold">{plan.priceDogs}</span></p>
                                <p className="text-lg font-semibold">Gatos: <span className="font-bold">{plan.priceCats}</span></p>
                            </div>
                        )}
                    </div>
                    <ul className="space-y-3 text-sm text-foreground/90 mb-6 flex-grow">
                        {plan.features.slice(0, 4).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        {plan.features.length > 4 && <li className="text-muted-foreground text-center">e mais...</li>}
                    </ul>
                     <p className="hidden md:block text-center text-sm text-muted-foreground mt-auto">Passe o mouse para ver detalhes</p>
                     <Button asChild variant="default" className="w-full mt-auto md:hidden">
                        <Link href={whatsappUrl} target="_blank">Contratar Agora</Link>
                    </Button>
                </Card>

                {/* Back of card - Hidden on mobile, becomes the back of the 3D card on desktop */}
                <div className="hidden md:flex absolute inset-0 bg-primary text-primary-foreground rounded-lg p-6 md:p-8 flex-col [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h3 className="font-headline text-3xl text-center mb-4">{plan.name}</h3>
                    <p className="text-center text-sm opacity-80 mb-6">{plan.description}</p>
                    <ul className="space-y-2 text-sm mb-6 flex-grow overflow-y-auto pr-2">
                        {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        {plan.optional && (
                            <li className="flex items-start gap-2 text-accent-foreground/80 mt-4">
                                <PawPrint className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                <span>{plan.optional}</span>
                            </li>
                        )}
                    </ul>
                    <Button asChild variant="secondary" className="w-full mt-auto">
                        <Link href={whatsappUrl} target="_blank">Contratar Agora</Link>
                    </Button>
                </div>

                 {/* Mobile-only details - Shown below the card */}
                 <Card className="mt-4 p-6 md:hidden">
                    <h4 className="font-bold text-lg mb-2 text-primary">Detalhes do Plano</h4>
                    <Separator className="mb-4" />
                    <p className="text-center text-sm text-muted-foreground mb-4">{plan.description}</p>
                     <ul className="space-y-2 text-sm mb-4">
                        {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        {plan.optional && (
                            <li className="flex items-start gap-2 text-muted-foreground mt-3 pt-3 border-t">
                                <PawPrint className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span>{plan.optional}</span>
                            </li>
                        )}
                    </ul>
                </Card>
            </div>
        </div>
    )
};

export default function PlanosPage() {
    return (
        <div className="bg-background">
            <section className="py-16 text-center bg-white">
                <div className="container mx-auto max-w-7xl px-4">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nossos Planos</h1>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
                        Encontre a homenagem que mais se conecta ao seu sentimento e às suas necessidades.
                    </p>
                </div>
            </section>

            <section className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 md:gap-x-8">
                    {staticPlans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
                 <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border text-center">
                        <CreditCard className="w-6 h-6 text-primary shrink-0" />
                        <p className="text-base text-center md:text-lg font-semibold text-foreground/90">
                           Todos os planos podem ser parcelados em até 3x sem juros.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
