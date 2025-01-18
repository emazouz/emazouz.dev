export const sections = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Services", link: "/services" },
    { id: 3, name: "Projects", link: "/projects" },
    { id: 4, name: "Blogs", link: "/blogs" },
    { id: 5, name: "Gallery", link: "/gallery" },
    { id: 6, name: "Contact", link: "/contact" },
  ];
  export const recentWorks = [
    { id: 1, name: "All" },
    { id: 2, name: "Website" },
    { id: 3, name: "Css Design" },
    { id: 4, name: "Apps" },
    { id: 5, name: "Digital" },
  ];
  export const companies = [
    {
      id: 1,
      name: "cloudinary",
      img: "/svg/cloud.svg",
      nameImg: "/svg/cloudName.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/svg/app.svg",
      nameImg: "/svg/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/svg/host.svg",
      nameImg: "/svg/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/svg/s.svg",
      nameImg: "/svg/streamName.svg",
    },
    {
      id: 5,
      name: "docker",
      img: "/svg/dock.svg",
      nameImg: "/svg/dockerName.svg",
    },
  ];
  export const category = [
    { id: 1, name: "All Posts" },
    { id: 2, name: "Trending Blogs" },
    { id: 3, name: "Programming Tips" },
    { id: 4, name: "Top Tools" },
  ];
  export const plans = [
    {
      title: "Life Plan",
      price: 49,
      quality: "⭐⭐⭐",
      desc: "Get started with the lowest cost and the greatest value! The Life Plan is the perfect choice for individuals looking for a solid foundation for their startup. Get essential features that efficiently meet your needs and give you a strong start",
      color: "green",
      features: [
        "Powerful admin panel",
        "One Native Android app",
        "✘ Multi-language support", // يمكن تعديلها لتكون ميزة أو خدمة أخرى
      ],
    },
    {
      title: "Premium Plan",
      price: 69,
      color: "purple",
      quality: "⭐⭐⭐⭐",
      desc: "Take your business to new levels with the Premium Plan! We offer you the perfect combination of advanced tools and enhanced support, enabling you to manage your business with confidence and professionalism.",
      features: [
        "Powerful admin panel",
        "One Native Android app",
        "✔ Multi-language support", // تم تغيير القيمة لتصبح خدمة مدعومة
        "✔ Priority support", // إضافة ميزة جديدة
      ],
    },
    {
      title: "Pro Plan",
      price: 99,
      color: "blue",
      quality: "⭐⭐⭐⭐⭐",
      desc: "Enjoy maximum flexibility and excellence with the Pro Plan! Designed specifically for professionals and large companies, it combines the most powerful features and advanced tools to achieve unlimited success.",
      // تغيير اللون لتمييزه عن الخطة الأخرى
      features: [
        "Powerful admin panel",
        "One Native Android app",
        "✔ Multi-language support", // تم تغيير القيمة لتكون مدعومة
        "✔ Priority support",
        "✔ Customizable themes", // ميزة إضافية
      ],
    },
  ];
  export const ServicesData = [
    {
      id: 1,
      title: "Web Development",
      thumbnail: "svg/exp1.svg",
      services: [
        {
          id: 1,
          name: "Performance & Load Time Optimization",
          description:
            "Techniques to enhance page load speed and user experience, reducing bounce rates and increasing visitor satisfaction.",
        },
        {
          id: 2,
          name: "Reusable Components",
          description:
            "Creating reusable code components that save time and effort while improving code organization.",
        },
        {
          id: 3,
          name: "Responsive Design",
          description:
            "Designing websites that adapt to all devices, ensuring a smooth user experience on mobile phones, tablets, and desktops.",
        },
        {
          id: 4,
          name: "Quality Assurance And Testing",
          description:
            "Conducting thorough testing to ensure the website operates correctly and is free from bugs, thereby improving trust in the final product.",
        },
        {
          id: 5,
          name: "Ongoing Updates, Maintenance, And Bug Fixes",
          description:
            "Providing regular maintenance services that include security updates, bug fixes, and new feature additions to ensure the website's longevity.",
        },
      ],
      description:
        "I offer professional web development services focused on performance, responsiveness, and clean code. With reusable components and optimized load times, I ensure your website runs efficiently on all devices.",
    },
  
    // ///////////////////
    {
      id: 2,
      title: "Digital Marketing (SEO)",
      thumbnail: "svg/exp2.svg",
      services: [
        {
          id: 1,
          name: "Marketing Strategy",
          description:
            "Developing effective marketing strategies that enhance brand presence in the market and increase customer engagement.",
        },
        {
          id: 2,
          name: "Customer Research",
          description:
            "Conducting thorough research to understand customer behaviors and needs, guiding marketing efforts more effectively.",
        },
        {
          id: 3,
          name: "Product Monetization",
          description:
            "Implementing innovative strategies to optimize revenue from products and services.",
        },
      ],
      description:
        "I help businesses grow by implementing proven SEO strategies to boost online visibility. From customer research to monetization, I create digital marketing plans that drive traffic to your website.",
    },
    {
      id: 3,
      title: "UI/UX Product Design",
      thumbnail: "svg/exp4.svg",
      services: [
        {
          id: 1,
          name: "Reusable Components",
          description:
            "Designing user interface components that can be reused across different interfaces, enhancing efficiency.",
        },
        {
          id: 2,
          name: "Responsive Design",
          description:
            "Creating designs that adapt to various devices and screen sizes, ensuring an optimal user experience.",
        },
        {
          id: 3,
          name: "Quality Assurance And Testing",
          description:
            "Testing designs to ensure they meet user expectations and provide a comfortable experience.",
        },
        {
          id: 4,
          name: "UI/UX Design",
          description:
            "Crafting visually appealing and user-friendly interfaces that enhance user interaction and satisfaction.",
        },
      ],
      description:
        "Creating intuitive and visually appealing designs that enhance user experience is my specialty. I focus on responsive designs and reusable components to ensure your website or application stands out.",
    },
    {
      id: 4,
      title: "Mobile Development",
      thumbnail: "svg/exp3.svg",
      services: [
        {
          id: 1,
          name: "UI/UX Design",
          description:
            "Designing user interfaces that are easy to navigate, making applications more engaging and effective.",
        },
        {
          id: 2,
          name: "Prototyping And Wireframing",
          description:
            "Creating prototypes to visualize the app before development, facilitating user experience planning.",
        },
        {
          id: 3,
          name: "Coding And Programming",
          description:
            "Writing robust code to ensure applications perform smoothly and efficiently.",
        },
        {
          id: 4,
          name: "Quality Assurance (QA) Testing",
          description:
            "Conducting thorough testing to ensure the app functions correctly and is free of bugs.",
        },
        {
          id: 5,
          name: "App Deployment",
          description:
            "Publishing the app to app stores to ensure it reaches a wide audience.",
        },
      ],
      description:
        "I develop high-quality mobile applications tailored to your needs. From design to deployment, I ensure your app is functional and user-friendly.",
    },
    {
      id: 5,
      title: "Backend Development",
      thumbnail: "svg/exp4.svg",
      services: [
        {
          id: 1,
          name: "Building REST APIs with Node.js & Express",
          description:
            "Creating APIs that allow efficient communication between the client and server.",
        },
        {
          id: 2,
          name: "Database Management Using MongoDB",
          description:
            "Effectively managing data using MongoDB to ensure secure data storage.",
        },
        {
          id: 3,
          name: "Backend and Frontend Integration",
          description:
            "Ensuring seamless communication between the frontend and backend of the application.",
        },
        {
          id: 4,
          name: "Ensuring Security, Scalability, and High Performance",
          description:
            "Implementing best practices to ensure the system is secure and performs optimally.",
        },
      ],
      description:
        "I provide reliable and secure backend development services, focusing on building REST APIs using Node.js and MongoDB for high performance.",
    },
    {
      id: 6,
      title: "Website Maintenance",
      thumbnail: "svg/exp1.svg",
      services: [
        {
          id: 1,
          name: "Regular Updates And Bug Fixes",
          description:
            "Providing periodic updates to keep the website secure and free from errors.",
        },
        {
          id: 2,
          name: "Performance Optimization",
          description:
            "Enhancing website speed and performance for better user experience.",
        },
        {
          id: 3,
          name: "Website Security And Protection",
          description:
            "Implementing security measures to protect the website from external threats.",
        },
        {
          id: 4,
          name: "Adding New Features As Needed",
          description:
            "Continuously updating the website to add new features based on user feedback.",
        },
      ],
      description:
        "I offer regular maintenance services to ensure your website stays updated and secure. My services include performance optimization, bug fixes, and feature updates.",
    },
  ];
  export const SocialMedia = [
    {
      id: 1,
      name: "Instagram",
      link: "https://www.instagram.com/emazouz.dev?igsh=OWUxdHI2ZXI3Zmdy",
      src: "/svg/instagram.svg",
    },
    {
      id: 2,
      name: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61552785323792&mibextid=ZbWKwL",
      src: "/svg/facebook.svg",
    },
    {
      id: 3,
      name: "GitHub",
      link: "https://github.com/emazouz",
      src: "/svg/github.svg",
    },
    {
      id: 4,
      name: "linkedin",
      link: "https://www.linkedin.com/in/younes-mazouz-2b809431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      src: "/svg/linkedin.svg",
    },
  ];
  