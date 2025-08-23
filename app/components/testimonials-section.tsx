import { StarFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface Testimonial {
  review: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

const TestimonialCard = ({ testimonial, size = 'normal' }: { testimonial: Testimonial; size?: 'normal' | 'small' }) => (
  <Card
    className={`${size === 'small' ? 'p-4' : 'p-8'} bg-white/70 backdrop-blur-sm border border-eveo/10 shadow-lg rounded-3xl h-full`}
  >
    <CardContent className="p-0 flex flex-col h-full">
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map(star => (
          <StarFilledIcon
            key={star}
            className={`${size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} fill-yellow-400 text-yellow-400`}
          />
        ))}
      </div>
      <p className={`text-gray-700 mb-6 italic flex-grow ${size === 'small' ? 'text-sm' : ''}`}>
        "{testimonial.review}"
      </p>
      <div className="flex items-center mt-auto">
        <div
          className={`${size === 'small' ? 'w-10 h-10' : 'w-12 h-12'} bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center justify-center mr-4 shadow-md`}
        >
          <span className={`text-white font-bold ${size === 'small' ? 'text-sm' : ''}`}>{testimonial.initials}</span>
        </div>
        <div>
          <div className={`font-bold ${size === 'small' ? 'text-sm' : ''}`}>{testimonial.name}</div>
          <p className={`text-gray-600 ${size === 'small' ? 'text-xs' : ''}`}>{testimonial.role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      review: t('testimonials.review1'),
      name: t('testimonials.reviewer1Name'),
      role: t('testimonials.reviewer1Role'),
      initials: 'MR',
      gradient: 'from-indigo-400 to-purple-400',
    },
    {
      review: t('testimonials.review2'),
      name: t('testimonials.reviewer2Name'),
      role: t('testimonials.reviewer2Role'),
      initials: 'SB',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      review: t('testimonials.review3'),
      name: t('testimonials.reviewer3Name'),
      role: t('testimonials.reviewer3Role'),
      initials: 'LV',
      gradient: 'bg-linear-135 from-eveo to-eveo-dark',
    },
    {
      review: t('testimonials.review4'),
      name: t('testimonials.reviewer4Name'),
      role: t('testimonials.reviewer4Role'),
      initials: 'EC',
      gradient: 'from-red-400 to-orange-400',
    },
    {
      review: t('testimonials.review5'),
      name: t('testimonials.reviewer5Name'),
      role: t('testimonials.reviewer5Role'),
      initials: 'AM',
      gradient: 'from-orange-400 to-yellow-400',
    },
    {
      review: t('testimonials.review6'),
      name: t('testimonials.reviewer6Name'),
      role: t('testimonials.reviewer6Role'),
      initials: 'DK',
      gradient: 'from-green-400 to-blue-400',
    },
    {
      review: t('testimonials.review7'),
      name: t('testimonials.reviewer7Name'),
      role: t('testimonials.reviewer7Role'),
      initials: 'JL',
      gradient: 'from-blue-400 to-indigo-400',
    },
    {
      review: t('testimonials.review8'),
      name: t('testimonials.reviewer8Name'),
      role: t('testimonials.reviewer8Role'),
      initials: 'MS',
      gradient: 'from-emerald-400 to-teal-400',
    },
    {
      review: t('testimonials.review9'),
      name: t('testimonials.reviewer9Name'),
      role: t('testimonials.reviewer9Role'),
      initials: 'RT',
      gradient: 'from-cyan-400 to-blue-400',
    },
  ];

  return (
    <section
      id="testimonials"
      className="container-fluid mx-auto px-3 sm:px-6 md:px-0 py-8 md:py-20 backdrop-blur-sm overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase">
          {t('testimonials.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
      </div>

      <Carousel
        className="w-full mx-auto max-w-6xl"
        opts={{
          align: 'start',
          loop: true,
          duration: 0,
        }}
      >
        <div className="w-full md:overflow-x-hidden py-5">
          <CarouselContent className="flex w-full transition-transform duration-500 ease-in-out py-10">
            {[...testimonials].map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="px-2 w-full md:basis-1/2 md:w-1/3 md:flex-shrink-0 md:px-4 lg:basis-1/3 lg:w-1/3 lg:flex-shrink-0 lg:px-4"
              >
                <TestimonialCard testimonial={testimonial} size="normal" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div>
            <CarouselPrevious className="left-2 top-94 sm:top-70 sm:left-3 lg:-left-3 md:top-1/2 sm:-translate-y-1/2 h-12 w-12 border-purple-200 text-purple-600 backdrop-blur-sm shadow-lg opacity-60 hover:opacity-100 hover:bg-white/100" />
            <CarouselNext className="right-2 top-94 sm:top-70 sm:right-3 lg:-right-3 md:top-1/2 sm:-translate-y-1/2 h-12 w-12 border-purple-200 text-purple-600 backdrop-blur-sm shadow-lg opacity-60 hover:opacity-100 hover:bg-white/100" />
          </div>
        </div>
      </Carousel>
    </section>
  );
};
