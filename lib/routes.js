const link = require('next/link');
const router = require('next/router');

const NextRouter = router.default || router;
const NextLink = link.default || link;

const routes = require('next-routes')({
  Router: NextRouter,
  Link: NextLink
});

// name: string, pattern?: string, page?: string
// pattern: string, page: string

module.exports = routes;
