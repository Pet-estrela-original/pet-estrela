
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="relative w-[600px] h-[170px]">
            <Image 
                src="https://i.imgur.com/vkU2IlK.png" 
                alt="Pet Estrela Crematório Logo" 
                fill
                className="object-contain"
                sizes="600px"
                priority 
            />
        </div>
    </Link>
);
