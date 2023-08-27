import { PrismaClient, Role } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { getProfessionOptions, experienceOptions } from '../src/utils/consts'

const firstNames = ['Jane', 'Alice', 'Sarah', 'Kate', 'Hannah', 'John', 'Peter', 'Jack', 'Sam', 'David']
const lastNames = ['Smith', 'Brown', 'Jackson', 'Clark', 'Taylor', 'Jones', 'Wilson', 'Anderson', 'Williams', 'Evans']
const abouts = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ',
]
const phoneNos = ['+44 3981 26912', '+370 613 78200', '001 6715 1768 8098', '8-572-861-789', '+45 8791 8127 989']
const professions = getProfessionOptions((s) => s).map((p) => p.value)
const experience = experienceOptions.map((e) => e.value)
const monthsFrom = [8, 9]
const monthsTo = [10, 11]
const days: number[] = []

for (let i = 1; i < 29; i++) {
  days.push(i)
}

function getRandomItem(array: any[]) {
  return array[Math.floor(Math.random() * array.length)]
}

function createUsers() {
  const users = []
  for (let i = 0; i < 40; i++) {
    const uuid = uuidv4()
    const firstName = getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)

    users.push({
      data: {
        clerkId: uuid,
        role: Role.CREW,
        firstName,
        lastName,
        about: getRandomItem(abouts),
        email: `${firstName}.${lastName}@${uuid}.com`,
        contactNo: getRandomItem(phoneNos),
        profile: {
          create: {
            profession: getRandomItem(professions),
            experienceYears: Number(getRandomItem(experience)),
            hourlyRate: Math.floor(Math.random() * 51) + 30,
          },
        },
        availability: {
          create: {
            availableFrom: new Date(2023, getRandomItem(monthsFrom), getRandomItem(days)),
            availableTo: new Date(2023, getRandomItem(monthsTo), getRandomItem(days)),
          },
        },
      },
    })
  }
  return users
}

const prisma = new PrismaClient()

async function main() {
  const users = createUsers()
  users.forEach(async (user) => {
    await prisma.user.create(user)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
