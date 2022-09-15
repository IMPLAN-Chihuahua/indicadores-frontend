import { useEffect, useState } from "react"

const LocalImage = ({ file, alt = '' }) => {
  const [src, setSrc] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const obj = URL.createObjectURL(file);
    setSrc(obj)
    return () => URL.revokeObjectURL(obj);
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      width='100%'
    />
  );
};

export default LocalImage;