import type { CollectionConfig } from 'payload'

/** Admin users — sirf aap/team. Public signup nahi hai. */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // Host-only cookies (no Domain=) so toolspy.net vs dev.toolspy.net dono sahi chal sakte hain.
  // secure: HTTPS prod; Lax: same-site admin POSTs (preferences / logout) ok.
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
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
