import React, { useState, useEffect } from 'react';

// Curated high-quality child-friendly/book illustration styled Unsplash URLs matching each story/quiz asset
const FALLBACK_MAP: { [key: string]: string } = {
  'seq_ballroom': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', // Watercolor style colorful celebration background
  'seq_dirk': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600', // Whimsical decorative storybook border/illustration
  'seq_queen': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600', // Golden magical castle towers, fairytale style
  'seq_pocket': 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600', // Cozy cute kitten with funny glasses, playful child-book illustration style
  'cat_secret': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600', // Sweet fairytale-like companion cat
  'quiz_img_1': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600', // Colorful artistic whimsical painting representing fun/friends
  'quiz_img_2': 'https://images.unsplash.com/photo-1550147760-44c9966d6bc7?auto=format&fit=crop&q=80&w=600', // Hand-drawn storytelling sketch with sweet whimsical characters
  'quiz_img_3': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600', // Dreamy glowing forest representing magical butterflies
  'quiz_img_4': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600', // Cozy classic storybooks and wizard castle vibes
  'quiz_img_5': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', // Fantasy golden wizard school/party style setup
  'quiz_img_6': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600', // Cute watercolor baby animal drawing
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
