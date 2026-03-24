export type TeamRole = 'Founder' | 'Member'

export interface TeamMember {
  name: string
  role: TeamRole
  specialization: string
  college: string
  image: string
}

export const teamData: TeamMember[] = [
  {
    name: 'Founder One',
    role: 'Founder',
    specialization: '',
    college: '',
    image: '',
  },
  {
    name: 'Founder Two',
    role: 'Founder',
    specialization: '',
    college: '',
    image: '',
  },
  {
    name: 'Member 1',
    role: 'Member',
    specialization: '',
    college: '',
    image: '',
  },
  {
    name: 'Member 2',
    role: 'Member',
    specialization: '',
    college: '',
    image: '',
  },
  {
    name: 'Member 3',
    role: 'Member',
    specialization: '',
    college: '',
    image: '',
  },
  {
    name: 'Member 4',
    role: 'Member',
    specialization: '',
    college: '',
    image: '',
  },
]
