
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="relative w-[200px] h-[56px]">
            <Image 
                src="https://i.imgur.com/vkU2IlK.png" 
                alt="Pet Estrela Crematório Logo" 
                fill
                className="object-contain"
                sizes="200px"
                priority 
            />
        </div>
    </Link>
);
