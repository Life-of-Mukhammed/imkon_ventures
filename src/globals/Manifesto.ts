import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Manifesto: GlobalConfig = {
  slug: 'manifesto',
  label: 'Manifesto',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Manifesto',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What we believe',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'richText', editor: lexicalEditor({}) },
      ],
    },
  ],
}
