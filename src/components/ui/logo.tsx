
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="relative w-[250px] h-[70px]">
            <Image 
                src="https://i.imgur.com/vkU2IlK.png" 
                alt="Pet Estrela Crematório Logo" 
                fill
                className="object-contain"
                sizes="250px"
                priority 
            />
        </div>
    </Link>
);
