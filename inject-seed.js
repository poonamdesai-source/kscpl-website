const fs = require('fs');
const path = require('path');

const indexTsPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'index.ts');

const newContent = `
import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('--- STARTING SEEDING PROCESS ---');

    // Home Page
    const homeCount = await strapi.documents('api::home-page.home-page').count();
    if (homeCount === 0) {
      await strapi.documents('api::home-page.home-page').create({
        data: {
          heroTitle: "Building Landmark\\nLegacies",
          heroSubtitle: "",
          aboutTitle: "Construction",
          aboutContent: "Our pioneering spirit is driven by cutting-edge infrastructure, state-of-the-art equipment, and a highly skilled team, shaping iconic structures that stand the test of time.",
          ctaTitle: "Your Questions Deserve More\\nThan Auto-Replies",
          ctaButtonText: "Let's Connect",
          ctaButtonLink: "#contact",
          publishedAt: new Date()
        }
      });
      console.log('Seeded Home Page');
    }

    // About Page
    const aboutCount = await strapi.documents('api::about-page.about-page').count();
    if (aboutCount === 0) {
      await strapi.documents('api::about-page.about-page').create({
        data: {
          bannerTitle: "About Us",
          bannerSubtitle: "We Build Dreams with Passion, Vision, and Sheer Expertise",
          introTitle: "Precision. Passion. Perfection !",
          introContent1: "Crafting Top Largest Construction Projects in India, Kalpana Struct-Con Pvt. Ltd. transforms visions into reality. From awe-inspiring arches and breathtaking skyscrapers to precision-engineered bridges and state-of-the-art sports complexes, we redefine skylines with every project.",
          introContent2: 'Founded in Mumbai in 2003 as "Kalpana Builders" and rebranded as Kalpana Struct-Con Pvt. Ltd. in 2008. We take pride in our robust infrastructure, cutting-edge equipment, and a professional, committed team. As one of the Top Builders and Developers in India, quality remains at the core of our work, monitored at every stage with on-site labs to ensure superior materials. Be it a small housing project or a multi-crore shopping mall, we are here to build your dreams.',
          managementTitle: "Our Founders & Management",
          managementSubtitle: "Steering Success with Dynamic Leadership & Unmatched Excellence",
          chairmanName: "Mr. Chatur K. Thumar",
          chairmanTitle: "Chairman and Managing Director",
          chairmanDescription: "A visionary leader driving excellence, Mr. Thumar's dynamism, expertise, and commitment have propelled the company to deliver Top Largest Construction Projects in India. Under his leadership, Kalpana Struct-Con Pvt. Ltd. has built iconic structures and a solid reputation. He believes in empowering people, fostering innovation, and ensuring quality and timely project completion, placing the company among Top Builders and Developers in India.",
          publishedAt: new Date()
        }
      });
      console.log('Seeded About Page');
    }

    // Contact Page
    const contactCount = await strapi.documents('api::contact-page.contact-page').count();
    if (contactCount === 0) {
      await strapi.documents('api::contact-page.contact-page').create({
        data: {
          connectTitle: "Let's Connect",
          connectSubtitle: "Reach out to bring your dream spaces to life",
          companyName: "Kalpana Struct-Con Pvt. Ltd.",
          addressLine1: "1006-1008, Cyber One, Plot No - 4&6, Sector-",
          addressLine2: "30A, Near Odisha Bhavan, Vashi, Navi Mumbai.",
          pinCode: "400703.",
          email: "info@kscpl.com",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7930834246877!2d72.99617307604473!3d19.0728108520743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1341c2105e1%3A0x673dbb1d8396c21e!2sCyber%20One!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
          inquiryTitle: "Thinking about investing or moving in?",
          inquirySubtitle: "Write us directly - Let's talk & turn that thought into action.",
          publishedAt: new Date()
        }
      });
      console.log('Seeded Contact Page');
    }

    // Architects
    const archCount = await strapi.documents('api::architect.architect').count();
    if (archCount === 0) {
      const architectsList = [
        "Arch. Anil Sule & Associates",
        "Architects Cidco Department",
        "Arch. Hafeez Contractor",
        "M/s Dimension",
        "Arch. Milind Pawar",
        "Arch. Soyuz Talib",
        "Arch. Bhaskar Jadhav, Mumbai",
        "Arch. Bharat Yamsanvar – Team One",
        "The Firm, Navi Mumbai",
        "Arch. Suhash Sankpal, Mumbai",
        "Voyants solutions Pvt. Ltd.",
        "Hiten Sethi Architects",
        "Sandeep Shirke & Associates",
        "Design Group India"
      ];
      for (let i = 0; i < architectsList.length; i++) {
        await strapi.documents('api::architect.architect').create({
          data: {
            Name: architectsList[i],
            DisplayOrder: i + 1,
            Active: true,
            publishedAt: new Date()
          }
        });
      }
      console.log('Seeded Architects');
    }

    // Projects
    const projCount = await strapi.documents('api::project.project').count();
    if (projCount === 0) {
      const projects = [
        { title: "HORIZON", features: "Swimming Pool, Gym, Clubhouse, Multipurpose Hall, Kids Play Area, Ample Parking" },
        { title: "SOLITAIRE", features: "Infinity Pool, Fitness Center, Spa & Sauna, Business Lounge, Zen Garden, Valet Parking" }
      ];
      for (let i = 0; i < projects.length; i++) {
        await strapi.documents('api::project.project').create({
          data: {
            ProjectName: projects[i].title,
            Slug: projects[i].title.toLowerCase(),
            ShortDescription: "Architecture that feels like Art",
            FullDescription: projects[i].features, // saving features as rich text / string
            Location: "",
            ProjectType: "Residential",
            ProjectStatus: "Completed",
            DisplayOrder: i + 1,
            Featured: true,
            publishedAt: new Date()
          }
        });
      }
      console.log('Seeded Projects');
    }

    // Management Members
    const memCount = await strapi.documents('api::management-member.management-member').count();
    if (memCount === 0) {
      const managementTeam = [
        { name: "Mr. Ramesh K. Nakarani", title: "Director", desc: "With over 25 years of expertise in construction and real estate, Mr. Nakarani has been instrumental in executing Top Realty Projects in India. He excels in design development, planning, and project management, always innovating to drive organizational growth." },
        { name: "Mr. Mansukh D. Thumar", title: "Director", desc: "With 25 years of experience in the construction industry, Mr. Mansukh's leadership has been pivotal in executing complex projects successfully. His expertise strengthens the company's position as a Best Realty Company with many large projects in Maharashtra." },
        { name: "Mr. Jagdish Thumar", title: "Chief Executive Officer & Chief Technical...", desc: "A diploma civil engineer, Mr. Jagdish keeps the company ahead of its peers by implementing groundbreaking techniques. He ensures flawless execution and smooth operations across all projects." },
        { name: "Mr. Pathik Thumar", title: "Vice President", desc: "Carrying forward the family legacy, Mr. Thumar leads the Real Estate division with precision and creativity, ensuring every project reflects the company's commitment to excellence in the industry." },
        { name: "Mr. Ajit Thumar", title: "Director Finance", desc: "A fresh commerce graduate, Mr. Thumar manages the company's financial operations with precision, ensuring cost-effectiveness while maintaining the highest standards for clients." },
        { name: "Mr. Harshad Thumar", title: "Director Administration", desc: "A results-driven commerce graduate, Mr. Harshad oversees workforce management and site operations, ensuring every project aligns with the company's vision for growth and quality." },
        { name: "Mr. Mahesh Thumar", title: "Chief Operating Officer (Liaison)", desc: "Joining the business in 1999, Mr. Thumar combines technical knowledge and strategic insight to oversee daily operations. His ability to connect the smallest details to the larger picture ensures smooth execution of Top Realty Projects in India." },
        { name: "Mr. Rajanikant Thumar", title: "Project Director", desc: "Joining the business in 2005, Mr. Rajanikant brings over a decade of experience in supervising industrial, residential, and commercial projects with independent oversight and dedication." },
        { name: "Mr. Arvind Gondalia", title: "General Manager", desc: "Joining the company in 2004, Mr. Gondalia sets world-class standards for material performance. His data-driven approach continues to improve organizational efficiency and outcomes." }
      ];
      for (let i = 0; i < managementTeam.length; i++) {
        await strapi.documents('api::management-member.management-member').create({
          data: {
            Name: managementTeam[i].name,
            Designation: managementTeam[i].title,
            Description: managementTeam[i].desc,
            DisplayOrder: i + 1,
            publishedAt: new Date()
          }
        });
      }
      console.log('Seeded Management Members');
    }

    console.log('--- FINISHED SEEDING PROCESS ---');
  },
};
`;

fs.writeFileSync(indexTsPath, newContent);
console.log('Injected bootstrap seed script.');
