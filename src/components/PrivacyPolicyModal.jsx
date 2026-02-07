import { useState, useEffect } from "react";
import name from '../images/colab_green_logo.png'
import '../style/newOrder.css';
const PrivacyPolicyModal = (props) => {

    const data = [
        {
            title: 'How We Use Your Information',
            subHeading: 'We use your personal data for the following purposes:',
            points: [
                'To provide and operate the Services, including connecting you with third-party providers, scheduling tests, and managing logistics',
                'To process payments and handle transactions',
                'To communicate with you about your appointments, results, and updates',
                'To improve the Services, analyze usage, and develop new features',
                'To comply with legal obligations, prevent fraud, and enforce our Terms and Conditions',
                'To send service-related notifications (e.g., appointment reminders via SMS or email)',
                'For internal administrative purposes'
            ],
            closingHeading: 'We process your sensitive health data primarily to fulfill your requests for diagnostic tests and provide necessary services, based on your explicit consent, contractual necessity, and obligations related to healthcare provision.'
        },
        {
            title: 'Legal Bases for Processing',
            subHeading: 'We process your personal data on the following legal bases:',
            points: [
                'Your explicit consent (especially for sensitive health data) – You provide this when registering, requesting tests, or sharing information',
                'Performance of a contract – To deliver the Services you request',
                'Legal obligations – Compliance with health, data protection, and other laws in Rwanda and Ethiopia',
                'Legitimate interests – Improving the Services, security, and fraud prevention (where not overridden by your rights)',
                'Public interest – In limited cases related to health access in the region'
            ],
            closingHeading: 'For sensitive health data, we rely on your explicit consent, necessity for medical purposes (e.g., facilitating diagnostic tests), or other exceptions under applicable laws.'
        },
        {
            title: 'Sharing Your Information',
            subHeading: 'We share your personal data only as necessary:',
            points: [
                'Third-party health facilities, laboratories, and logistical providers – To fulfill your test requests (e.g., sharing your details for sample collection and result delivery)',
                'Payment processors – For secure transaction processing',
                'Service providers – For hosting, analytics, SMS/email services, and app maintenance (under strict confidentiality agreements)',
                'Legal authorities – If required by law, to protect rights, safety, or comply with regulations',
                'Business transfers – In case of merger, acquisition, or asset sale'
            ],
            closingHeading: 'We do not sell your personal data to third parties for marketing purposes. We do not share sensitive health data except as required to provide the Services or with your consent.'
        },
        {
            title: 'Data Security',
            subHeading: 'We retain your personal data only as long as necessary:',
            points: [
                'For active accounts: As long as you use the Services',
                'For completed tests: Up to 2 years or as required by health regulations',
                'For legal or compliance purposes: As required by law'
            ],
            closingHeading: 'After this period, data is anonymized or securely deleted'
        },
        {
            title: 'Your Rights',
            subHeading: 'Under applicable laws (including Rwanda and Ethiopia data protection laws), you have rights regarding your personal data, including:',
            points: [
                'Access - Request a copy of your data',
                'Rectification - Correct inaccurate data',
                'Erasure - Request deletion (subject to legal exceptions)',
                'Restriction - Limit processing in certain cases',
                'Portability - Receive your data in a structured format'
            ],
            closingHeading: 'To exercise these rights, contact us at info@co-labhealth.com'
        },
        {
            title: 'International Data Transfers',
            subHeading: 'The Services are hosted in Rwanda and Ethiopia. If you access them from elsewhere, your data is transferred to and processed in these countries. We ensure appropriate safeguards for any transfers.'
        },
        {
            title: "Children's Privacy",
            subHeading: 'The Services are not intended for individuals under 18. We do not knowingly collect data from children. If we learn we have collected such data, we will delete it.'
        },
        {
            title: 'Changes to This Privacy Policy',
            subHeading: 'We may update this Privacy Policy from time to time. Changes will be posted here with the updated date. We may notify you via email or in-app notice for material changes. Continued use constitutes acceptance.'
        },
        {
            title: 'Contact Us',
            subHeading: `For questions, rights requests, or complaints:  
            ACUBED  
            Kicukiro, Kigali, Rwanda  
            Phone: +250784403223  
            Email: info@co-labhealth.com  
            `
        }
    ]

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-gradient-to-b from-white to-[#97cfd0] flex flex-col gap-6 font-inter items-center justify-center h-auto max-h-[90dvh] w-11/12 md:w-3/4 lg:w-3/5 xl:w-7/12 2xl:w-1/2 px-8 py-8' id='new-order' onClick={(e) => e.stopPropagation()}>
                <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] hover:bg-opacity-80 font-inter text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>
                <div className='w-full flex items-center justify-start gap-4 mb-8'>
                    <div className='h-5 md:h-6'><img className='logo' src={name} alt="logo" /></div>
                    <p className='text-xs md:text-sm xl:text-base text-gray-800 font-medium w-1/2'>Order diagnostic tests
                        anywhere, anytime</p>
                </div>
                <div className="w-full overflow-y-auto h-[100dvh] sm:h-96 xl:h-[500px] max-h-screen flex flex-col items-center justify-start mb-14 text-gray-700 text-xs md:text-sm lg:text-base xl:text-lg">
                    <>
                    <span className='font-medium text-center text-xl md:text-2xl' style={{ lineHeight: '1' }}>PRIVACY POLICY</span>
                    <p className='mb-8'>Last updated January 22, 2026</p>
                    <p className='w-full text-left'>ACUBED, doing business as CO-LAB (“Company,” “we,” “us,” or “our”), is a company registered in Rwanda at Kicukiro, Kigali, Kigali. We operate the mobile application CO-LAB (the “App”), as well as any related products and services that refer or link to this Privacy Policy (collectively, the “Services”).</p><br />
                    <p className='w-full text-left'>CO-LAB is a health tech platform that connects users with third-party health facilities, laboratories, and logistical providers to facilitate access to diagnostic tests. We do not perform, interpret, or provide diagnostic tests ourselves.</p><br />
                    <p className='w-full text-left'>We are committed to protecting your privacy and the security of your personal data, including sensitive health information. This Privacy Policy explains how we collect, use, disclose, store, and protect your personal data when you access or use our Services. It incorporates our obligations under applicable data protection laws in Rwanda and Ethiopia, as well as international best practices for handling health data.</p><br />
                    <p className='w-full text-left'>By accessing or using the Services, you agree to the collection, use, and processing of your personal data as described in this Privacy Policy. If you do not agree, please do not use the Services.</p>
                    </>

                    <div className='w-full mb-4 mt-4'>
                        <h3 className='text-left w-full font-medium' style={{ lineHeight: '1' }}>1. Information We Collect</h3>
                        <p className='text-left w-full mb-4'>We collect personal data necessary to provide and improve the Services. This includes:</p>

                        <h4 className='font-semibold text-lg'>Personal Identification Information</h4>
                        <ul className='w-full list-disc mb-2'>
                            <li className='list-inside ml-4'>Name, date of birth, gender, phone number, email address, and other contact details</li>
                            <li className='list-inside ml-4'>Payment information (processed securely by third-party payment providers; we do not store full card details)</li>
                            <li className='list-inside ml-4'>Location data (for scheduling and logistics)</li>
                        </ul>

                        <h4 className='font-semibold text-lg'>Technical and Usage Data</h4>
                        <ul className='w-full list-disc mb-2'>
                            <li className='list-inside ml-4'>Device information (e.g., IP address, device type, operating system)</li>
                            <li className='list-inside ml-4'>App usage data (e.g., pages visited, features used) </li>
                            <li className='list-inside ml-4'>Log data and analytics</li>
                        </ul>

                        <h4 className='font-semibold text-lg'>Other Data</h4>
                        <ul className='w-full list-disc mb-2'>
                            <li className='list-inside ml-4'>Communications with us (e.g., support requests)</li>
                            <li className='list-inside ml-4'>Feedback or reviews</li>
                        </ul>
                        <p className='text-left w-full'>We process your sensitive health data primarily to fulfill your requests for diagnostic tests and provide necessary services, based on your explicit consent, contractual necessity, and obligations related to healthcare provision.</p>
                        
                    </div>


                    {data.map((item,index) => (
                        <div className='w-full mb-4 mt-6'>
                            <h3 style={{ lineHeight: '1' }} className='text-left w-full font-medium'>{index+2}. {item.title}</h3>
                            <p className='text-left w-full mb-2 whitespace-pre-line'>{item.subHeading}</p>
                            <ul className='mb-2 list-disc w-full'>
                                {item.points?.map((bullet) => (
                                <li className='list-inside ml-4'>
                                    {bullet}
                                </li>
                            ))}
                            </ul>


                            <p className='text-left w-full'>{item.closingHeading}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default PrivacyPolicyModal;