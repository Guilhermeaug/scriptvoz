import Image from 'next/image';
import Link from 'next/link';

interface GroupCardProps {
  description: string;
  slug: string;
  id: number;
  href: string;
}

export default function GroupCard({
  description,
  slug,
  id,
  href,
}: GroupCardProps) {
  return (
    <Link href={href} className='card w-72 bg-base-100 shadow-xl'>
      <figure>
        <Image
          src={`https://picsum.photos/seed/${slug}-${id}/400/250`}
          alt='Man'
          width={300}
          height={300}
        />
      </figure>
      <div className='card-body text-sm text-ellipsis'>
        <p>{description}</p>
      </div>
    </Link>
  );
}
