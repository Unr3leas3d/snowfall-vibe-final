# Snowfall - Snow Contract Management System

## Project Overview

Snowfall is an automated snow contract management application that monitors snowfall predictions via the Environment Canada API and sends timely notifications to snow clearing contractors based on configurable thresholds.

## Core Features

### Phase I: Landing Page & Authentication
- [ ] Snow-themed landing page with email signup
- [ ] User authentication system
- [ ] Email list management for launch notifications

### Phase II: Dashboard & Contract Management
- [ ] User dashboard
- [ ] Contract creation and management
- [ ] Automated notification system
- [ ] Weather API integration

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
  - Server-side rendering for SEO
  - Built-in API routes
  - Optimal performance
  - Minimal bundle size

### Backend & Database
- **Platform**: Supabase
  - PostgreSQL database (free tier: 500MB)
  - Built-in authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions for serverless logic
  - **Cost**: Free tier sufficient for MVP, scales to $25/month

### Notifications

#### Email Notifications
- **Service**: Resend
  - 3,000 emails/month free
  - 100 emails/day free
  - Simple API
  - **Cost**: Free tier, then $20/month for 50k emails

#### SMS Notifications
- **Service**: Twilio
  - Pay-as-you-go pricing
  - $0.0079/SMS (Canada)
  - No monthly fees on pay-as-you-go
  - **Cost**: ~$0.01 per notification
  - **Alternative**: AWS SNS ($0.00645/SMS, slightly cheaper)

### Weather API
- **Service**: Environment Canada API
  - **Cost**: FREE (government API)
  - No rate limits for reasonable use
  - Reliable Canadian weather data

### Hosting
- **Platform**: Vercel
  - Free tier for Next.js apps
  - Automatic deployments
  - Edge network
  - **Cost**: Free for hobby projects

### Scheduled Tasks
- **Service**: Supabase Edge Functions + pg_cron
  - Built into Supabase
  - No additional cost
  - **Alternative**: Vercel Cron Jobs (free)

## Cost Analysis

### Monthly Operating Costs (Estimated)

| Service | Free Tier | Paid Tier | Notes |
|---------|-----------|-----------|-------|
| Supabase | 500MB DB, 2GB bandwidth | $25/month (8GB DB) | Start free |
| Vercel | Hobby tier | $20/month (Pro) | Start free |
| Resend | 3,000 emails/month | $20/month (50k emails) | Start free |
| Twilio SMS | Pay-per-use | ~$0.01/SMS | Only pay for usage |
| Environment Canada API | FREE | FREE | Always free |

**Initial Cost**: $0/month (using free tiers)
**Scaling Cost**: ~$45-65/month + SMS usage

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Contracts Table
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_name TEXT NOT NULL,
  contractor_email TEXT NOT NULL,
  contractor_phone TEXT,
  location_postal_code TEXT NOT NULL,
  snowfall_threshold_cm DECIMAL NOT NULL,
  notification_window_hours INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Email Signups Table (Pre-launch)
```sql
CREATE TABLE email_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  signed_up_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Notifications Log Table
```sql
CREATE TABLE notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL, -- 'email' or 'sms'
  recipient TEXT NOT NULL,
  snowfall_amount_cm DECIMAL NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL -- 'sent', 'failed', 'pending'
);
```

## Architecture Decisions

### Why Supabase?
1. **All-in-one solution**: Auth + Database + API + Edge Functions
2. **PostgreSQL**: Robust, scalable, supports complex queries
3. **Row Level Security**: Built-in security at database level
4. **Real-time**: Can add live updates later
5. **Cost-effective**: Generous free tier, predictable pricing

### Why Next.js?
1. **SEO-friendly**: Server-side rendering for landing page
2. **API Routes**: Backend logic without separate server
3. **Performance**: Automatic code splitting, image optimization
4. **Developer Experience**: Fast refresh, TypeScript support
5. **Vercel Integration**: Seamless deployment

### Why Resend for Email?
1. **Developer-friendly**: Simple API, great DX
2. **Generous free tier**: 3,000 emails/month
3. **Reliability**: Built on AWS SES
4. **Modern**: Better than SendGrid/Mailgun for new projects

### Why Twilio for SMS?
1. **Industry standard**: Reliable delivery
2. **Pay-as-you-go**: No monthly fees
3. **Canadian numbers**: Good coverage
4. **Fallback**: Can use AWS SNS if cost is critical

## Project Structure

```
snowfall/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   └── contracts/
│   ├── api/
│   │   ├── contracts/
│   │   ├── notifications/
│   │   └── weather/
│   └── page.tsx (landing page)
├── components/
│   ├── ui/ (reusable components)
│   ├── landing/
│   └── dashboard/
├── lib/
│   ├── supabase/
│   ├── notifications/
│   └── weather/
├── supabase/
│   ├── migrations/
│   └── functions/
└── public/
```

## Development Phases

### Phase I: Landing Page & Authentication (Week 1)
1. Set up Next.js project with TypeScript
2. Configure Supabase project
3. Design snow-themed landing page
4. Implement email signup form
5. Set up Supabase Auth
6. Create login/signup pages
7. Test authentication flow

**Deliverables**:
- Live landing page
- Working authentication
- Email signup database

### Phase II: Dashboard & Contract Management (Week 2-3)
1. Create dashboard layout
2. Build contract creation form
3. Implement contract CRUD operations
4. Integrate Environment Canada API
5. Build notification logic
6. Set up Resend for emails
7. Set up Twilio for SMS
8. Create scheduled job for weather checks
9. Test notification system

**Deliverables**:
- Functional dashboard
- Contract management system
- Automated notifications
- Weather monitoring

## Security Considerations

1. **Row Level Security (RLS)**: Users can only access their own contracts
2. **API Key Management**: Environment variables for all secrets
3. **Rate Limiting**: Prevent API abuse
4. **Input Validation**: Sanitize all user inputs
5. **HTTPS Only**: Enforce secure connections

## Monitoring & Maintenance

1. **Error Tracking**: Vercel Analytics (free)
2. **Uptime Monitoring**: UptimeRobot (free tier)
3. **Database Backups**: Supabase automatic backups
4. **Logs**: Supabase logs + Vercel logs

## Scalability Plan

### 100 Users
- Free tiers sufficient
- Cost: $0/month

### 1,000 Users
- Supabase paid tier
- Resend paid tier
- Cost: ~$45/month + SMS

### 10,000 Users
- Upgrade Vercel to Pro
- Optimize database queries
- Consider caching layer
- Cost: ~$100-150/month + SMS

## Next Steps

1. Initialize Next.js project
2. Set up Supabase project
3. Create landing page
4. Implement authentication
5. Build dashboard
6. Integrate APIs
7. Deploy to Vercel

## Command Utilities

- `./commands/setup.sh` - Initialize project and dependencies
- `./commands/dev.sh` - Start development server
- `./commands/audit.sh` - Run security and quality checks
- `./commands/build.sh` - Build for production with audit
- `./commands/db.sh` - Supabase database management

---

**Last Updated**: 2026-02-17
**Version**: 1.0.0
