import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | My Next App</title>
        <meta name="description" content="Learn more about our company and mission." />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">About Us</h1>
          <p className="text-lg text-gray-700 text-center">
            Welcome to our company! We are passionate about building modern, scalable web applications using Next.js and Tailwind CSS.
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-2 text-gray-600">
              Our mission is to empower businesses and individuals by providing cutting-edge web solutions that are fast, responsive, and user-friendly.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Team</h2>
            <p className="mt-2 text-gray-600">
              We are a diverse team of developers, designers, and innovators working together to create exceptional digital experiences.
            </p>
          </div>
          <div className="mt-8 text-center">
            
              Back to Home
           
          </div>
        </div>
      </div>
    </>
  );
}