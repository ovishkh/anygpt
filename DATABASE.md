model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  role          Role      @default(USER)
  apiKeys       ApiKey[]
  conversations Conversation[]
  settings      UserSettings?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model ApiKey {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  provider  Provider
  key       String   // Encrypted
  enabled   Boolean  @default(true)
  rateLimit Int      @default(1000)
  createdAt DateTime @default(now())
}

model Conversation {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String
  provider  Provider
  model     String
  messages  Message[]
  createdAt DateTime @default(now())
}

model Message {
  id             String   @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role           RoleType
  content        String
  tokens         Int?
  cost           Float?
  createdAt      DateTime @default(now())
}

enum Provider {
  OPENAI
  GEMINI
  ANTHROPIC
}

enum Role {
  ADMIN
  USER
  GUEST
}

enum RoleType {
  SYSTEM
  USER
  ASSISTANT
}