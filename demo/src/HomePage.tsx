// HomePage.tsx — landing page with feature cards for each demo case.
import { Link } from "wouter";
import { Card, Container, SimpleGrid, Text, Title, Anchor } from "@mantine/core";

const CASES = [
  {
    route: "/basic",
    emoji: "📄",
    title: "Basic",
    description: "Renders a static greeting from a JSON spec — demonstrates the Renderer component and type-driven element resolution.",
  },
  {
    route: "/form",
    emoji: "📝",
    title: "Form",
    description: "Editable fields with edit/save/cancel toggle — demonstrates useBound two-way bindings and on action handlers.",
  },
  {
    route: "/actions",
    emoji: "⚡",
    title: "Actions",
    description: "Button click dispatches an action that writes to the store — demonstrates the emit action system and on.click handlers.",
  },
  {
    route: "/large",
    emoji: "📊",
    title: "Large",
    description: "1,000-row repeat with inline-editable cells — demonstrates the repeat directive and granular per-path subscriptions at scale.",
  },
  {
    route: "/table",
    emoji: "📋",
    title: "Table",
    description: "1,000-row HTML table with <thead>/<tbody> — demonstrates composing semantic HTML via repeat on <tr> elements.",
  },
  {
    route: "/switch",
    emoji: "🔀",
    title: "Switch",
    description: "Toggle between loading, loaded, and error states — demonstrates the Switch component and conditional rendering with useValue.",
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
      <Anchor
        href="https://github.com/ypyl/mini-render"
        target="_blank"
        size="sm"
        ta="center"
        display="block"
        mb="xl"
      >
        View source on GitHub →
      </Anchor>
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
