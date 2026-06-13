import React, { useState, useEffect } from 'react';

// Curated high-quality child-friendly/book illustration styled Unsplash URLs matching each story/quiz asset
const FALLBACK_MAP: { [key: string]: string } = {
  'seq_ballroom': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600', // Party/ballroom with streamers
  'seq_dirk': 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=600', // Messenger/arrival/antique scroll
  'seq_queen': 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600', // Royal Golden Crown/throne
  'seq_pocket': 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=600', // Tiny kitten in blanket/pocket
  'cat_secret': 'https://images.unsplash.com/photo-1574158622643-69d34d72650a?auto=format&fit=crop&q=80&w=600', // Secret whispering cat / cozy cute fluffy cat
  'quiz_img_1': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600', // Laughing friends "What's going on!"
  'quiz_img_2': 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80&w=600', // Person needing help / looking up
  'quiz_img_3': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600', // Magical glowing butterfly forest "Come with me!"
  'quiz_img_4': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600', // Heavy study bag / stack of books
  'quiz_img_5': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600', // Empty room with party setup
  'quiz_img_6': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600', // Cute puppy classmate/toy car playmate
};

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackKey?: string;
  className?: string;
  referrerPolicy?: string;
}

export function ImageWithFallback({ src, alt, className, fallbackKey, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  // Sync state if src changes
  useEffect(() => {
    setImgSrc(src);
    setFailed(false);
  }, [src]);

  // Derive target fallback from src if key is not explicitly provided
  const getFallbackUrl = () => {
    const key = fallbackKey || Object.keys(FALLBACK_MAP).find(k => src.includes(k));
    if (key && FALLBACK_MAP[key]) {
      return FALLBACK_MAP[key];
    }
    // Generic high-quality children fantasy illustration placeholder
    return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600';
  };

  const handleError = () => {
    if (!failed) {
      setImgSrc(getFallbackUrl());
      setFailed(true);
    }
  };

  return (
    <img
      src={imgSrc || getFallbackUrl()}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
