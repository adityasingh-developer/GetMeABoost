import React from "react";

const page = () => {
    return (
        <div className='w-dvw min-h-dvh items-center bg-white py-5 flex flex-col gap-5 text-black'>
            <div className='text-center w-[80%]'>
                <h1 className='text-2xl font-semibold'>Terms of Service</h1>
                <h2 className='text-xl'>Last updated: March 2026</h2>

                <h3 className='text-lg'>
                    These Terms govern your use of GetMeABoost. By accessing or using the platform, you agree to comply with these Terms.
                </h3>
            </div>

            <div className='text-center w-[80%] flex flex-col'>
                <h1 className='text-lg font-medium'>1. Use of the Platform</h1>
                <p>You may use GetMeABoost to support creators or create a funding page in compliance with applicable laws.</p>
                <p>You must not engage in fraud, abuse, or illegal activities.</p>
                <p>We reserve the right to suspend accounts that violate these rules.</p>
            </div>

            <div className='text-center w-[80%] flex flex-col'>
                <h1 className='text-lg font-medium'>2. Accounts</h1>
                <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p>We may suspend or terminate accounts at our discretion if misuse is detected.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>3. Payments</h1>
                <p>All payments are processed through third-party payment providers.</p>
                <p>GetMeABoost does not directly hold or store full card details.</p>
                <p>Contributions are voluntary and generally non-refundable unless required by law.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>4. Creator Responsibilities</h1>
                <p>Creators are responsible for the accuracy of their content and any benefits offered.</p>
                <p>Creators are solely responsible for complying with tax obligations.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>5. Fees</h1>
                <p>Any applicable platform fees will be clearly disclosed before transactions.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>6. Intellectual Property</h1>
                <p>All platform branding, design, and software belong to GetMeABoost.</p>
                <p>Users retain ownership of the content they upload.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>7. Limitation of Liability</h1>
                <p>The platform is provided “as is” without warranties of any kind.</p>
                <p>We are not liable for indirect or consequential damages arising from use of the platform.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>8. Changes to These Terms</h1>
                <p>We may update these Terms at any time. Continued use of the platform indicates acceptance of any changes.</p>
            </div>

            <div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>9. Contact</h1>
                <p>For legal inquiries:</p>
                <p>[adityasingh.dev@yahoo.com](mailto:adityasingh.dev@yahoo.com)</p>
            </div><div className='text-center w-[80%]'>
                <h1 className='text-lg font-medium'>9. Demo Notice</h1>
                <p>
                    GetMeABoost is a portfolio demonstration project. While payment flows may be simulated or processed in test mode, the platform is not a registered financial service or commercial business.
                </p>
                <p>
                    No real financial services are provided, and transactions may not represent actual commercial activity.
                </p>
            </div>
        </div>
    )
}

export default page
