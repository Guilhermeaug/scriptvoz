'use client';

import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    clarity.init('mqslegzqke');
  }, []);

  return null;
}
