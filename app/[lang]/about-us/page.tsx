import BlocksRendererClient from '@/components/BlocksRendererClient';
import { getPageData } from '@/lib/page_data';
import GithubIcon from '@/public/icons/Github_icon.svg';
import LattesIcon from '@/public/icons/Lattes_icon.png';
import InstagramIcon from '@/public/icons/Instagram_icon.svg';
import LinkedinIcon from '@/public/icons/Linkedin_icon.svg';
import MailIcon from '@/public/icons/Mail_icon.svg';
import Female from '@/public/people/Female.svg';
import Guilherme from '@/public/people/GuilhermeAugusto.jpg';
import Lorena from '@/public/people/Lorena.jpeg';
import Male from '@/public/people/Male.svg';
import Sandro from '@/public/people/Sandro.jpeg';
import { AboutUsPage as AboutUsPageAttributes } from '@/types/page_types';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default async function AboutUsPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: AboutUsPageAttributes = await getPageData({
    path: 'about-us-page',
    locale: lang,
  });

  return (
    <div className='mx-auto space-y-4'>
      <div>
        <h1 className='p-3 text-3xl font-bold'>{pageAttributes.about_us}</h1>
        <section className='grid place-items-center bg-secondary p-4 text-white'>
          <BlocksRendererClient
            content={pageAttributes.text}
            className='text-primary-content'
          />
        </section>
      </div>
      <section className='mt-3 space-y-10 p-5'>
        <article id='authors'>
          <h2 className='mb-4 text-3xl font-bold'>{pageAttributes.authors}</h2>
          <div className='grid place-items-center gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3'>
            <Member
              photo={Lorena}
              name='Lorena Luiza Costa Rosa Nogueira'
              role={pageAttributes.authora}
              icons={[
                {
                  iconName: 'mail',
                  href: 'mailto:lorenabemdito@gmail.com',
                },
                {
                  iconName: 'instagram',
                  href: 'https://www.instagram.com/bemdito_com/',
                },
              ]}
            />
            <Member
              photo={Sandro}
              name='Sandro Renato Dias'
              role={pageAttributes.author}
              icons={[
                {
                  iconName: 'linkedin',
                  href: 'https://www.linkedin.com/in/sandrord',
                },
                {
                  iconName: 'lattes',
                  href: 'http://lattes.cnpq.br/5300421458375793'
                }
              ]}
            />
            <Member
              photo={Female}
              name='Anna Alice Figueirêdo de Almeida'
              role={pageAttributes.authora}
              icons={[]}
            />
            <Member
              photo={Female}
              name='Renata Rangel Azevedo'
              role={pageAttributes.authora}
              icons={[]}
            />
            <Member
              photo={Female}
              name='Ana Cristina Côrtes Gama'
              role={pageAttributes.authora}
              icons={[
                {
                  iconName: 'mail',
                  href: 'mailto:anacgama@medicina.ufmg.br',
                },
              ]}
            />
          </div>
        </article>
        <article>
          <h2 className='mb-4 text-3xl font-bold'>
            {pageAttributes.tech_team}
          </h2>
          <div className='grid place-items-center gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
            <Member
              photo={Guilherme}
              name='Guilherme Augusto de Oliveira'
              role={pageAttributes.developer}
              icons={[
                {
                  iconName: 'linkedin',
                  href: 'https://www.linkedin.com/in/guihermeaugusto/',
                },
                {
                  iconName: 'github',
                  href: 'https://www.github.com/Guilhermeaug',
                },
              ]}
            />
            <Member
              photo={Male}
              name='Vinicius Ferreira Pinheiro'
              role={pageAttributes.maintainer}
              icons={[]}
            />
          </div>
        </article>
        <hr className='border-t border-t-primary text-primary' />
        <article>
          <h2 className='mb-4 text-3xl font-bold'>
            {pageAttributes.contributors}
          </h2>
          <div className='grid place-items-center gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
            <Member
              photo={Male}
              name='Gleiston Assis Filho (CEFET)'
              role={pageAttributes.tech_team}
              icons={[]}
            />
            <Member
              photo={Female}
              name='Júlia de Oliveira Alves (UFMG)'
              role={pageAttributes.designer}
              icons={[]}
            />
          </div>
        </article>
      </section>
    </div>
  );
}

type Icons = 'linkedin' | 'github' | 'mail' | 'instagram' | 'lattes';

const iconsSrc = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  mail: MailIcon,
  instagram: InstagramIcon,
  lattes: LattesIcon
} as Record<Icons, StaticImageData>;

function Member({
  photo,
  name,
  role,
  icons,
}: {
  photo: StaticImageData;
  name: string;
  role: string;
  icons: {
    iconName: Icons;
    href: string;
  }[];
}) {
  return (
    <div className='grid w-56 place-items-center gap-1 text-center'>
      <div className='avatar'>
        <div className='w-52 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <Image
            className='h-auto w-full max-w-full'
            src={photo}
            alt={`Picture of ${name}`}
          />
        </div>
      </div>
      <p className='prose prose-stone'>{name}</p>
      <p className='prose prose-stone font-semibold'>{role}</p>
      <div className='flex justify-center gap-1'>
        {icons.map((icon) => {
          const imageSrc = iconsSrc[icon.iconName];
          return (
            <Link key={icon.iconName} href={icon.href} target='_blank'>
              <Image
                className='h-auto w-6 rounded-full'
                src={imageSrc}
                alt={`Icon of ${icon}`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
