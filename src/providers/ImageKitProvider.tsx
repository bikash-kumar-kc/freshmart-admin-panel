import { Image, ImageKitProvider } from "@imagekit/next";

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export default function ImageKitProviderImage({
  src,
  width = 500,
  height = 500,
  alt = "vendor certificates",
}: ImageProps) {
  const imageKitEndPoint = process.env.NEXT_PUBLIC_IMAGE_KIT_ENDPOINT;

  if (typeof imageKitEndPoint === "undefined") {
    return;
  }
  return (
    <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGE_KIT_ENDPOINT}>
      <Image src={src} width={width} height={height} alt={alt} />
    </ImageKitProvider>
  );
}
