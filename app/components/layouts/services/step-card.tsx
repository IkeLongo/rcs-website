import Image from 'next/image';

interface StepCardProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function StepCard({ icon, alt, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={icon}
        alt={alt}
        width={70}
        height={70}
        className="object-contain"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <h4 className="font-maven-pro text-[20px] font-bold my-2">{title}</h4>
      <p className="text-center font-avenir text-[14px]">{description}</p>
    </div>
  );
}
