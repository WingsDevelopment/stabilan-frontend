"use client";

import { useRouter } from "next/navigation";

import { Button } from "lib";

interface Props {
  label: string;
  redirectUrl: string;
}

export const LaunchAppButton: React.FC<Props> = ({ label, redirectUrl }) => {
  const { push } = useRouter();

  return (
    <Button
      className="w-52"
      color="success"
      size="big"
      onClick={() => {
        push(redirectUrl);
      }}
    >
      {label}
    </Button>
  );
};
