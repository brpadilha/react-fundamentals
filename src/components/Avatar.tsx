import styles from "./Avatar.module.css";

type AvatarProps = {
  src: string;
  hasBorder?: boolean;
  alt?: string;
};

export function Avatar({ src, hasBorder = true, alt }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
    />
  );
}
