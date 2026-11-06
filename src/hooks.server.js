import { redirect } from '@sveltejs/kit';
import { redirects } from './redirects.js';

export async function handle({ event, resolve }) {
  const url = event.url;
  const pathname = url.pathname;

  // Check if the pathname contains uppercase letters
  if (pathname !== pathname.toLowerCase()) {
    // Redirect to lowercase version
    redirect(301, pathname.toLowerCase() + url.search);
  }

  const response = await resolve(event);
  const dest = redirects[pathname];
  if (response.status === 404 && dest) {
    redirect(301, dest + url.search);
  }

  return response;
}
