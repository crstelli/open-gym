import { MantineProvider } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return <MantineProvider>{children}</MantineProvider>;
}

export { Providers };
