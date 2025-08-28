// Sunucu bileşeni (başına "use client" koyma)
import { redirect } from 'next/navigation';
export default function RootRedirect() {
  redirect('/tr');
}

export const dynamic = 'force-static';
