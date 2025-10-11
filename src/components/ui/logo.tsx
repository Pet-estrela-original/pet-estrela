
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="relative w-[140px] h-[40px]">
            <Image 
                src="https://i.imgur.com/blBpKxs.png" 
                alt="Pet Estrela Crematório Logo" 
                fill
                className="object-contain"
                sizes="140px"
                priority 
            />
        </div>
    </Link>
);
