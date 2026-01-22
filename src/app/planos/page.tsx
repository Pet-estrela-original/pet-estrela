
"use client";

import Link from "next/link";
import { CheckCircle, PawPrint, CreditCard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans as staticPlans, Plan } from "@/lib/data";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const whatsappUrl = "https://wa.me/551142405253?text=Olá!%20Tudo%20bem?%20Gostaria%20de%20ser%20atendido%20e%20saber%20mais";

const PriceBlock = ({ installmentText, fullPriceText }: { installmentText: string; fullPriceText: string }) => (
    <div>
        <h3 className="font-bold text-3xl text-foreground leading-tight">{installmentText}</h3>
        <small className="text-muted-foreground">{fullPriceText}</small>
    </div>
);

const PlanCard = ({ plan }: { plan: Plan }) => {

    return (
        <Card className={cn(
            "rounded-lg shadow-xl flex flex-col h-full transition-all duration-300 group hover:shadow-primary/20 hover:-translate-y-2 border-2 border-transparent relative",
            plan.isMostChosen && "border-primary/50 bg-white"
        )}>
             <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            {plan.isMostChosen && (
                <Badge variant="default" className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-accent text-accent-foreground z-20">Mais Escolhido</Badge>
            )}
            <div className="text-center z-10 pt-8 relative">
                 <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                 <h3 className="font-headline text-3xl text-primary mb-2 relative z-10">{plan.name}</h3>
                 
                 <div className="relative z-10">
                    <div className="min-h-[100px] flex flex-col justify-center px-4">
                        {plan.id === 'essencia' ? (
                            <div className="space-y-4">
                                {plan.priceDogs && (
                                     <div>
                                        <h4 className="font-semibold text-lg">Cães</h4>
                                        <PriceBlock installmentText="12x de R$ 37,50 sem juros" fullPriceText="ou R$ 450,00 à vista" />
                                    </div>
                                )}
                                {plan.priceDogs && plan.priceCats && <Separator className="my-2" />}
                                {plan.priceCats && (
                                    <div>
                                        <h4 className="font-semibold text-lg">Gatos</h4>
                                        <PriceBlock installmentText="12x de R$ 23,34 sem juros" fullPriceText="ou R$ 280,00 à vista" />
                                    </div>
                                )}
                            </div>
                        ) : plan.id === 'harmonia' ? (
                            <PriceBlock installmentText="12x de R$ 80,00 sem juros" fullPriceText="ou R$ 960,00 à vista" />
                        ) : plan.id === 'eternus' ? (
                            <PriceBlock installmentText="12x de R$ 99,17 sem juros" fullPriceText="ou R$ 1.190,00 à vista" />
                        ) : null}
                    </div>
                 </div>
                 <p className="text-sm text-muted-foreground mb-6 h-12 px-4 relative z-10">{plan.description}</p>
            </div>
            
            <Separator className="mb-6 z-10" />

            <div className="p-6 pt-0 flex flex-col flex-grow z-10">
                <ul className="space-y-3 text-sm text-foreground/90 mb-6 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                    {plan.optional && (
                        <li className="flex items-start gap-3 text-muted-foreground mt-4 pt-4 border-t">
                            <PawPrint className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                            <span>{plan.optional}</span>
                        </li>
                    )}
                </ul>

                <Button asChild variant="default" className="w-full mt-auto">
                    <Link href={whatsappUrl} target="_blank">Contratar Agora</Link>
                </Button>
            </div>
        </Card>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {staticPlans.map((plan, index) => {
                        const isMiddleCard = index === 1;
                        return (
                            <div key={plan.id} className={cn(isMiddleCard && "lg:pt-0 lg:-mt-6")}>
                                <PlanCard plan={plan} />
                            </div>
                        )
                    })}
                </div>
                 <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border text-center">
                        <CreditCard className="w-6 h-6 text-primary shrink-0" />
                        <p className="text-base text-center md:text-lg font-semibold text-foreground/90">
                           Todos os planos podem ser parcelados em até 12x sem juros.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
