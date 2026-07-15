// HomePage.tsx — landing page with feature cards for each demo case.
import { Link } from "wouter";
import { Card, Container, SimpleGrid, Text, Title } from "@mantine/core";

const CASES = [
  {
    route: "/basic",
    emoji: "📄",
    title: "Basic",
    description: "Static spec rendering — no state, no actions. The simplest possible Renderer usage.",
  },
  {
    route: "/form",
    emoji: "📝",
    title: "Form",
    description: "Two-way bound editable fields with edit/save/cancel lifecycle via action handlers.",
  },
  {
    route: "/actions",
    emoji: "⚡",
    title: "Actions",
    description: "Action dispatch with state feedback — button click saves a timestamp to the store.",
  },
  {
    route: "/large",
    emoji: "📊",
    title: "Large",
    description: "1,000-row repeat with inline-editable cells. Demonstrates granular per-path subscriptions at scale.",
  },
  {
    route: "/table",
    emoji: "📋",
    title: "Table",
    description: "HTML table rendering with <thead>/<tbody> structure built via repeat.",
  },
  {
    route: "/switch",
    emoji: "🔀",
    title: "Switch",
    description: "Conditional rendering using useValue — renders different subtrees based on store state.",
  },
];

export function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xs">
        mini-render demo
      </Title>
      <Text c="dimmed" ta="center" mb="xl" maw={600} mx="auto">
        A minimal spec-driven React UI renderer with granular per-path subscriptions.
        Each demo below is a self-contained example built from the same public API.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {CASES.map((c) => (
          <Card
            key={c.route}
            component={Link}
            href={c.route}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            <Text fz={36} mb="xs">
              {c.emoji}
            </Text>
            <Text fw={500} fz="lg" mb="xs">
              {c.title}
            </Text>
            <Text size="sm" c="dimmed">
              {c.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
