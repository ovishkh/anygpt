# **AnyGPT - Multi-API Intelligent Chat Platform**

## **🏗️ System Architecture Overview**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  Next.js 14+ (App Router) │  React 18+ │  TypeScript │ TailwindCSS     │
├─────────────────────────────────────────────────────────────────────────┤
│  Components:                                                             │
│  ├── Chat Interface                                                      │
│  ├── Provider Dashboard                                                  │
│  ├── Real-time Analytics                                                 │
│  ├── Admin Panel                                                         │
│  └── Theme System                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
┌─────────────────────────────────────────────────────────────────────────┐
│                            EDGE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  Vercel Edge Functions │  Middleware │  Rate Limiting │  Caching        │
├─────────────────────────────────────────────────────────────────────────┤
│  Routes:                                                                │
│  ├── /api/chat/* (Streaming)                                            │
│  ├── /api/admin/* (Protected)                                           │
│  ├── /api/analytics/*                                                   │
│  └── /api/webhooks/*                                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
┌─────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│  OpenRouter Integration │  Load Balancer │  Fallback System             │
├─────────────────────────────────────────────────────────────────────────┤
│  Features:                                                               │
│  ├── Intelligent API routing                                             │
│  ├── Cost optimization                                                   │
│  ├── Automatic failover                                                  │
│  └── Model compatibility layer                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
┌─────────────────────────────────────────────────────────────────────────┐
│                       PROVIDER ABSTRACTION LAYER                        │
├─────────────────────────────────────────────────────────────────────────┤
│  OpenAI │  Anthropic │  Google Gemini │  OpenRouter │  Custom LLMs      │
├─────────────────────────────────────────────────────────────────────────┤
│  Unified Interface:                                                      │
│  ├── Standardized message format                                         │
│  ├── Token counting                                                      │
│  ├── Cost calculation                                                    │
│  └── Error handling                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  PostgreSQL/Neon │  Redis │  Vector DB │  Blob Storage                  │
├─────────────────────────────────────────────────────────────────────────┤
│  Models:                                                                 │
│  ├── User & Authentication                                              │
│  ├── Conversations & Messages                                           │
│  ├── API Keys (Encrypted)                                               │
│  ├── Usage Analytics                                                    │
│  └── Vector Embeddings                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

## **📁 Complete Project Structure**

```
anygpt/
├── 📦 package.json
├── 🐳 docker-compose.yml
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── layout.tsx
│   │   ├── 📁 (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── 📁 chat/
│   │   │   │   ├── [conversationId]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   └── new/
│   │   │   ├── 📁 providers/
│   │   │   │   ├── configure/
│   │   │   │   └── manage/
│   │   │   ├── 📁 analytics/
│   │   │   │   ├── usage/
│   │   │   │   ├── costs/
│   │   │   │   └── performance/
│   │   │   └── 📁 settings/
│   │   │       ├── api-keys/
│   │   │       ├── preferences/
│   │   │       └── billing/
│   │   ├── 📁 api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   └── callback/
│   │   │   ├── chat/
│   │   │   │   ├── route.ts (Main gateway)
│   │   │   │   ├── 📁 providers/
│   │   │   │   │   ├── openai/
│   │   │   │   │   ├── anthropic/
│   │   │   │   │   ├── gemini/
│   │   │   │   │   └── openrouter/
│   │   │   │   ├── 📁 stream/
│   │   │   │   └── 📁 batch/
│   │   │   ├── admin/
│   │   │   │   ├── providers/
│   │   │   │   ├── users/
│   │   │   │   └── system/
│   │   │   ├── analytics/
│   │   │   │   ├── realtime/
│   │   │   │   └── historical/
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   └── monitoring/
│   │   │   └── edge/
│   │   │       ├── rate-limit/
│   │   │       └── cache/
│   │   ├── 📁 admin/ (Protected)
│   │   │   ├── dashboard/
│   │   │   ├── provider-management/
│   │   │   └── user-management/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── middleware.ts
│   ├── 📁 components/
│   │   ├── 📁 ui/ (shadcn/ui)
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dialog/
│   │   │   └── ...
│   │   ├── 📁 chat/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ProviderBadge.tsx
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── TokenCounter.tsx
│   │   │   └── StreamDisplay.tsx
│   │   ├── 📁 providers/
│   │   │   ├── ProviderCard.tsx
│   │   │   ├── APIToggle.tsx
│   │   │   ├── ModelGrid.tsx
│   │   │   ├── OpenRouterPanel.tsx
│   │   │   └── ProviderThemes.tsx
│   │   ├── 📁 dashboard/
│   │   │   ├── StatsOverview.tsx
│   │   │   ├── UsageChart.tsx
│   │   │   ├── CostCalculator.tsx
│   │   │   └── RealTimeMetrics.tsx
│   │   ├── 📁 forms/
│   │   │   ├── APIKeyForm.tsx
│   │   │   ├── ProviderConfigForm.tsx
│   │   │   └── SettingsForm.tsx
│   │   └── 📁 layout/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── ThemeToggle.tsx
│   ├── 📁 lib/
│   │   ├── 📁 providers/
│   │   │   ├── index.ts (Factory)
│   │   │   ├── base/
│   │   │   │   ├── BaseProvider.ts
│   │   │   │   └── types.ts
│   │   │   ├── openai/
│   │   │   │   ├── client.ts
│   │   │   │   ├── models.ts
│   │   │   │   └── adapter.ts
│   │   │   ├── anthropic/
│   │   │   │   ├── client.ts
│   │   │   │   └── adapter.ts
│   │   │   ├── gemini/
│   │   │   │   ├── client.ts
│   │   │   │   └── adapter.ts
│   │   │   ├── openrouter/
│   │   │   │   ├── client.ts
│   │   │   │   ├── models.ts
│   │   │   │   └── router.ts
│   │   │   └── custom/
│   │   │       └── provider-builder.ts
│   │   ├── 📁 api/
│   │   │   ├── gateway/
│   │   │   │   ├── router.ts
│   │   │   │   ├── load-balancer.ts
│   │   │   │   └── fallback.ts
│   │   │   └── streaming/
│   │   │       ├── sse.ts
│   │   │       └── web-socket.ts
│   │   ├── 📁 utils/
│   │   │   ├── encryption.ts (AES-256)
│   │   │   ├── token-counter.ts
│   │   │   ├── cost-calculator.ts
│   │   │   ├── rate-limiter.ts
│   │   │   ├── logger.ts
│   │   │   └── validation.ts
│   │   ├── 📁 db/
│   │   │   ├── schema/
│   │   │   │   ├── index.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── conversation.ts
│   │   │   │   ├── provider.ts
│   │   │   │   └── analytics.ts
│   │   │   ├── queries/
│   │   │   └── migrations/
│   │   ├── 📁 auth/
│   │   │   ├── config.ts
│   │   │   ├── middleware.ts
│   │   │   └── permissions.ts
│   │   └── 📁 types/
│   │       ├── global.d.ts
│   │       ├── chat.ts
│   │       ├── providers.ts
│   │       └── api.ts
│   ├── 📁 hooks/
│   │   ├── useChat.ts
│   │   ├── useProviders.ts
│   │   ├── useAnalytics.ts
│   │   ├── useWebSocket.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── 📁 store/
│   │   ├── chat.store.ts
│   │   ├── provider.store.ts
│   │   ├── user.store.ts
│   │   ├── ui.store.ts
│   │   └── analytics.store.ts
│   ├── 📁 styles/
│   │   ├── themes/
│   │   │   ├── openai.css
│   │   │   ├── anthropic.css
│   │   │   ├── gemini.css
│   │   │   └── openrouter.css
│   │   └── animations.css
│   └── 📁 public/
│       ├── themes/
│       ├── icons/
│       └── fonts/
├── 📁 prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── 📁 tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── 📁 scripts/
│   ├── deploy/
│   ├── backup/
│   └── monitoring/
├── 📁 config/
│   ├── env.ts
│   ├── providers.json
│   └── rate-limits.json
├── .env.example
├── .env.local
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── README.md
```

## **🔌 OpenRouter Integration Architecture**

```
OpenRouter Integration Flow:
1. User Request → AnyGPT API Gateway
2. Gateway analyzes request:
   ├── Required capabilities
   ├── Cost constraints
   ├── Performance needs
   └── User preferences
3. Decision Engine:
   ├── Use direct provider (if enabled & available)
   ├── Use OpenRouter (if better match/fallback)
   └── Load balance between options
4. OpenRouter Router:
   ├── Model selection (100+ models)
   ├── Automatic retries
   ├── Cost optimization
   └── Unified response format
```

## **🗄️ Database Schema Core Tables**

```prisma
// Core Models
model User {
  id            String        @id @default(cuid())
  email         String        @unique
  name          String?
  avatar        String?
  role          UserRole      @default(USER)
  tier          UserTier      @default(FREE)
  
  // Relationships
  apiKeys       ApiKey[]
  conversations Conversation[]
  settings      UserSettings?
  usage         UsageStats[]
  
  // Timestamps
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Provider {
  id            String        @id @default(cuid())
  name          ProviderType  // openai, anthropic, gemini, openrouter
  displayName   String
  enabled       Boolean       @default(true)
  config        Json?         // Provider-specific config
  
  // Models available for this provider
  models        Model[]
  
  // Usage tracking
  totalRequests Int           @default(0)
  totalTokens   BigInt        @default(0)
  totalCost     Float         @default(0)
  
  // Rate limiting
  rateLimit     Int           @default(1000)
  rateWindow    Int           @default(3600) // seconds
}

model ApiKey {
  id            String        @id @default(cuid())
  userId        String
  providerId    String
  name          String
  key           String        @encrypted
  enabled       Boolean       @default(true)
  lastUsed      DateTime?
  usageCount    Int           @default(0)
  
  // Relationships
  user          User          @relation(fields: [userId], references: [id])
  provider      Provider      @relation(fields: [providerId], references: [id])
  
  createdAt     DateTime      @default(now())
}

model Conversation {
  id            String        @id @default(cuid())
  userId        String
  title         String        @default("New Conversation")
  providerId    String
  model         String
  tokensUsed    Int           @default(0)
  estimatedCost Float         @default(0)
  
  // Messages (1:N)
  messages      Message[]
  
  // Metadata
  tags          String[]      @default([])
  archived      Boolean       @default(false)
  starred       Boolean       @default(false)
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  role           MessageRole  // system, user, assistant
  content        String
  tokens         Int
  model          String?
  provider       ProviderType?
  cost           Float?
  
  // Metadata
  processingTime Int?         // milliseconds
  error          String?
  
  createdAt      DateTime     @default(now())
}

// OpenRouter Specific
model OpenRouterRequest {
  id            String       @id @default(cuid())
  conversationId String
  model         String
  route         String       // which model was actually used
  cost          Float
  latency       Int
  success       Boolean
  fallbackUsed  Boolean      @default(false)
  
  createdAt     DateTime     @default(now())
}

// Analytics
model UsageAnalytics {
  id            String       @id @default(cuid())
  userId        String
  date          DateTime
  provider      ProviderType
  model         String
  requests      Int
  tokens        Int
  cost          Float
  
  @@index([userId, date])
}
```

## **🔄 API Gateway Flow**

```
Request Flow:
1. Request → API Gateway (/api/chat)
2. Authentication & Authorization
3. Rate Limiting Check
4. Request Analysis:
   ├── Extract provider preference
   ├── Check provider availability
   ├── Validate model compatibility
   └── Apply user quotas
5. Provider Selection Logic:
   ├── If specific provider requested → use it
   ├── If OpenRouter preferred → route through OpenRouter
   ├── If fallback needed → use OpenRouter as backup
   └── If load balancing → distribute requests
6. Request Processing:
   ├── Format conversion
   ├── Token counting
   ├── Cost estimation
   └── Stream handling
7. Response:
   ├── Standardized format
   ├── Analytics logging
   ├── Real-time updates
   └── Error handling
```

## **🔧 Provider Configuration System**

```typescript
// Provider Configuration Interface
interface ProviderConfig {
  id: 'openai' | 'anthropic' | 'gemini' | 'openrouter' | 'custom';
  name: string;
  enabled: boolean;
  apiKey?: string; // Encrypted
  baseURL?: string;
  models: {
    id: string;
    name: string;
    enabled: boolean;
    capabilities: string[]; // ['chat', 'vision', 'function-calling']
    contextWindow: number;
    maxTokens: number;
    cost: {
      input: number; // per 1K tokens
      output: number; // per 1K tokens
    };
  }[];
  rateLimit: {
    requests: number;
    tokens: number;
    window: number; // seconds
  };
  features: {
    streaming: boolean;
    vision: boolean;
    functionCalling: boolean;
    jsonMode: boolean;
  };
  ui: {
    theme: string;
    icon: string;
    color: string;
  };
}

// OpenRouter Specific Config
interface OpenRouterConfig extends ProviderConfig {
  routing: {
    strategy: 'cost' | 'performance' | 'quality';
    fallbackProviders: string[];
    costLimit: number;
    timeout: number;
  };
  models: Array<{
    id: string; // OpenRouter model ID
    provider: string; // Original provider
    name: string;
    // ... other model config
  }>;
}
```

## **🎨 Theming System Architecture**

```
Theming Layers:
1. Base Theme (Tailwind)
2. Provider Themes:
   ├── OpenAI: Green gradient, clean
   ├── Anthropic: Purple gradient, elegant
   ├── Gemini: Blue gradient, modern
   └── OpenRouter: Orange gradient, dynamic
3. User Preferences:
   ├── Dark/Light mode
   ├── Compact/Comfortable
   └── Custom colors
4. Dynamic Elements:
   ├── Message bubbles
   ├── Loading states
   ├── Buttons & inputs
   └── Status indicators
```

## **📊 Analytics & Monitoring**

```
Monitoring Stack:
1. Real-time Metrics:
   ├── Request rate
   ├── Token usage
   ├── Response times
   ├── Error rates
   └── Cost tracking

2. Provider Health:
   ├── Uptime monitoring
   ├── Latency tracking
   ├── Success rates
   └── Cost efficiency

3. User Analytics:
   ├── Usage patterns
   ├── Model preferences
   ├── Feature usage
   └── Retention metrics

4. Business Metrics:
   ├── Cost per user
   ├── Provider costs
   ├── ROI calculation
   └── Growth tracking
```

## **🔐 Security Architecture**

```
Security Layers:
1. Encryption:
   ├── API Keys (AES-256)
   ├── Database fields
   └── Communication

2. Authentication:
   ├── NextAuth.js
   ├── OAuth providers
   ├── API key authentication
   └── Session management

3. Authorization:
   ├── Role-based access
   ├── Provider permissions
   ├── Rate limiting
   └── Request validation

4. Monitoring:
   ├── Audit logs
   ├── Suspicious activity
   ├── API abuse detection
   └── Compliance tracking
```

## **🚀 Deployment Architecture**

```
Multi-Environment Setup:
1. Development:
   ├── Local Docker Compose
   ├── Hot reload
   └── Mock providers

2. Staging:
   ├── Vercel Preview
   ├── Test database
   └── Limited API access

3. Production:
   ├── Vercel Production
   ├── PostgreSQL (Neon)
   ├── Redis (Upstash)
   ├── Object storage
   └── CDN for static assets

4. Backup:
   ├── Automated backups
   ├── Point-in-time recovery
   └── Disaster recovery plan
```

## **📈 Scaling Strategy**

```
Horizontal Scaling:
1. Stateless API servers
2. Database connection pooling
3. Redis cache for sessions
4. CDN for static assets
5. Queue system for async tasks

Vertical Scaling:
1. Database optimization
2. Query optimization
3. Caching strategy
4. Asset optimization

Cost Optimization:
1. Provider cost comparison
2. Token usage optimization
3. Caching responses
4. Batch processing
```

This architecture provides a **production-ready**, **scalable**, and **maintainable** foundation for AnyGPT with complete OpenRouter integration and enterprise-grade features.