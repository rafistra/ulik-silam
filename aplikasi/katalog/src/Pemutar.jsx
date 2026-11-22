import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import { Video, hitungDurasiNarasi, hitungLini, KANVAS } from '../../../paket/video/src/pemutar';

/**
 * Pratinjau komposisi VideoUlikSilam dengan aset yang ada; adegan tanpa ilustrasi tampil sebagai placeholder.
 * ref.lompat(nomor) memindahkan pemutar ke awal adegan.
 */
const Pemutar = forwardRef(function Pemutar({ data }, ref) {
  const [durasi, setDurasi] = useState(null);
  const [galat, setGalat] = useState(null);
  const pemain = useRef(null);
  useEffect(() => {
    let batal = false;
    setDurasi(null);
    setGalat(null);
    hitungDurasiNarasi(data)
      .then((d) => !batal && setDurasi(d))
      .catch((e) => !batal && setGalat(e.message));
    return () => {
      batal = true;
    };
  }, [data]);
  const lini = useMemo(() => (durasi ? hitungLini(durasi) : null), [durasi, data]);
  useImperativeHandle(ref, () => ({
    lompat: (nomor) => {
      const a = lini?.adegan.find((x) => x.nomor === nomor);
      if (a && pemain.current) {
        pemain.current.seekTo(a.mulai);
        pemain.current.play();
      }
    },
  }));
  if (galat) return <p className="status-kurang kecil">Pratinjau gagal dimuat: {galat}</p>;
  if (!lini) return <p className="redup kecil" style={{ padding: 20, textAlign: 'center' }}>Mengukur durasi narasi...</p>;
  return (
    <Player
      ref={pemain}
      component={Video}
      inputProps={{ data, durasiNarasi: durasi }}
      durationInFrames={lini.total}
      fps={KANVAS.fps}
      compositionWidth={KANVAS.lebar}
      compositionHeight={KANVAS.tinggi}
      controls
      acknowledgeRemotionLicense
      style={{ width: '100%', aspectRatio: '9 / 16' }}
    />
  );
});

export default Pemutar;
