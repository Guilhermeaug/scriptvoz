'use client';

import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

export default function MicrosoftClarity() {
  useEffect(() => {
    clarity.init('mqslegzqke');
  }, []);

  return null;
}
