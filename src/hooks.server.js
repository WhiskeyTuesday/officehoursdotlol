import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
  const url = event.url;
  const pathname = url.pathname;

  // Check if the pathname contains uppercase letters
  if (pathname !== pathname.toLowerCase()) {
    // Redirect to lowercase version
    throw redirect(301, pathname.toLowerCase() + url.search);
  }

  return resolve(event);
}
