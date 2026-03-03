import React from 'react'

const page = () => {
    return (
        <div className='w-dvw min-h-dvh items-center bg-white py-5 flex flex-col gap-5 text-black'>
            <div className='text-center w-[80%]'>
                <h1 className='text-2xl font-semibold'>Privacy Policy</h1>
                <h2 className='text-xl'>Last updated: March 2026</h2>

                <h3 className='text-lg'>GetMeABoost (“we”, “our”, “us”) respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.</h3>
            </div>

            <div className='text-center w-[80%] flex flex-col'>
                
                <h1 className='text-lg font-medium'> 1. Information We Collect </h1>

                <p>Account Information
                Name, email address, username, password (encrypted).</p>

               <p> Payment Information
                Processed securely through third-party payment providers. We do not store full card details.</p>

                <p>Usage Data
                IP address, device type, browser type, pages visited, and interactions.</p>

                <p>Creator Data
                Profile information, content descriptions, membership tiers, and payout details.</p>
            </div>



            <div className='text-center w-[80%] flex flex-col'>
                
                <h1 className='text-lg font-medium'> 2. How We Use Information </h1>

                <p>We use collected data to:</p>

                <p>Provide and operate the platform</p>
                <p>Process payments and contributions</p>
                <p>Improve security and prevent fraud</p>
                <p>Communicate important updates</p>
                <p>Enhance user experience</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'> 3. Payments </h1>

                All payments are handled through secure third-party processors. We are not responsible for how those providers store or manage payment data.

            </div>

            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 4. Data Security </h1>

                We implement reasonable technical and organizational measures to protect user data. However, no online platform can guarantee absolute security.

            </div>


            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 5. Data Sharing </h1>

                We do not sell personal data.
                We may share data with:

                Payment processors
                Hosting providers
                Legal authorities if required by law


            </div>

            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 6. Cookies </h1>

                We use cookies to improve functionality, analytics, and performance.


            </div>

            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 7. User Rights </h1>

                Users may:

                Request access to their data
                Request correction or deletion
                Close their account at any time

                Requests can be made by contacting support.

            </div>

            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 8. Changes to This Policy </h1>

                We may update this Privacy Policy. Continued use of the platform means you accept any updates.

            </div>

            <div className='text-center w-[80%]'>
                
                <h1 className='text-lg font-medium'> 9. Contact </h1>

                For privacy-related inquiries:
                [adityasingh.dev@yahoo.com](mailto:adityasingh.dev@yahoo.com)

            </div>
            <p className='text-center'>This platform is a conceptual project created for demonstration purposes.</p>

        </div>
    )
}

export default page