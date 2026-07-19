import type { CollectionConfig } from 'payload'

/** Admin users — sirf aap/team. Public signup nahi hai. */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Sirf logged-in users hi users collection dekh/badal sakte hain
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text' },
    // email + password Payload auth se automatic aate hain
  ],
}
