import Image from "next/image";

interface ImageProps extends Omit<React.ComponentProps<typeof Image>, "alt"> {
  alt?: string;
}

/**
 * `ImageWrapper` Component
 *
 * The `ImageWrapper` component is a wrapper around Next.js's `Image` component that provides a simplified interface for displaying general images.
 *
 * ## Default Styles
 * By default, the component has the following styles:
 * - Width set to `300` units.
 * - Height set to `200` units.
 *
 * ## Overriding Default Styles
 * Any props passed to the component (including `className`) will override the default styles.
 * However, the `alt` attribute is optional in this component, different from the Next.js `Image` component where it's mandatory.
 *
 * ## Accessibility
 * For accessibility reasons, it's recommended to always provide a meaningful `alt` attribute that describes the image, even if it's left as an empty string.
 *
 * @example
 * ```jsx
 * <ImageWrapper src="/path/to/image.jpg" alt="Descriptive text" />
 * ```
 *
 * @param props Props for the component.
 * @returns The `ImageWrapper` component.
 */
export const ImageWrapper: React.FC<ImageProps> = ({
  src = "",
  alt = "",
  ...rest
}) => {
  return <Image src={src} alt={alt} {...rest} />;
};
