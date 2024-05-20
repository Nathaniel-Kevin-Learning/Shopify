'use server';
import Link from 'next/link';

export default async function Banner() {
  const dataImage: string[] = [
    'https://res.cloudinary.com/dghilbqdk/image/upload/v1715077046/sample%20c2p3/xnq4cmfllgooimdv4ffd.webp',
    'https://res.cloudinary.com/dghilbqdk/image/upload/v1715077046/sample%20c2p3/ggxljsuf9yhmnizmvp7n.webp',
    'https://res.cloudinary.com/dghilbqdk/image/upload/v1715077046/sample%20c2p3/lftsebgjqd80yakdcaio.webp',
    'https://res.cloudinary.com/dghilbqdk/image/upload/v1715077045/sample%20c2p3/qvdvxqr0ztnuqgvlnpf8.jpg',
    'https://res.cloudinary.com/dghilbqdk/image/upload/v1715077045/sample%20c2p3/cux8j04m2ozxwduwsxbe.png',
  ];
  return (
    <div className="bg-gradient-to-r from-slate-500 to-slate-200  h-60">
      <div className="carousel w-full">
        {dataImage.map((image, index) => (
          <div
            key={index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full h-full"
          >
            <img src={image} className="w-full h-60 object-scale-down" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <Link
                href={`#slide${index === 0 ? dataImage.length : index}`}
                className="btn btn-circle"
              >
                ❮
              </Link>
              <Link
                href={`#slide${index === dataImage.length - 1 ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
