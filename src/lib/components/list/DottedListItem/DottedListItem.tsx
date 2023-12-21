interface Props {
  children: React.ReactNode;
}

export const DottedListItem: React.FC<Props> = ({ children }) => {
  return (
    <li className="relative before:content-['\2022'] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2">
      {children}
    </li>
  );
};
