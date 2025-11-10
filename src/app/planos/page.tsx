
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


const PlanCard = ({ plan }: { plan: Plan }) => {
    
    const calculateDiscountedPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price * 0.95);
    }

    const renderPriceSection = (price?: number, installments?: string) => {
        if (!installments) return null;
        
        return (
            <div className="min-h-[100px] flex flex-col justify-center">
                <p className="font-bold text-2xl md:text-3xl text-foreground">{installments}</p>
                {price && (
                    <p className="text-xs text-muted-foreground mt-1">
                        ou {calculateDiscountedPrice(price)} à vista
                    </p>
                )}
            </div>
        );
    }

    return (
        <Card className={cn(
            "rounded-lg shadow-xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 group hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50 border-2 border-transparent relative",
            plan.isMostChosen && "border-primary/50 bg-white"
        )}>
            {plan.isMostChosen && (
                <Badge variant="default" className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-accent text-accent-foreground z-20">Mais Escolhido</Badge>
            )}
            <div className="text-center z-10 pt-4">
                 <h3 className="font-headline text-3xl text-primary mb-2">{plan.name}</h3>
                 <div className="relative mb-6">
                    <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    <div className="z-10 relative">
                        {plan.price ? (
                             renderPriceSection(plan.price, plan.installments)
                        ) : (
                            <div className="space-y-4 min-h-[100px] flex flex-col justify-center">
                                {plan.priceDogs && plan.installmentsDogs && (
                                    <div>
                                        <h4 className="font-semibold text-lg">Cães</h4>
                                        {renderPriceSection(plan.priceDogs, plan.installmentsDogs)}
                                    </div>
                                )}
                                 {plan.priceDogs && plan.priceCats && <Separator className="my-2"/>}
                                {plan.priceCats && plan.installmentsCats && (
                                    <div>
                                        <h4 className="font-semibold text-lg">Gatos</h4>
                                        {renderPriceSection(plan.priceCats, plan.installmentsCats)}
                                    </div>

                                )}
                            </div>
                        )}
                    </div>
                 </div>
                 <p className="text-sm text-muted-foreground mb-6 h-12">{plan.description}</p>
            </div>
            
            <Separator className="mb-6 z-10" />

            <ul className="space-y-3 text-sm text-foreground/90 mb-6 flex-grow z-10">
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

            <Button asChild variant="default" className="w-full mt-auto z-10">
                <Link href={whatsappUrl} target="_blank">Contratar Agora</Link>
            </Button>
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
                            <div key={plan.id} className={cn(isMiddleCard && "lg:mt-[-24px] z-10")}>
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
