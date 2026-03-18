import { Providers } from "@components/Providers";
import { CustomersPage } from "./features/customers/CustomersPage";

export default function App() {
  return (
    <Providers>
      <CustomersPage />
    </Providers>
  );
}
