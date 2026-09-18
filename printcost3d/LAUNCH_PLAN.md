# PrintCost 3D — Launch Plan

Last updated: 2026-09-18

## Current status

- [x] Public beta app connected to Supabase
- [x] Email/password authentication and persistent sessions
- [x] Free quota: 5 saved quotes/month
- [x] Real cost calculator with material, machine, electricity, labor and failure reserve
- [x] Batch pricing and per-unit price
- [x] Sales commission and fixed fee support
- [x] Multiple printers and materials
- [x] Quote history, search, duplicate and client-safe sharing
- [x] Monthly quote/revenue/profit-potential dashboard
- [x] Public marketing landing page
- [x] In-app beta feedback
- [ ] Custom domain
- [ ] Independent Vercel project/domain for PrintCost 3D
- [ ] Mercado Pago test subscription end-to-end
- [ ] Mercado Pago production credentials
- [ ] Pro entitlement automation via webhook
- [ ] Privacy / Terms pages with public business contact
- [ ] Analytics / conversion tracking
- [ ] Invite first 10–20 external beta users
- [ ] Collect 7–14 days of usage feedback
- [ ] Public paid launch

## Domain shortlist

Preferred:
1. printcost3d.com
2. printcost3d.app
3. printcost3d.uy

Fallback brand candidates to check if preferred domains are unavailable:
- cotiza3d.com
- costea3d.com
- printquote3d.com
- precio3d.com

Do not purchase automatically. Confirm availability, annual purchase price and renewal price first.

## Beta success criteria

Before turning on paid Pro, aim for:
- 10–20 external users registered
- At least 5 users return and create a second quote
- At least 3 users create 3+ quotes
- At least 1–2 users reach or approach the Free quota
- No critical auth, quote-save or pricing calculation bug
- Feedback reveals at least one repeatable workflow users value

## Pro v1

Initial price hypothesis: 199 UYU/month.

Free:
- 5 saved quotes/month
- Multiple printers/materials
- Batch pricing
- History
- Client-safe share

Pro v1:
- Unlimited saved quotes
- Saved clients
- PDF quote with logo/branding
- Advanced monthly statistics
- Priority feature additions based on beta feedback

## Mercado Pago production checklist

Server-only secrets:
- MERCADOPAGO_ACCESS_TOKEN
- MERCADOPAGO_WEBHOOK_SECRET
- SUPABASE_SECRET_KEY

Flow:
1. User clicks Upgrade to Pro.
2. Server creates Mercado Pago recurring subscription.
3. Mercado Pago redirects user through authorization.
4. Signed webhook reaches server.
5. Server verifies webhook signature and fetches authoritative subscription state.
6. Supabase profile is updated to pro/free from server only.
7. Cancellation and failed/terminated subscription states downgrade appropriately.

Never expose private tokens in frontend code or commit them to Git.

## Launch sequence

### Phase 1 — Beta-ready
- Finish custom domain and independent product identity.
- Add public Privacy/Terms pages.
- Test onboarding, password recovery and mobile experience.

### Phase 2 — Private/public beta
- Invite 10–20 makers.
- Collect in-app feedback.
- Track activation: signup → first quote → second session → quota usage.
- Fix friction before adding more features.

### Phase 3 — Payments
- Configure Mercado Pago sandbox/test credentials.
- Test subscribe, webhook, cancellation and downgrade.
- Add billing screen/status.
- Switch to production credentials only after tests pass.

### Phase 4 — Paid launch
- Confirm hosting plan permits commercial use.
- Enable Pro checkout.
- Publish launch content demonstrating a real quote workflow.
- Review conversion and retention weekly.

## Commercial infrastructure note

Before accepting paid subscriptions, verify the production hosting plan and terms for commercial usage. Do not assume a free hosting tier is suitable for a paid SaaS.
