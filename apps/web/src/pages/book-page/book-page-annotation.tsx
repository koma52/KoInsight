import { BookWithData } from '@koinsight/common/types';
import { Flex, TextInput, Blockquote, Card, Group, Text, Badge, ActionIcon } from '@mantine/core';
import { IconHash, IconAlignJustified, IconClock, IconBookmark, IconTrash } from '@tabler/icons-react';
import { JSX, useState } from 'react';

type BookPageAnnotationProps = {
  book: BookWithData;
};

export function BookPageAnnotation({ book }: BookPageAnnotationProps): JSX.Element {
  const [search, setSearch] = useState('');

  const filteredAnnotations = book.annotations.filter(
    (annotation) =>
      annotation.text.toLowerCase().includes(search.toLowerCase()) ||
      annotation.note?.toLowerCase().includes(search.toLowerCase()) ||
      annotation.chapter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex direction="column" gap={20}>
      <TextInput
        label="Search Annotations"
        value={search}
        placeholder="Search by highlight or note..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Flex direction="column" gap={13}>
        {filteredAnnotations.map((annotation) => (
          <Card key={annotation.pos0 + annotation.pos1}>
            <Group gap={13} align="center">
              <Group gap={3}>
                {annotation.color === null ? (
                  <IconBookmark size={14} />
                ) : (
                  <IconAlignJustified size={14} />
                )}
                <Text size="sm">{annotation.chapter}</Text>
              </Group>
              <Group gap={3}>
                <IconHash size={14} />
                <Text size="sm">{annotation.pageno}</Text>
              </Group>
              <Group gap={3}>
                <IconClock size={14} />
                <Text size="sm">
                  {new Date(annotation.datetime_updated || annotation.datetime).toLocaleString()}
                </Text>
              </Group>
            </Group>
            {annotation.color === null ? (
              <Blockquote p="md">Bookmark</Blockquote>
            ) : (
              <Blockquote p="md" color={annotation.color}>
                <Flex justify="space-between" align="flex-start">
                  <Text>{annotation.text}</Text>

                  <ActionIcon variant="light" color="red">
                    <IconTrash size={20} />
                  </ActionIcon>
                </Flex>
              </Blockquote>
            )}
            {annotation.note && (
              <Group ml="sm" align="baseline">
                <Badge>Note: </Badge>
                <Text size="md">{annotation.note}</Text>
              </Group>
            )}
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
