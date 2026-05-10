import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Imkon Ventures',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Funding the founders building what comes next',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              defaultValue: 'Imkon Ventures',
            },
            {
              name: 'heroHeadline',
              type: 'textarea',
              defaultValue:
                'We back founders building the impossible.',
            },
            {
              name: 'heroCtaLabel',
              type: 'text',
              defaultValue: 'Read the manifesto',
            },
            {
              name: 'heroCtaHref',
              type: 'text',
              defaultValue: '/manifesto',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerTagline',
              type: 'text',
              defaultValue: 'Imkon Ventures',
            },
            {
              name: 'footerDisclaimer',
              type: 'textarea',
              defaultValue:
                'Past performance is not indicative of future results. Imkon Ventures is a registered trademark.',
            },
            {
              name: 'footerLinks',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'text', defaultValue: 'hello@imkon.capital' },
            { name: 'twitter', type: 'text' },
            { name: 'linkedin', type: 'text' },
          ],
        },
      ],
    },
  ],
}
