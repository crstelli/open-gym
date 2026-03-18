import { useState, useMemo, useCallback } from "react";
import { Container, Title, Group, Button, TextInput, Text, Badge, ActionIcon, Stack, Paper, SimpleGrid, ThemeIcon } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { IconPlus, IconSearch, IconEdit, IconTrash, IconUsers, IconUserCheck, IconUserX } from "@tabler/icons-react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, themeQuartz, type ColDef, type ICellRendererParams } from "ag-grid-community";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

// --- Types ---

interface Customer {
  id: number;
  fullName: string;
  email: string;
  subscriptionExpiration: string;
}

interface CustomerFormData {
  fullName: string;
  email: string;
  subscriptionExpiration: Date | null;
}

// --- Mock Data ---

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 1, fullName: "Marco Rossi", email: "marco.rossi@email.com", subscriptionExpiration: "2026-06-15" },
  { id: 2, fullName: "Laura Bianchi", email: "laura.bianchi@email.com", subscriptionExpiration: "2026-01-20" },
  { id: 3, fullName: "Giuseppe Verdi", email: "giuseppe.verdi@email.com", subscriptionExpiration: "2026-09-30" },
  { id: 4, fullName: "Sofia Esposito", email: "sofia.esposito@email.com", subscriptionExpiration: "2025-12-01" },
  { id: 5, fullName: "Andrea Colombo", email: "andrea.colombo@email.com", subscriptionExpiration: "2026-04-10" },
  { id: 6, fullName: "Francesca Ricci", email: "francesca.ricci@email.com", subscriptionExpiration: "2025-11-05" },
  { id: 7, fullName: "Alessandro Ferrari", email: "a.ferrari@email.com", subscriptionExpiration: "2026-08-22" },
  { id: 8, fullName: "Giulia Romano", email: "giulia.romano@email.com", subscriptionExpiration: "2026-02-28" },
];

// --- Helpers ---

function isSubscriptionActive(dateStr: string): boolean {
  return dayjs(dateStr).isAfter(dayjs());
}

// --- AG Grid Theme ---

const gridTheme = themeQuartz.withParams({
  accentColor: "#228be6",
  borderRadius: 8,
});

// --- Sub-components ---

function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: string | number; stroke?: number }>;
  color: string;
}) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
            {title}
          </Text>
          <Text fw={700} fz="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon color={color} variant="light" size={48} radius="md">
          <Icon size={28} stroke={1.5} />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

function StatusCellRenderer(params: ICellRendererParams<Customer>) {
  if (!params.data) return null;
  const active = isSubscriptionActive(params.data.subscriptionExpiration);
  return (
    <Badge color={active ? "green" : "red"} variant="light" size="sm">
      {active ? "Active" : "Expired"}
    </Badge>
  );
}

function ActionsCellRenderer(params: ICellRendererParams<Customer>) {
  if (!params.data) return null;
  const { onEdit, onDelete } = params.context as {
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
  };
  return (
    <Group gap={4} wrap="nowrap">
      <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onEdit(params.data!)}>
        <IconEdit size={16} />
      </ActionIcon>
      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(params.data!)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );
}

function CustomerForm({ initialValues, onSubmit }: { initialValues?: CustomerFormData; onSubmit: (data: CustomerFormData) => void }) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [subscriptionExpiration, setSubscriptionExpiration] = useState<Date | null>(initialValues?.subscriptionExpiration ?? null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";
    if (!subscriptionExpiration) newErrors.subscriptionExpiration = "Subscription date is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      subscriptionExpiration,
    });
  };

  return (
    <Stack gap="md">
      <TextInput
        label="Full Name"
        placeholder="Enter full name"
        value={fullName}
        onChange={(e) => setFullName(e.currentTarget.value)}
        error={errors.fullName}
        withAsterisk
      />
      <TextInput
        label="Email"
        placeholder="Enter email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        error={errors.email}
        withAsterisk
      />
      <DatePickerInput
        label="Subscription Expiration"
        placeholder="Pick a date"
        value={subscriptionExpiration}
        onChange={(value) => setSubscriptionExpiration(value ? new Date(value) : null)}
        error={errors.subscriptionExpiration}
        withAsterisk
        clearable
      />
      <Button onClick={handleSubmit} fullWidth mt="sm">
        {initialValues ? "Update Customer" : "Add Customer"}
      </Button>
    </Stack>
  );
}

// --- Main Component ---

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) => c.fullName.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.id.toString().includes(query),
    );
  }, [customers, searchQuery]);

  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((c) => isSubscriptionActive(c.subscriptionExpiration)).length;
    const expired = total - active;
    return { total, active, expired };
  }, [customers]);

  const handleAdd = useCallback(
    (data: CustomerFormData) => {
      const newCustomer: Customer = {
        id: Math.max(0, ...customers.map((c) => c.id)) + 1,
        fullName: data.fullName,
        email: data.email,
        subscriptionExpiration: dayjs(data.subscriptionExpiration).format("YYYY-MM-DD"),
      };
      setCustomers((prev) => [...prev, newCustomer]);
    },
    [customers],
  );

  const handleEdit = useCallback((id: number, data: CustomerFormData) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              fullName: data.fullName,
              email: data.email,
              subscriptionExpiration: dayjs(data.subscriptionExpiration).format("YYYY-MM-DD"),
            }
          : c,
      ),
    );
  }, []);

  const handleDelete = useCallback((id: number) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const openAddModal = useCallback(() => {
    modals.open({
      title: "Register New Customer",
      centered: true,
      children: (
        <CustomerForm
          onSubmit={(data) => {
            handleAdd(data);
            modals.closeAll();
          }}
        />
      ),
    });
  }, [handleAdd]);

  const openEditModal = useCallback(
    (customer: Customer) => {
      modals.open({
        title: "Edit Customer",
        centered: true,
        children: (
          <CustomerForm
            initialValues={{
              fullName: customer.fullName,
              email: customer.email,
              subscriptionExpiration: dayjs(customer.subscriptionExpiration).toDate(),
            }}
            onSubmit={(data) => {
              handleEdit(customer.id, data);
              modals.closeAll();
            }}
          />
        ),
      });
    },
    [handleEdit],
  );

  const openDeleteModal = useCallback(
    (customer: Customer) => {
      modals.openConfirmModal({
        title: "Delete Customer",
        centered: true,
        children: (
          <Text size="sm">
            Are you sure you want to delete <strong>{customer.fullName}</strong>? This action cannot be undone.
          </Text>
        ),
        labels: { confirm: "Delete", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: () => handleDelete(customer.id),
      });
    },
    [handleDelete],
  );

  const gridContext = useMemo(() => ({ onEdit: openEditModal, onDelete: openDeleteModal }), [openEditModal, openDeleteModal]);

  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      { headerName: "ID", field: "id", width: 80, filter: "agNumberColumnFilter" },
      { headerName: "Full Name", field: "fullName", flex: 1, minWidth: 150, filter: "agTextColumnFilter" },
      { headerName: "Email", field: "email", flex: 1, minWidth: 200, filter: "agTextColumnFilter" },
      {
        headerName: "Subscription Expiration",
        field: "subscriptionExpiration",
        width: 210,
        filter: "agDateColumnFilter",
        valueFormatter: (params) => (params.value ? dayjs(params.value).format("DD MMM YYYY") : ""),
      },
      { headerName: "Status", width: 120, cellRenderer: StatusCellRenderer, sortable: false, filter: false },
      { headerName: "Actions", width: 100, cellRenderer: ActionsCellRenderer, sortable: false, filter: false },
    ],
    [],
  );

  const autoSizeStrategy = useMemo(() => ({ type: "fitGridWidth" as const }), []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2}>Customer Management</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Manage gym memberships and customer registrations
            </Text>
          </div>
          <Button leftSection={<IconPlus size={18} />} onClick={openAddModal}>
            Register Customer
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <StatsCard title="Total Customers" value={stats.total} icon={IconUsers} color="blue" />
          <StatsCard title="Active Subscriptions" value={stats.active} icon={IconUserCheck} color="green" />
          <StatsCard title="Expired Subscriptions" value={stats.expired} icon={IconUserX} color="red" />
        </SimpleGrid>

        <Paper withBorder radius="md" p="md">
          <Stack gap="md">
            <TextInput
              placeholder="Search by name, email, or ID..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <div style={{ height: 500 }}>
              <AgGridReact<Customer>
                theme={gridTheme}
                rowData={filteredCustomers}
                columnDefs={columnDefs}
                context={gridContext}
                autoSizeStrategy={autoSizeStrategy}
                pagination
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
              />
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export { CustomersPage };
