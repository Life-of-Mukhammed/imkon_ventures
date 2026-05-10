import type { CollectionConfig } from 'payload'

export const PortfolioCompanies: CollectionConfig = {
  slug: 'portfolio-companies',
  labels: {
    singular: 'Portfolio Company',
    plural: 'Portfolio Companies',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'stage', 'year', 'featured'],
    listSearchableFields: ['name', 'sector', 'description'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "acme-corp"',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short headline shown in cards and hero rotations',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'One-paragraph summary shown on the company page',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Wide image used when this company is featured on the homepage (fallback if no video)',
      },
    },
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        description: 'Looping video used as background when this company is featured on the homepage hero',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'See more',
      admin: {
        description: 'Bottom-left corner call-to-action label on the hero (e.g. company name or "See how")',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sector',
          type: 'select',
          options: [
            { label: 'Fintech', value: 'fintech' },
            { label: 'AI / ML', value: 'ai' },
            { label: 'SaaS', value: 'saas' },
            { label: 'Marketplace', value: 'marketplace' },
            { label: 'Climate / Energy', value: 'climate' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Defense / Aerospace', value: 'defense' },
            { label: 'Consumer', value: 'consumer' },
            { label: 'Crypto / Web3', value: 'crypto' },
            { label: 'Logistics', value: 'logistics' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'stage',
          type: 'select',
          options: [
            { label: 'Pre-Seed', value: 'pre-seed' },
            { label: 'Seed', value: 'seed' },
            { label: 'Series A', value: 'series-a' },
            { label: 'Series B', value: 'series-b' },
            { label: 'Growth', value: 'growth' },
            { label: 'Public', value: 'public' },
            { label: 'Acquired', value: 'acquired' },
          ],
        },
        {
          name: 'year',
          type: 'number',
          min: 1990,
          max: 2100,
          admin: {
            description: 'Year of first investment',
          },
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (!value) return true
        try {
          new URL(value)
          return true
        } catch {
          return 'Must be a valid URL (https://...)'
        }
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on the homepage hero rotation',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first; ties broken by name',
      },
    },
  ],
}
