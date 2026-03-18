import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <MantineProvider>
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}

export { Providers };
