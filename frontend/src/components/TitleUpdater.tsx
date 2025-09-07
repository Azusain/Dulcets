'use client';

import { useEffect } from 'react';
import { updatePageTitle } from '@/utils/seo';

interface TitleUpdaterProps {
  page: 'home' | 'about' | 'services' | 'works' | 'contact';
}

export default function TitleUpdater({ page }: TitleUpdaterProps) {
  useEffect(() => {
    updatePageTitle(page);
  }, [page]);

  return null;
}
