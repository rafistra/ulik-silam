import React from 'react';
import { LABEL_LAPISAN, LAPISAN, TIPE, WARNA, ZONA, type NamaLapisan } from '../lib/merek';

/** Satu atau dua label lapisan berdampingan di kiri atas zona aman; lapisan utama di kiri. */
export const LabelLapisan: React.FC<{ lapisan: NamaLapisan[]; opacity?: number }> = ({ lapisan, opacity = 1 }) => (
  <div style={{ position: 'absolute', left: ZONA.kiri, top: ZONA.atas, display: 'flex', gap: LABEL_LAPISAN.jarak, opacity }}>
    {lapisan.map((nama) => {
      const l = LAPISAN[nama];
      return (
        <div
          key={nama}
          style={{
            ...TIPE.label,
            color: l.warna,
            display: 'flex',
            alignItems: 'center',
            gap: LABEL_LAPISAN.jarakIkon,
            padding: LABEL_LAPISAN.padding,
            border: `${LABEL_LAPISAN.tebalGaris}px solid ${l.warna}`,
            borderRadius: LABEL_LAPISAN.sudut,
            background: WARNA.bayang,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={LABEL_LAPISAN.ukuranIkon}
            height={LABEL_LAPISAN.ukuranIkon}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: l.ikon }}
          />
          <span>{nama}</span>
        </div>
      );
    })}
  </div>
);
