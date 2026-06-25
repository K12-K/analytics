TO ADD DEPENDENCY OR LIBRARY
pnpm --filter @analytics/collector add <DEPENDENCY-NAME>
pnpm --filter @analytics/db remove <DEPENDENCY-NAME>

TO ADD DEPENDENCY OF INNER PACKAGES
pnpm --filter @analytics/<WHERE-TO_INSTALL-DESTINATION> add @analytics/<DEPEDENCY-PACKAGE>@workspace:*
pnpm --filter @analytics/collector add @analytics/db@workspace:*
pnpm remove @analytics/<DEPEDENCY-PACKAGE> --filter @analytics/<WHERE-TO_INSTALL-DESTINATION>
pnpm remove @analytics/db --filter @analytics/collector

TO CONNECT CREATE AND MIGRATE DATABASE 
pnpm --filter @analytics/db generate
pnpm --filter @analytics/db migrate

TO CREATE AND RUN TRACKER SITE
pnpm create vite apps/tracker
pnpm --filter tracker dev