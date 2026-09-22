import ContactClient from "./ContactClient";

async function getContactPageData() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/contact-page?populate=*`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function ContactPage() {
  const contactData = await getContactPageData();
  return <ContactClient strapiData={contactData} />;
}
