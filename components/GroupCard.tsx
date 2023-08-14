import Image from 'next/image';
import Link from 'next/link';

interface GroupCardProps {
  description: string;
  slug: string;
}

export default function GroupCard({
  description,
  slug,
}: GroupCardProps) {
  return (
    <Link href={`groups/${slug}`} className='card w-72 bg-base-100 shadow-xl'>
      <figure>
        <Image
          src='https://picsum.photos/id/1005/400/250'
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
